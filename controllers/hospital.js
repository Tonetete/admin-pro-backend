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

const updateHospital = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { uid } = req;

    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      res.status(404).json({
        ok: false,
        msg: "Hospital not found.",
      });
    }

    const hospitalChanges = {
      ...req.body,
      user: uid,
    };

    const hospitalUpdated = await Hospital.findByIdAndUpdate(
      id,
      hospitalChanges,
      { new: true }
    );

    res.status(200).json({
      ok: true,
      msg: "Hospital updated.",
      hospital: hospitalUpdated,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Unexpected error. Check logs.",
    });
  }
};

const deleteHospital = async (req, res = response) => {
  const { id } = req.params;
  try {
    const hospitalDB = await Hospital.findById(id);

    if (!hospitalDB) {
      return res.status(404).json({
        ok: false,
        msg: "Hospital not found.",
      });
    }

    await Hospital.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Hospital deleted.",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error. Please check logs",
    });
  }
};

module.exports = {
  getHospitals,
  createHospital,
  updateHospital,
  deleteHospital,
};
