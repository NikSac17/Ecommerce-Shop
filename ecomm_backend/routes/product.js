const router = require("express").Router();
const Product = require("../models/Product");

//add item
router.post("/addItem", async (req, res) => {
  try {
    const {
      title,
      description,
      image,
      category,
      size,
      price,
      brand,
      shipping,
      available,
    } = req.body;

    const product = new Product({
      title,
      description,
      image,
      category,
      size,
      price,
      brand,
      shipping,
      available,
    });

    const saveProduct = await product.save();
    res.send(saveProduct);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//fetch items
router.get("/getAllItems", async (req, res) => {
  try {
    const products = await Product.find({});
    res.send(products);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
