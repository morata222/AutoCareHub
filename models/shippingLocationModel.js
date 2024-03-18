const mongoose = require("mongoose");

const shippingLocationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  address: {
    type: String,
    required: [true, "Address is required"],
  },
});

const ShippingLocation = mongoose.model(
  "ShippingLocation",
  shippingLocationSchema
);

module.exports = ShippingLocation;
