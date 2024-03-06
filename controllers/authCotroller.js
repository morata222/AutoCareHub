const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { attachCookies } = require("../utils/jwt");
const customError = require("../errors/customError");

// signup user
const signup = async (req, res, next) => {
  const { firstName, lastName, username, password, confirmPassword, phone } =
    req.body;

  if (password !== confirmPassword) {
    return next(new customError("Password do not match", 400));
  }

  if (
    !firstName ||
    !lastName ||
    !username ||
    !password ||
    !confirmPassword ||
    !phone
  ) {
    return next(new customError("Please enter all fields", 400));
  }

  const existingUsername = await User.findOne({ username });
  const existingPhone = await User.findOne({ phone });

  if (existingUsername) {
    return next(new customError("Username already exists", 400));
  }

  if (existingPhone) {
    return next(new customError("Phone already exists", 400));
  }

  const user = new User({
    firstName,
    lastName,
    username,
    password,
    confirmPassword,
    phone,
  });

  try {
    await user.save();
    res.status(201).json({ msg: "User created successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};

// login user
const signin = async (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return next(new customError("Please enter all fields", 400));
  }

  const user = await User.findOne({ username });

  if (!user) {
    return next(new customError("Invalid credentials", 400));
  }

  const isMatch = await user.comparePassword(password, user.password);

  if (!isMatch) {
    return next(new customError("Invalid credentials", 400));
  }

  // attach token to cookie
  attachCookies(res, user._id);

  res.status(200).json({ msg: "User logged in successfully" });
};

// logout user
const logout = async (req, res, next) => {
  // clear cookie
  res.clearCookie("token");
  res.status(200).json({ msg: "User logged out successfully" });
};

// forgot password and reset password
const resetPassword = async (req, res, next) => {
  const { username, newPassword, confirmNewPassword } = req.body;
  if (!username || !newPassword || !confirmNewPassword) {
    return next(new customError("Please enter all fields", 400));
  }
  const user = await User.findOne({ username, phone });
  if (!user) {
    return next(new customError("Invalid credentials", 400));
  }

  if (newPassword !== confirmNewPassword) {
    return next(new customError("Password do not match", 400));
  }

  user.password = newPassword;
  user.confirmPassword = confirmNewPassword;

  try {
    await user.save();
    res.status(201).json({ msg: "Password reset successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: "Server error" });
  }
};

module.exports = {
  signup,
  signin,
  logout,
  resetPassword,
};
