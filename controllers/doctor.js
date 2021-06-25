const { response } = require("express");
const Doctor = require("../models/doctor");
const hospital = require("../models/hospital");

const getDoctors = async (req, res = response) => {
  const doctors = await Doctor.find()
    .populate("user", "name img")
    .populate("hospital", "name img");

  res.json({
    ok: true,
    doctors,
  });
};

const createDoctor = async (req, res = response) => {
  const uid = req.uid;
  const hospital_id = req.body.hospital;

  try {
    const hospitalDB = await hospital.findById(hospital_id);

    if (!hospitalDB) {
      res.status(404).json({
        ok: false,
        msg: "hospital not found with this id",
      });
    }

    const doctor = new Doctor({
      ...req.body,
      hospital: hospital_id,
      user: uid,
    });
    const doctorDB = await doctor.save();

    res.json({
      ok: true,
      doctor: doctorDB,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Unexpected error. Check logs.",
    });
  }
};

const updateDoctor = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Update Doctor",
  });
};

const deleteDoctor = (req, res = response) => {
  res.json({
    ok: true,
    msg: "Delete Doctor",
  });
};

module.exports = {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
