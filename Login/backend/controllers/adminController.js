const User = require("../models/User");

exports.getAdminDashboard = async (req, res, next) => {
  try {
    const search = req.query.search?.trim() || "";

    const searchFilter = search 
      ? {
        $or: [
          {name: { $regex: search, $options: "i" }},
          {email: { $regex: search, $options: "i" }},
        ],
      }
      : {};
    
    const [totalUsers, totalAdmins, regularUsers, users] = await Promise.all([
      User.countDocuments(),
      User.countDocuments({ role: "admin" }),
      User.countDocuments({ role: "user" }),
      User.find(searchFilter)
      .select("name email role createdAt")
      .sort({ createdAt: -1 }),
    ]);

    res.status(200).json({
      stats: {
        totalUsers,
        totalAdmins,
        regularUsers
      },
      users,
    });
  } catch (error) {
    console.error("Admin dashboard error:", error);

    res.status(500).json({
      message: "Failed to fetch admin dashboard data"
    });
  }
}