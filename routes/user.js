const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const {
  createUser,
  getUsers,
  updateUser,
  deleteUser,
} = require("../controllers/user");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", validateJWT, getUsers);

router.post(
  "/",
  [
    validateJWT,
    check("name", "Name is mandatory").not().isEmpty(),
    check("email", "Email is mandatory").isEmail(),
    check("password", "Password is mandatory").not().isEmpty(),
    validateFields,
  ],
  createUser
);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "Name is mandatory").not().isEmpty(),
    check("email", "Email is mandatory").isEmail(),
    check("role", "Role is mandatory").not().isEmpty(),
    validateFields,
  ],
  updateUser
);

router.delete("/:id", validateJWT, deleteUser);

module.exports = { router };
