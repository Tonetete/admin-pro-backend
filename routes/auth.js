const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const { login, googleSignIn, renewToken } = require("../controllers/auth");

const router = Router();

router.post(
  "/",
  [
    check("email", "Email is mandatory").isEmail(),
    check("password", "Password is mandatory").not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  "/google",
  [check("token", "Token is mandatory").not().isEmpty(), validateFields],
  googleSignIn
);

router.get("/renew", validateJWT, renewToken);

module.exports = { router };
