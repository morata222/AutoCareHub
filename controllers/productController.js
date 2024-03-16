const Product = require("../models/productModel");
const customError = require("../errors/customError");
const APIFeatures = require("../utils/apiFeatures");

const search = (search) => {
  return {
    name: { $regex: search, $options: "i" },
  };
};

const getAllProducts = async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  if (req.query.search) {
    features.query = features.query.find(search(req.query.search));
  }

  const products = await features.query;

  res.status(200).json({ products });
};

const createProduct = async (req, res, next) => {
  const product = new Product(req.body);

  try {
    await product.save();
    res.status(201).json({ product });
  } catch (error) {
    next(new customError("Product not created", 400));
  }
};

const getProduct = async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new customError(`No product with id : ${id}`, 404));
  }

  res.status(200).json({ product });
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new customError(`No product with id : ${id}`, 404));
  }

  res.status(200).json({ product });
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new customError(`No product with id : ${id}`, 404));
  }

  res.status(204).json({});
};

module.exports = {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
};
