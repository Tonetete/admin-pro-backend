const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const {
  createHospital,
  deleteHospital,
  getHospitals,
  updateHospital,
} = require("../controllers/hospital");
const { validateJWT } = require("../middlewares/validate-jwt");

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

router.put("/:id", [], updateHospital);

router.delete("/:id", deleteHospital);

module.exports = { router };
