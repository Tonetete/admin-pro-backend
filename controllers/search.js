const { response } = require("express");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");

const searchAll = async (req, res = response) => {
  const { criteria } = req.query;

  const regex = new RegExp(criteria, "i");

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
  const { table } = req.params;
  const { criteria, from = 0 } = req.query;

  const limit = 5;
  let data = [];
  let count = 0;

  const regex = new RegExp(criteria, "i");

  switch (table) {
    case "doctors":
      data = await Doctor.find({ name: regex })
        .populate("user", "name img")
        .populate("hospital", "name img")
        .skip(Number(from))
        .limit(limit);
      count = await Doctor.find({ name: regex }).countDocuments();
      break;
    case "hospitals":
      data = await Hospital.find({ name: regex })
        .populate("user", "name img")
        .skip(Number(from))
        .limit(limit);
      count = await Hospital.find({ name: regex }).countDocuments();
      break;
    case "users":
      data = await User.find({ name: regex }).skip(Number(from)).limit(limit);
      count = await User.find({ name: regex }).countDocuments();
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
    total: count,
  });
};

module.exports = {
  getDocumentsCollection,
  searchAll,
};
