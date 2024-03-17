const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

const { getProductReviews } = require("../controllers/reviewController");

const { protect, restrictTo } = require("../controllers/authController");

router
  .route("/")
  .get(getAllProducts)
  .post(protect, restrictTo("admin"), createProduct);
router
  .route("/:id")
  .get(getProduct)
  .patch(protect, restrictTo("admin"), updateProduct)
  .delete(protect, restrictTo("admin"), deleteProduct);

// get reviews for a product
router.route("/:id/reviews").get(getProductReviews);

module.exports = router;
