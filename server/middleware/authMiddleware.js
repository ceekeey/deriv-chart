const jwt = require("jsonwebtoken");
const User = require("../models/User");

async function authMiddleware(req, res, next) {
  try {
    const token = req.cookies?.token;

    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Authentication required" });
    }

    req.user = user;
    return next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Authentication required" });
  }
}

module.exports = authMiddleware;
