const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.header.token;
  if (authHeader) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json("Unvalid token");
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("Authentication Failure");
  }
};

const verifyTokenAndAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id) {
      next();
    } else {
      res.status(403).json("Not allowed to do that");
    }
  });
};

module.exports = { verifyToken, verifyTokenAndAuthorization };
