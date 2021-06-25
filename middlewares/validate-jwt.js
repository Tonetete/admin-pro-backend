const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
  // Read token
  const token = req.headers["x-token"];

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Token not found in headers",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;

    next();
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }
};

module.exports = {
  validateJWT,
};
