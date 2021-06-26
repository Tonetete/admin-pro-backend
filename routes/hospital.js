const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");
const {
  createHospital,
  deleteHospital,
  getHospitals,
  updateHospital,
} = require("../controllers/hospital");

const router = Router();

router.get("/", validateJWT, getHospitals);

router.post(
  "/",
  [
    validateJWT,
    check("name", "name field is mandatory").not().isEmpty(),
    validateFields,
  ],
  createHospital
);

router.put(
  "/:id",
  [
    validateJWT,
    check("name", "name field is mandatory").not().isEmpty(),
    validateFields,
  ],
  updateHospital
);

router.delete("/:id", validateJWT, deleteHospital);

module.exports = { router };
