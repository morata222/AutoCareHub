const express = require("express");
const router = express.Router();
const {
  getAllReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");

const { protect, restrictTo } = require("../controllers/authController");

router.use(protect);

router.route("/").get(getAllReviews).post(createReview);
router.route("/:id").get(getReview).patch(updateReview).delete(deleteReview);

module.exports = router;
