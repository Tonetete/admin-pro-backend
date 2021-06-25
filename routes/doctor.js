const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const {
  createDoctor,
  deleteDoctor,
  getDoctors,
  updateDoctor,
} = require("../controllers/Doctor");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", validateJWT, getDoctors);

router.post(
  "/",
  [
    validateJWT,
    check("name", "name field is mandatory").not().isEmpty(),
    check("hospital", "hospital field must be valid").isMongoId(),
    validateFields,
  ],
  createDoctor
);

router.put("/:id", [], updateDoctor);

router.delete("/:id", deleteDoctor);

module.exports = { router };
