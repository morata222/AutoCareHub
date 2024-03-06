const express = require("express");

const router = express.Router();

const {
  signup,
  signin,
  logout,
  resetPassword,
} = require("../controllers/authCotroller");

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/logout", logout);
router.post("/reset-password", resetPassword);

module.exports = router;
