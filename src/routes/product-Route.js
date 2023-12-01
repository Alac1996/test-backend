const express = require("express");

const productController = require("../controllers/productController");
const uploadMiddleware = require("../middlewares/upload");

const router = express.Router();

router.post(
  "/createProduct",
  uploadMiddleware.single("imageUrl"),
  productController.createProduct
);

router.get("/getAllProduct", productController.getAllProducts);

module.exports = router;
