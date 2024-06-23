const Product = require("../models/productModel");

// ******************************// GRaphql Api*******************************************
// All Products
exports.getAllProduct = async () => {
  try {
    const products = await Product.find().populate("createdBy");
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
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

// ************************************// REST API************************************
exports.testData = async (req, res) => {
  return res.json({
    success: true,
    message: "Working",
  });
};

exports.createProduct = async (req, res) => {
  try {
    const { name, price, quantity, description } = req.body;
    console.log(name, price, quantity, description);
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated or user ID not found",
      });
    }
    console.log("User Creating Product: ", req.user._id);
    const product = new Product({
      createdBy: req.user,
      name,
      price,
      quantity,
      description,
    });
    await product.save();
    return res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      product,
    });
  } catch (error) {
    console.log(error.message);
    return res.json({
      success: false,
      message: "Intenal Server Error",
    });
  }
};
