const fs = require("fs");
const path = require("path");
const { response } = require("express");
const { v4: uuidv4 } = require("uuid");
const { updateImage } = require("../helpers/update-image");

const fileUpload = (req, res = response) => {
  const { table, id } = req.params;

  const validTables = ["hospitals", "doctors", "users"];

  if (!validTables.includes(table)) {
    res.status(400).json({
      ok: false,
      msg: "Supported collection values are users, doctors and hospitals",
    });
  }

  //  Validate if file exists
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send({ ok: false, msg: "No files were uploaded." });
  }

  // Process image
  const file = req.files.image;
  const splitName = file.name.split(".");
  const ext = splitName[splitName.length - 1];

  // Validate extension
  const validExtensions = ["png", "jpg", "jpeg", "gif"];

  if (!validExtensions.includes(ext)) {
    return res.status(400).send({ ok: false, msg: "Extension not allowed." });
  }

  // Generate file name
  const fileName = `${uuidv4()}.${ext}`;

  // Path to save image
  const pathFileName = path.join(__dirname, `../uploads/${table}/${fileName}`);

  updateImage(table, id, fileName);

  // Use the mv() method to place the file somewhere on your server
  file.mv(pathFileName, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        ok: false,
        msg: "Error moving image",
      });
    }
    res.json({
      ok: true,
      msg: `File ${file.name} uploaded successfully`,
    });
  });
};

const getImage = (req, res) => {
  const { table, image } = req.params;

  const pathImage = path.join(__dirname, `../uploads/${table}/${image}`);
  if (fs.existsSync(pathImage)) {
    res.sendFile(pathImage);
  }
  res.sendFile(path.join(__dirname, `../uploads/no-image-available.jpeg`));
};

module.exports = {
  fileUpload,
  getImage,
};
