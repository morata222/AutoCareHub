const ShippingLocation = require("../models/shippingLocationModel");
const customError = require("../errors/customError");

const getShippingLocations = async (req, res, next) => {
  const shippingLocations = await ShippingLocation.find();
  res.status(200).json({ shippingLocations });
};

const createShippingLocation = async (req, res, next) => {
  const shippingLocation = new ShippingLocation(req.body);

  try {
    await shippingLocation.save();
    res.status(201).json({ shippingLocation });
  } catch (error) {
    next(new customError(error.message, 400));
  }
};

const updateShippingLocation = async (req, res, next) => {
  const { id } = req.params;
  const shippingLocation = await ShippingLocation.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!shippingLocation) {
    return next(new customError("No shipping location found", 404));
  }

  res.status(200).json({ shippingLocation });
};

const deleteShippingLocation = async (req, res, next) => {
  const { id } = req.params;
  const shippingLocation = await ShippingLocation.findByIdAndDelete(id);

  if (!shippingLocation) {
    return next(new customError("No shipping location found", 404));
  }

  res.status(200).json({ message: "Shipping location deleted" });
};

module.exports = {
  getShippingLocations,
  createShippingLocation,
  updateShippingLocation,
  deleteShippingLocation,
};
