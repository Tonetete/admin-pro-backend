const { response } = require("express");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");

const searchAll = async (req, res = response) => {
  const search = req.params.search;

  const regex = new RegExp(search, "i");

  const [users, doctors, hospitals] = await Promise.all([
    User.find({ name: regex }),
    Doctor.find({ name: regex }),
    Hospital.find({ name: regex }),
  ]);

  res.json({
    ok: true,
    users,
    hospitals,
    doctors,
  });
};

const getDocumentsCollection = async (req, res = response) => {
  const { table, search } = req.params;
  let data = [];

  const regex = new RegExp(search, "i");

  switch (table) {
    case "doctors":
      data = await Doctor.find({ name: regex })
        .populate("user", "name img")
        .populate("hospital", "name img");
      break;
    case "hospitals":
      data = await Hospital.find({ name: regex }).populate("user", "name img");
      break;
    case "users":
      data = await User.find({ name: regex });
      break;
    default:
      res.status(400).json({
        ok: false,
        msg: "Supported collection values are users, doctors and hospitals",
      });
      break;
  }

  res.json({
    ok: true,
    results: data,
  });
};

module.exports = {
  getDocumentsCollection,
  searchAll,
};
