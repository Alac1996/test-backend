const fs = require("fs/promises");
const prisma = require("../../models/prisma");
// const upload = require("../middlewares/upload");
const { upload } = require("../utils/cloudinary-service");
const { checkProductSchema } = require("../validators/product-validator");

exports.createProduct = async (req, res, next) => {
  try {
    console.log(req.body);
    const { value, error } = checkProductSchema.validate(req.body);
    if (error) {
      return next(error);
    }
    if (req.file) {
      value.imageUrl = await upload(req.file.path);
    }

    const product = await prisma.product.create({
      data: {
        name: value.name,
        code: value.code,
        price: +value.price,
        imageUrl: value.imageUrl,
      },
    });
    res.status(201).json({ message: "created", product });
  } catch (error) {
    next(error);
  } finally {
    if (req.file) {
      fs.unlink(req.file.path);
    }
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    const allProducts = await prisma.product.findMany();
    res.status(200).json({ allProducts });
  } catch (error) {
    next(error);
  }
};
