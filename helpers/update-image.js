const fs = require("fs");
const User = require("../models/user");
const Doctor = require("../models/doctor");
const Hospital = require("../models/hospital");

const removePathImage = (record, table) => {
  const currentPath = `./uploads/${table}/${record.img}`;

  if (fs.existsSync(currentPath)) {
    fs.unlinkSync(currentPath); // remove previous img
  }
};

const updateImage = async (table, id, fileName) => {
  switch (table) {
    case "doctors":
      const doctor = await Doctor.findById(id);
      if (!doctor) {
        return false;
      }
      removePathImage(doctor, table);
      doctor.img = fileName;
      await doctor.save();
      return true;
    case "hospitals":
      const hospital = await Hospital.findById(id);
      if (!hospital) {
        return false;
      }
      removePathImage(hospital, table);
      hospital.img = fileName;
      await hospital.save();
      return true;
    case "users":
      const user = await User.findById(id);
      if (!user) {
        return false;
      }
      removePathImage(user, table);
      user.img = fileName;
      await user.save();
      return true;
    default:
      res.status(400).json({
        ok: false,
        msg: "Supported collection values are users, doctors and hospitals",
      });
      break;
  }
};

module.exports = {
  updateImage,
};
