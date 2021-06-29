const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const {
  createDoctor,
  deleteDoctor,
  getDoctors,
  getDoctorById,
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

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "name field is mandatory").not().isEmpty(),
    check("hospital", "hospital field is mandatory").not().isEmpty(),
    validateFields,
  ],
  updateDoctor
);

router.delete("/:id", validateJWT, deleteDoctor);

router.get("/:id", validateJWT, getDoctorById);

module.exports = { router };
