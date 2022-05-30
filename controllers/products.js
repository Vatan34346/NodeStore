const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ featured: true });
  if (!products) {
    return res.status(404).json({ msg: "Products not exists" });
  }
  res.status(200).json({ products: products, msg: "Success" });
};

const getAllProducts = async (req, res) => {
  // mogoose has limit() ,sort(),select(),skip() built in methods
  const { featured } = req.query;
  const queryObject = {};
  if (featured) {
    queryObject.featured = featured === "true" ? true : false;
  }
  const products = await Product.find(queryObject);
  if (!products) {
    return res.status(404).json({ msg: "Products not exists" });
  }
  res.status(200).json({ products: products, msg: "Success" });
};

module.exports = { getAllProducts, getAllProductsStatic };
