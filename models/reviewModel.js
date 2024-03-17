const mongoose = require("mongoose");
const Product = require("./productModel");

const reviewSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: [true, "Rating is required"],
      min: 1,
      max: 5,
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

reviewSchema.index({ product: 1, user: 1 }, { unique: true });

reviewSchema.statics.calculateAverageRating = async function (productId) {
  const stats = await this.aggregate([
    {
      $match: { product: productId },
    },
    {
      $group: {
        _id: "$product",
        nRating: { $sum: 1 },
        avgRating: { $avg: "$rating" },
      },
    },
  ]);

  const product = await Product.findOne({ _id: productId });

  if (stats.length > 0) {
    product.averageRating = stats[0].avgRating;
    product.numberOfReviews = stats[0].nRating;
  } else {
    product.averageRating = 4.5;
    product.numberOfReviews = 0;
  }

  try {
    await product.save();
  } catch (error) {
    console.log(error);
  }
};

reviewSchema.post("save", async function () {
  await this.constructor.calculateAverageRating(this.product);
});

reviewSchema.post(/^findOneAnd/, async function (doc) {
  if (doc) {
    await doc.constructor.calculateAverageRating(doc.product._id);
  }
});

// populate user and product
reviewSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "username",
  }).populate({
    path: "product",
    select: "name ",
  });
  next();
});

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
