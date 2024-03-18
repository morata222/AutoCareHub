const mongoose = require("mongoose");

const favouriteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "User is required"],
  },
  products: [
    {
      type: mongoose.Schema.ObjectId,
      ref: "Product",
    },
  ],
});

const Favourite = mongoose.model("Favourite", favouriteSchema);

module.exports = Favourite;
