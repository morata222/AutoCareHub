const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");

const {
  getShippingLocations,
  createShippingLocation,
  updateShippingLocation,
  deleteShippingLocation,
} = require("../controllers/shippingLocationController");

const router = express.Router();

router
  .route("/")
  .get(getShippingLocations)
  .post(protect, restrictTo("admin"), createShippingLocation);

router.use(protect);
router.use(restrictTo("admin"));

router
  .route("/:id")
  .patch(updateShippingLocation)
  .delete(deleteShippingLocation);

module.exports = router;
