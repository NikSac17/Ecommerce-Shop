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
  var success = false;

  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: encrypPass,
  });

  try {
    const newUser = await user.save();
    success = true;
    res.status(200).json({ success, newUser });
  } catch (error) {
    res.status(500).json(error);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try {
    var success = false;
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      res.status(401).json({ error: "Invalid Credentials" });
    }

    const passComp = await bcrypt.compare(req.body.password, user.password);
    if (!passComp) {
      res.status(401).json({ error: "Invalid Credentials" });
    }

    success = true;
    const authToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.status(200).json({ success, authToken, username: user.username });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
