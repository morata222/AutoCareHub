const express = require("express");
const router = express.Router();

const {
  signup,
  signin,
  logout,
  resetPassword,
  protect,
} = require("../controllers/authController");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", protect, logout);
router.post("/reset-password", resetPassword);

module.exports = router;
