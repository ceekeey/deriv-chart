const User = require("../models/User");
const generateToken = require("../utils/generateToken");

const serializeUser = (user) => ({
  id: user._id.toString(),
  username: user.username,
  email: user.email,
  createdAt: user.createdAt,
  updatedAt: user.updatedAt,
});

const setAuthCookie = (res, token) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.cookie("token", token, {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};

const clearAuthCookie = (res) => {
  const isProduction = process.env.NODE_ENV === "production";

  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Username, email and password are required",
        });
    }

    const trimmedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (trimmedUsername.length < 3 || trimmedUsername.length > 30) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Username must be between 3 and 30 characters",
        });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide a valid email address",
        });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Password must be at least 6 characters long",
        });
    }

    const existingUserByEmail = await User.findOne({ email: normalizedEmail });
    if (existingUserByEmail) {
      return res
        .status(400)
        .json({
          success: false,
          message: "An account with this email already exists",
        });
    }

    const existingUserByUsername = await User.findOne({
      username: trimmedUsername,
    });
    if (existingUserByUsername) {
      return res
        .status(400)
        .json({ success: false, message: "This username is already taken" });
    }

    const user = await User.create({
      username: trimmedUsername,
      email: normalizedEmail,
      password,
    });

    const token = generateToken(user._id);
    setAuthCookie(res, token);

    return res.status(201).json({
      success: true,
      message: "Registration successful",
      data: { user: serializeUser(user) },
    });
  } catch (error) {
    return next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Email and password are required" });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const user = await User.findOne({ email: normalizedEmail }).select(
      "+password",
    );

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user._id);
    setAuthCookie(res, token);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user: serializeUser(user) },
    });
  } catch (error) {
    return next(error);
  }
};

const logout = (req, res) => {
  clearAuthCookie(res);

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
};

const getCurrentUser = async (req, res) => {
  return res.status(200).json({
    success: true,
    data: { user: serializeUser(req.user) },
  });
};

module.exports = { register, login, logout, getCurrentUser };
