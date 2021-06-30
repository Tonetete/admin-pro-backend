const { response } = require("express");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");
const { getMenuFrontend } = require("../helpers/menu-frontend");

const login = async (req, res = response) => {
  try {
    const { email, password } = req.body;

    // Check email
    const userDB = await User.findOne({ email });

    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Email not found",
      });
    }

    // Verify password

    const validPassword = bcrypt.compareSync(password, userDB.password);

    if (!validPassword) {
      res.status(400).json({
        ok: false,
        msg: "Password not valid",
      });
    }

    // Generate TOKEN - JWT

    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      token,
      menu: getMenuFrontend(userDB.role),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Unexpected error. Please check logs",
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const googleToken = req.body.token;
  try {
    const { name, email, picture } = await googleVerify(googleToken);

    const userDB = await User.findOne({ email });
    let user;

    if (!userDB) {
      // If user doesn't exist
      user = new User({
        name,
        email,
        password: "google@@@",
        img: picture,
        google: true,
      });
    } else {
      // If user exists
      user = userDB;
      user.google = true;
    }

    // Save in DB
    await user.save();

    // Generate JWT
    const token = await generateJWT(userDB.id);

    res.json({
      ok: true,
      msg: "Google Signin",
      token,
      name,
      email,
      picture,
      menu: getMenuFrontend(user.role),
    });
  } catch (error) {
    res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }
};

const renewToken = async (req, res = response) => {
  const uid = req.uid;

  // Generate JWT
  const token = await generateJWT(uid);
  const userDB = await User.findById(uid);
  if (!userDB) {
    res.status.apply(400).json({
      ok: false,
      msg: "User not found with that token.",
    });
  }

  res.json({
    ok: true,
    token,
    user: userDB,
    menu: getMenuFrontend(userDB.role),
  });
};

module.exports = { login, googleSignIn, renewToken };
