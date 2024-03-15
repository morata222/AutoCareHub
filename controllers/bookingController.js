const Booking = require("../models/bookingModel");
const customError = require("../errors/customError");

const getAllBookings = async (req, res, next) => {
  try {
    const bookings = await Booking.find();
    res.status(200).json({ bookings });
  } catch (error) {
    next(new customError("Something went wrong", 500));
  }
};

const getBooking = async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new customError("Booking not found", 404));
  }
  res.status(200).json({ booking });
};

const createBooking = async (req, res, next) => {
  const user = req.user._id;

  const booking = new Booking({ ...req.body, user });

  if (!booking.validateDate()) {
    return next(new customError("Invalid date", 400));
  }

  try {
    const newBooking = await booking.save();
    res.status(201).json({ booking: newBooking });
  } catch (error) {
    console.log(error);
    return next(new customError(error.message, 400));
  }
};

const updateBooking = async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new customError("Booking not found", 404));
  }
  // loop through the request body and update the booking
  for (let key in req.body) {
    booking[key] = req.body[key];
  }

  try {
    const updatedBooking = await booking.save();
    res.status(200).json({ booking: updatedBooking });
  } catch (error) {
    return next(new customError(error.message, 400));
  }
};

const deleteBooking = async (req, res, next) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) {
    return next(new customError("Booking not found", 404));
  }
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.status(204).json({});
  } catch (error) {
    return next(new customError(error.message, 400));
  }
};

module.exports = {
  getAllBookings,
  getBooking,
  createBooking,
  updateBooking,
  deleteBooking,
};
