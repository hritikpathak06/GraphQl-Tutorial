const Product = require("../models/productModel");

// All Products
exports.getAllProduct = async () => {
  const products = await Product.find();
  return products;
};

// Get Products by ID
exports.getProductById = async (id) => {
  try {
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("Product not found");
    }
    return product;
  } catch (error) {
    throw new Error(`Error fetching product: ${error.message}`);
  }
};
