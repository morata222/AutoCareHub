const Favourite = require("../models/favouriteModel");
const Product = require("../models/productModel");
const customError = require("../errors/customError");

const addToFavourites = async (req, res, next) => {
  const user = req.user.id;
  const product = req.body.product;

  const favourite = await Favourite.findOne({ user });

  if (!favourite) {
    const newFavourite = new Favourite({
      user,
      products: [product],
    });

    try {
      await newFavourite.save();
      return res.status(201).json({
        message: "Product added to favourites",
      });
    } catch (error) {
      return next(new customError(error.message, 400));
    }
  } else {
    if (favourite.products.includes(product)) {
      return next(new customError("Product already in favourites", 400));
    }

    favourite.products.push(product);

    try {
      await favourite.save();
      return res.status(201).json({
        message: "Product added to favourites",
      });
    } catch (error) {
      return next(new customError("Something went wrong", 400));
    }
  }
};

const getFavourites = async (req, res, next) => {
  const user = req.user.id;
  const favourite = await Favourite.findOne({ user });
  if (!favourite) {
    return next(new customError("Favourites not found", 404));
  }

  // remove the products that are not found
  const filteredFavourites = await Promise.all(
    favourite.products.map(async (product) => {
      const productDetails = await Product.findById(product);
      return productDetails;
    })
  );

  favourite.products = filteredFavourites.filter((product) => product !== null);

  await favourite.save();

  res.status(200).json({
    favourite,
  });
};

const removeFavourite = async (req, res, next) => {
  const user = req.user.id;
  const product = req.body.product;

  const favourite = await Favourite.findOne({ user });

  if (!favourite) {
    return next(new customError("Favourites not found", 404));
  }
  if (!favourite.products.includes(product)) {
    return next(new customError("Product not in favourites", 400));
  }

  favourite.products = favourite.products.filter(
    (favouriteProduct) => favouriteProduct.toString() !== product
  );

  try {
    if (favourite.products.length === 0) {
      await Favourite.findOneAndDelete({ user });
      return res.status(200).json({
        message: "Favourite deleted successfully",
      });
    } else {
      await favourite.save();
      return res.status(200).json({
        message: "Product removed from favourites",
      });
    }
  } catch (error) {
    return next(new customError("Something went wrong", 400));
  }
};

module.exports = { addToFavourites, getFavourites, removeFavourite };
