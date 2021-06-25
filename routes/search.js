const { Router } = require("express");
const { check } = require("express-validator");
const { validateFields } = require("../middlewares/validate-fields");
const { searchAll, getDocumentsCollection } = require("../controllers/search");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/:search", validateJWT, searchAll);
router.get("/collection/:table/:search", validateJWT, getDocumentsCollection);

module.exports = { router };
