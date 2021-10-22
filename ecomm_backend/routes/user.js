const { verifyTokenAndAuthorization } = require("../middleware/verifyToken");
const router = require("express").Router();

//UPDATE
router.put("/:id", verifyTokenAndAuthorization, async (req, res) => {
  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const encrypPass = await bcrypt.hash(req.body.password, salt);
    req.body.password = encrypPass;
  }

  try {
      
  } catch (error) {
      
  }

});

module.exports = router;
