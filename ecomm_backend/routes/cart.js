const router = require("express").Router();
const Cart = require("../models/Cart");

//add Item
router.post("/addToCart", async (req, res) => {
  try {
    const { image, title, price, quantity, subtotal } = req.body;

    const cart = new Cart({ image, title, price, quantity, subtotal });
    const saveCart = await cart.save();
    res.send(saveCart);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//fetch from cart
router.get("/getFromCart", async (req, res) => {
  try {
      const cart = await Cart.find({});
      res.send(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
