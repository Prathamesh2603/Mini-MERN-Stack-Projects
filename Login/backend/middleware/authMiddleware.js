const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
  try {
    // Check whether the session exists.
    if (!req.session?.userId) {
      return res.status(401).json({
        success: false,
        message: "Please login to access these resources."
      });
    }

    // Find user associated with the  session
    const user = await User.findById(req.session.userId);

    // Handle the deleted or unavailable user
    if (!user) {
      return req.session.destroy(err => {
        if (err) {
          console.log("Session destruction failed:",err.message);
        }

        res.clearCookie(mern.sid, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
          path: "/"
        });

        res.status(401).json({
          success: false,
          message: "Your session is invalid, please login again."
        });
      })
    }

    // Make the user available for the next controller.
    req.user = user;

    next();
  } catch (error) {
    console.error("Authentication error:",error.message);

    return res.status(500).json({
      success: false,
      message: "Unable to verify your session."
    });
    
  }
}

module.exports = authMiddleware;