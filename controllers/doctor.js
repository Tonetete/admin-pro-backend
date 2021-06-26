const { response } = require("express");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");

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
    const hospitalDB = await Hospital.findById(hospital_id);

    if (!hospitalDB) {
      res.status(404).json({
        ok: false,
        msg: "Missing 'hospital' field or not found.",
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

const updateDoctor = async (req, res = response) => {
  try {
    const { id } = req.params;
    const { uid } = req;
    const hospital_id = req.body.hospital;

    const hospitalDB = await Hospital.findById(hospital_id);

    if (!hospitalDB) {
      res.status(404).json({
        ok: false,
        msg: "Missing 'hospital' field or not found.",
      });
    }

    const doctorDB = await Doctor.findById(id);

    if (!doctorDB) {
      res.status(404).json({
        ok: false,
        msg: "Doctor not found.",
      });
    }

    const doctorChanges = {
      ...req.body,
      user: uid,
      hospital: hospital_id,
    };

    const doctorUpdated = await Doctor.findByIdAndUpdate(id, doctorChanges, {
      new: true,
    });

    res.status(200).json({
      ok: true,
      msg: "Doctor updated.",
      doctor: doctorUpdated,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Unexpected error. Check logs.",
    });
  }
};

const deleteDoctor = async (req, res = response) => {
  const { id } = req.params;
  try {
    const doctorDB = await Doctor.findById(id);

    if (!doctorDB) {
      return res.send(404).json({
        ok: false,
        msg: "Doctor not found.",
      });
    }

    await Doctor.findByIdAndDelete(id);

    res.json({
      ok: true,
      msg: "Doctor deleted.",
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
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
};
