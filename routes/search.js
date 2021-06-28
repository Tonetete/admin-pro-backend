const { Router } = require("express");
const { query } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { searchAll, getDocumentsCollection } = require("../controllers/search");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get(
  "/",
  [
    validateJWT,
    query("criteria", "criteria param is not defined").not().isEmpty(),
    validateFields,
  ],
  searchAll
);
router.get(
  "/collection/:table",
  [
    validateJWT,
    query("criteria", "criteria param is not defined").not().isEmpty(),
    validateFields,
  ],
  getDocumentsCollection
);

module.exports = { router };
