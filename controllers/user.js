const { response } = require("express");
const bcrypt = require("bcrypt");

const { generateJWT } = require("../helpers/jwt");
const User = require("../models/user");

const getUsers = async (req, res) => {
  const from = Number(req.query.from) || 0;

  const [users, total] = await Promise.all([
    User.find({}, "name email role google img uid").skip(from).limit(5),
    User.countDocuments(),
  ]);

  res.json({ ok: true, users, total });
};

const createUser = async (req, res = response) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        ok: false,
        msg: "Email already registered.",
      });
    }

    const user = new User(req.body);

    // Encrypt password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generate TOKEN - JWT

    const token = await generateJWT(user.id);

    // .catch((err) => {
    //   res.status(500).json({ ok: false, error: err });
    // });
    res.json({ ok: true, user, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error... check logs.",
    });
  }
};

const updateUser = async (req, res = response) => {
  // TODO: Validate token and chek if user is correct
  const uid = req.params.id;
  const { google, password, email, ...fields } = req.body;

  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "No user found with this id",
      });
    }

    if (userDB.email !== email) {
      const existingEmail = await User.findOne({ email: req.body.email });
      if (existingEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Existing user with that email",
        });
      }
    }

    // Updates
    fields.email = email;
    const userUpdated = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });

    res.json({
      ok: true,
      user: userUpdated,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error... check logs.",
    });
  }
};

const deleteUser = async (req, res) => {
  const uid = req.params.id;
  try {
    const userDB = await User.findById(uid);

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "No user found with this id",
      });
    }

    await User.findByIdAndDelete(uid);

    res.json({
      ok: true,
      msg: "User deleted.",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Unexpected error. Please check logs",
    });
  }
};

module.exports = {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
};
