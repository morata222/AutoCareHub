const express = require("express");
const { protect } = require("../controllers/authController");

const {
  addToFavourites,
  getFavourites,
  removeFavourite,
} = require("../controllers/favouriteController");

const router = express.Router();

router.use(protect);

router
  .route("/")
  .get(getFavourites)
  .post(addToFavourites)
  .delete(removeFavourite);

module.exports = router;
