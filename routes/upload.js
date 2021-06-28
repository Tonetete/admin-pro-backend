const { Router } = require("express");
const expressFileUpload = require("express-fileupload");
const { fileUpload, getImage } = require("../controllers/upload");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.use(expressFileUpload());

router.put("/:table/:id", validateJWT, fileUpload);

router.get("/:table/:image", getImage);

module.exports = { router };
