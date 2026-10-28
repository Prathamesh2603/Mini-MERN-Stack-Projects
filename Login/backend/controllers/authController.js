// External Module
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

exports.postRegister = [
  check("name")
  .trim()
  .isString()
  .notEmpty()
  .isLength({min: 2, max: 60})
  .withMessage("Name must be between 2 to 60 character.")
  .matches(/^[A-Za-z\s]+$/)
  .withMessage("Name should only contain alphabets."),

  check("email")
  .trim()
  .isString()
  .notEmpty()
  .toLowerCase()
  .isEmail()
  .withMessage("Please enter valid email address.")
  .normalizeEmail(),

  check("password")
  .isLength({min: 8, max: 60})
  .withMessage("password should be atleast 8 character long")
  .matches(/[A-Z]/)
  .withMessage("password should atleast contain 1 uppercase letter")
  .matches(/[a-z]/)
  .withMessage("password should atleast contain 1 lowercase letter")
  .matches(/[0-9]/)
  .withMessage("password should atleast contain 1 number")
  .matches(/[!@&]/)
  .withMessage("password should atleast contain 1 special character")
  .isString()
  .trim(),

  check("confirmPassword")
  .custom((val, {req}) => {
    if (val !== req.body.password) {
      throw new Error("Password do not match.");
    }
    return true;
  }),

  async (req, res, next) => {
    try {
      const {name, email, password} = req.body;
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: errors.array().map(error => error.msg),
          data: {name, email}
        });
      };

      const existingUser = await User.findOne({email});

      if (existingUser) {
        return res.status(409).json({
          success: false,
          message: "An account with email already exists."
        });
      };

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = await User.create({
        name,
        email, 
        password: hashedPassword
      });

      return res.status(201).json({
        success: true,
        message: "User Registered Successfully.",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role
        }
      });
    } catch (error) {
      if (error) {
        console.log("Registration error:",error.message);
      }
    }
  }
];

exports.postLogin = async (req, res, next) => {
  try {
    const {email, password} = req.body;

    // find user and explicitly include password hash.
    const user = await User.findOne({email}).select("+password");

    // verify credentials.
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }

    // regenerate session after authentication.
    // This helps prevent session fixation attacks.
    req.session.regenerate((err) => {
      if (err) {
        console.log("Session regeneration failed:",err.message);

        return res.status(500).json({
          success: false,
          message: "Unable to log in. Please try again."
        });
      }

      // Storing only necessary user infomation
      req.session.userId = user._id.toString();

      // save session before responding
      req.session.save((saveError) => {
        if (saveError) {
          console.log("Session save failed:",saveError.message);
  
          return res.status(500).json({
            success: false,
            message: "Unable to create a session."
          });
        }

        // send safe user infomation
        return res.status(200).json({
          success: true,
          message: "Login Successfull.",
          user: {
            id: user._id.toString(),
            name: user.name,
            email: user.email,
            role: user.role
          }
        });
      });
    });
  } catch (error) {
    console.error("Login error:", error.message);

    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again later.",
    });
  }
};

exports.postLogout = async (req, res, next) => {
  // Destroy the server-side session.
  req.session.destroy(error => {
    if (error) {
      console.error("Logout error: ",error.message);        

      return res.status(500).json({
        success: false,
        message: "Unable to logout. Please try again"
      });
    }

    // Clear the browser's session cookie
    res.clearCookie("mern.sid", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/"
    });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully."
    });
  });
};

exports.getMe = async (req, res, next) => {
  return res.status(200).json({
    success: true,
    authentication: true,
    user: {
      id: req.user._id.toString(),
      name: req.user.name,
      email: req.user.email,
      role: req.user.role
    }
  });
}