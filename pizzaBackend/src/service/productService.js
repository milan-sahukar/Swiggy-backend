const cloudinary = require("../config/cloudinaryConfig");
const productRepository = require("../repository/productRepository");
const fs = require("fs/promises");
const internalServerError = require("../utils/internalServerError");
const NotFoundError = require("../utils/notFoundError");

async function createProduct(productDetails) {
  // 1. We should check if an imsge is coming to create the product, then we should first upload it on cloudinary

  const imagePath = productDetails.imagePath;

  if (imagePath) {
    try {
      const cloudinaryResponse = await cloudinary.uploader.upload(imagePath);
      var productImage = cloudinaryResponse.secure_url;
      await fs.unlink(process.cwd() + "/" + imagePath);
    } catch (error) {
      console.log("Error in uploading image to cloudinary", error);

      throw new internalServerError();
    }
  }

  // 2. Then use the url from cloudinary and other product details to add product in db
  const product = await productRepository.createProduct({
    ...productDetails,
    productImage: productImage,
  });

  // if (!product) {
  //   throw {
  //     reason: "Not able to create product",
  //     statusCode: 500,
  //   };
  // }

  return product;
}

async function getProductById(productId) {
  const response = await productRepository.getProductById(productId);
  if (!response) {
    throw new NotFoundError("product");
  }
  return response;
}

async function deleteProductById(productId) {
  const response = await productRepository.getProductByIdAndDelete(productId);
  if (!response) {
    throw new NotFoundError("product");
  }
  return response;
}

module.exports = {
  createProduct,
  getProductById,
  deleteProductById,
};
