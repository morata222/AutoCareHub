const MaintenanceLocation = require("../models/maintenanceLocationModel");
const customError = require("../errors/customError");

const getMaintenanceLocations = async (req, res, next) => {
  const maintenanceLocations = await MaintenanceLocation.find();
  res.status(200).json({ maintenanceLocations });
};

const createMaintenanceLocation = async (req, res, next) => {
  const maintenanceLocation = new MaintenanceLocation(req.body);

  try {
    await maintenanceLocation.save();
    res.status(201).json({ maintenanceLocation });
  } catch (error) {
    next(new customError("Something went wrong", 400));
  }
};

const updateMaintenanceLocation = async (req, res, next) => {
  const { id } = req.params;
  const maintenanceLocation = await MaintenanceLocation.findByIdAndUpdate(
    id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!maintenanceLocation) {
    return next(new customError("No Maintenance location found", 404));
  }

  res.status(200).json({ message: "Maintenance location updated" });
};

const deleteMaintenanceLocation = async (req, res, next) => {
  const { id } = req.params;
  const maintenanceLocation = await MaintenanceLocation.findByIdAndDelete(id);

  if (!maintenanceLocation) {
    return next(new customError("No Maintenance location found", 404));
  }

  res.status(200).json({ message: "Maintenance location deleted" });
};

module.exports = {
  getMaintenanceLocations,
  createMaintenanceLocation,
  updateMaintenanceLocation,
  deleteMaintenanceLocation,
};
