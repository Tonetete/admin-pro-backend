const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { login, googleSignIn } = require("../controllers/auth");

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

module.exports = { router };
