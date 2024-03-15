const express = require("express");

const {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
} = require("../controllers/bookingController");

const { protect, restrictTo } = require("../controllers/authController");

const router = express.Router();

router.use(protect);

router.route("/").get(restrictTo("admin"), getAllBookings).post(createBooking);
router
  .route("/:id")
  .get(restrictTo("admin"), getBooking)
  .patch(restrictTo("admin"), updateBooking)
  .delete(restrictTo("admin"), deleteBooking);

module.exports = router;
