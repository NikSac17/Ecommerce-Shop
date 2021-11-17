const router = require("express").Router();
const fetchUser = require("../middleware/fetchUser");
const Cart = require("../models/Cart");

//add Item
router.post("/addToCart", fetchUser, async (req, res) => {
  try {
    const { image, title, price, quantity, subtotal } = req.body;

    const cart = new Cart({
      image,
      title,
      price,
      quantity,
      subtotal,
      user: req.user.id,
    });
    const saveCart = await cart.save();
    res.send(saveCart);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//fetch from cart
router.get("/getFromCart", fetchUser, async (req, res) => {
  try {
    const cart = await Cart.find({ user: req.user.id });
    res.send(cart);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

//delete from cart
router.delete("/deleteFromCart/:id", fetchUser, async (req, res) => {
  try {
    let cart = await Cart.findById(req.params.id);
    if (!cart) {
      res.status(404).send("Not found");
    }

    if (cart.user.toString() !== req.user.id) {
      res.status(404).send("Not Allowed");
    }

    cart = await Cart.findByIdAndDelete(req.params.id);
    res.json({ Success: "Deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
