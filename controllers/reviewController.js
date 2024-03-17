const Review = require("../models/reviewModel");
const customError = require("../errors/customError");
const Product = require("../models/productModel");

const getAllReviews = async (req, res, next) => {
  const reviews = await Review.find();
  res.status(200).json({
    reviews,
  });
};

const createReview = async (req, res, next) => {
  const user = req.user.id;
  const product = req.body.product;

  // Check if the user has already reviewed the product
  const existingReview = await Review.findOne({ user, product });
  if (existingReview) {
    return next(new customError("You have already reviewed this product", 400));
  }

  const review = new Review({
    ...req.body,
    user,
  });

  try {
    await review.save();
    res.status(201).json({
      review,
    });
  } catch (error) {
    return next(new customError(error.message, 400));
  }
};

const getReview = async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findById(id);
  if (!review) {
    return next(new customError("Review not found", 404));
  }
  res.status(200).json({
    review,
  });
};

const updateReview = async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findById(id);

  if (!review) {
    return next(new customError("Review not found", 404));
  }

  console.log(review.user._id.toString(), req.user.id);
  if (review.user._id.toString() !== req.user.id) {
    return next(
      new customError("You are not authorized to update this review", 401)
    );
  }

  try {
    const updatedReview = await Review.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).json({
      review: updatedReview,
    });
  } catch (error) {
    return next(new customError(error.message, 400));
  }
};

const deleteReview = async (req, res, next) => {
  const { id } = req.params;
  const review = await Review.findById(id);
  if (!review) {
    return next(new customError("Review not found", 404));
  }

  if (review.user._id.toString() !== req.user.id && req.user.role !== "admin") {
    return next(
      new customError("You are not authorized to delete this review", 401)
    );
  }

  try {
    await Review.findByIdAndDelete(id);
    res.status(204).json({});
  } catch (error) {
    console.log(error);
    return next(new customError(error.message, 400));
  }
};

const getProductReviews = async (req, res, next) => {
  const { id } = req.params;
  const product = Product.findById(id);
  if (!product) {
    return next(new customError("Product not found", 404));
  }
  const reviews = await Review.find({ product: id });
  res.status(200).json({
    reviews,
  });
};

module.exports = {
  getAllReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
  getProductReviews,
};
