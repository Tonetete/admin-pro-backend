const jwt = require("jsonwebtoken");
const User = require("../models/user");

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

const validateAdminRole = async (req, res, next) => {
  const uid = req.uid;
  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }
    if (userDB.role !== "ADMIN_ROLE") {
      return res.status(401).json({
        ok: false,
        msg: "User has no admin privileges",
      });
    }
    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error. Check logs.",
    });
  }
};

const validateAdminRoleOrSameUser = async (req, res, next) => {
  const uid = req.uid;
  const id = req.params.id;
  console.log(req.params);

  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "User not found",
      });
    }
    if (userDB.role === "ADMIN_ROLE" && uid === id) {
      next();
    } else {
      return res.status(401).json({
        ok: false,
        msg: "User has no admin privileges",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error. Check logs.",
    });
  }
};

module.exports = {
  validateJWT,
  validateAdminRole,
  validateAdminRoleOrSameUser,
};
