const express = require("express");
const {testData, createProduct } = require("../controllers/productController");
const { isAuthenticated } = require("../middlewares/authentication");

const router = express.Router();

router.route("/all").get(testData);

router.route("/create").post(isAuthenticated, createProduct);

module.exports = router;
