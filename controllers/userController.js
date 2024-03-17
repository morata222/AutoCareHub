const User = require("../models/userModel");
const APIFeatures = require("../utils/apiFeatures");
const customError = require("../errors/customError");

const search = (search) => {
  return {
    $or: [
      { username: { $regex: search, $options: "i" } },
      { firstName: { $regex: search, $options: "i" } },
      { lastName: { $regex: search, $options: "i" } },
    ],
  };
};

// get all users
const getAllUsers = async (req, res, next) => {
  const features = new APIFeatures(User.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  if (req.query.search) {
    features.query = features.query.find(search(req.query.search));
  }

  const users = await features.query;
  res.status(200).json({ users });
};

const getUser = async (req, res, next) => {
  // exclude password from the query
  const user = await User.findById(req.params.id).select("-password -__v");
  if (!user) {
    return next(customError("User not found", 404));
  }
  res.status(200).json({ user });
};

const getMe = async (req, res, next) => {
  const user = await User.findById(req.user._id).select("-password -__v -role");
  // console.log(req.user);
  res.status(200).json({ user });
};

const updateUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new customError("User not found", 404));
  }

  const updates = Object.keys(req.body);

  const disallowedUpdates = ["password", "confirmPassword"];

  const isValidOperation = updates.every((update) => {
    return !disallowedUpdates.includes(update);
  });

  if (!isValidOperation) {
    return next(new customError("Invalid updates", 400));
  }

  try {
    await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.log(error);
    return next(new customError("User update failed", 500));
  }
};

const updateMyPassword = async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password"); 
  if (!user) {
    return next(new customError("User not found", 404));
  }

  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(
      new customError(
        "Please provide currentPassword, newPassword and confirmNewPassword",
        400
      )
    );
  }
  const isMatch = await user.comparePassword(currentPassword, user.password);
  if (!isMatch) {
    return next(new customError("Invalid current password", 400));
  }
  // ADD FUNCTION COMPARE BETWEEN NEWPASSWORD AND CONFIRMNEWPASSWORD
  user.password = newPassword;
  user.confirmPassword = confirmNewPassword;

  try {
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.log(error);
    return next(new customError("Password update failed", 500));
  }
};

const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new customError("User not found", 404));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    // console.log(error);
    return next(new customError("User delete failed", 500));
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getMe,
  updateMyPassword,
};
