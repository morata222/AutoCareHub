const mongoose = require("mongoose");
const validator = require("validator");
const customError = require("../errors/customError");

const bookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "Booking must belong to a user"],
    },

    date: {
      type: String,
      required: [true, "Booking must have a date"],
    },
    time: {
      type: String,
      required: [true, "Booking must have a time"],
      validate: {
        validator: function (val) {
          return validator.isTime(val, {
            format: "HH:MM",
            strictMode: true,
          });
        },
        message: "Invalid time format",
      },
    },
  },
  {
    timestamps: true,
  }
);

// make day and time unique together
bookingSchema.index({ date: 1, time: 1 }, { unique: true });

bookingSchema.pre("save", async function (next) {
  const booking = await this.constructor.findOne({
    date: this.date,
    time: this.time,
  });
  if (booking) {
    return next(new customError("Booking already exists", 400));
  }
  next();
});

// validate date
bookingSchema.methods.validateDate = function (date) {
  const newDate = new Date(date);
  return newDate > Date.now();
};

//populate user
bookingSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "username phone",
  });
  next();
});

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
