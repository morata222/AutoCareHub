const express = require("express");

const router = express.Router();

const {
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getMe,
  updateMyPassword,
} = require("../controllers/userController");

const { protect, restrictTo } = require("../controllers/authController");

router.use(protect);

router.route("/me").get(getMe);
router.route("/updateMyPassword").patch(updateMyPassword);

router.route("/").get(restrictTo("admin"), getAllUsers);
router
  .route("/:id")
  .get(restrictTo("admin"), getUser)
  .patch(restrictTo("admin"), updateUser)
  .delete(restrictTo("admin"), deleteUser);

module.exports = router;
