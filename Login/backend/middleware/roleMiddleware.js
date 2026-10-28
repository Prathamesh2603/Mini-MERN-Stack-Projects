const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    // Authentication middleware will run first.
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required."
      });
    }

    // Check the user's role
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: "You do not have permission to access this resources."
      });
    }

    next();
  };
};

module.exports = roleMiddleware;