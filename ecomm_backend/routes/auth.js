const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config();

//SIGNUP
router.post("/signup", async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const encrypPass = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: encrypPass,
  });

  try {
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });
  if (!user) {
    res.status(401).json({ error: "Invalid Credentials" });
  }

  const passComp = await bcrypt.compare(req.body.password, user.password);
  if (!passComp) {
    res.status(401).json({ error: "Invalid Credentials" });
  }

  const authToken = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: "3d"});

  res.status(200).json({authToken ,username: user.username});

});

module.exports = router;
