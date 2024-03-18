const express = require("express");
const { protect, restrictTo } = require("../controllers/authController");

const {
  getMaintenanceLocations,
  createMaintenanceLocation,
  updateMaintenanceLocation,
  deleteMaintenanceLocation,
} = require("../controllers/maintenanceLocationController");

const router = express.Router();

router
  .route("/")
  .get(getMaintenanceLocations)
  .post(protect, restrictTo("admin"), createMaintenanceLocation);

router.use(protect);
router.use(restrictTo("admin"));

router
  .route("/:id")
  .patch(updateMaintenanceLocation)
  .delete(deleteMaintenanceLocation);

module.exports = router;
