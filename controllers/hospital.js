const { response } = require("express");
const Hospital = require("../models/hospital");

const getHospitals = async (req, res = response) => {
  const hospitals = await Hospital.find().populate("user", "name img");

  res.json({
    ok: true,
    hospitals,
  });
};

const createHospital = async (req, res = response) => {
  const uid = req.uid;
  const hospital = new Hospital({ ...req.body, user: uid });

  try {
    const hospitalDB = await hospital.save();

    res.json({
      ok: true,
      hospital: hospitalDB,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Unexpected error. Check logs.",
    });
  }
};

const updateHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Update Hospital",
  });
};

const deleteHospital = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Delete Hospital",
  });
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
