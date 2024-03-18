const mongoose = require("mongoose");

const maintenanceLocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
});

const MaintenanceLocation = mongoose.model(
  "MaintenanceLocation",
  maintenanceLocationSchema
);

module.exports = MaintenanceLocation;
