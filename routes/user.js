const User = require("../models/user");
const express = require("express");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});
router.post("/signup", upload.single("avatar"), (req, res) => {
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    countryCode,
    gender,
    password,
    birthDate
  } = req.body;

  const avatar = req.file.path;
  const user = new User({
    firstName,
    lastName,
    phoneNumber,
    email,
    countryCode,
    gender,
    birthDate,
    password,
    avatar
  });

  user
    .save()
    .then(result => {
      res.status(201).send(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    });
});

router.post("/login", (req, res) => {
  const { password, phoneNumber } = req.body;
  User.find({
    $and: [{ password: password }, { phoneNumber: phoneNumber }]
  })
    .then(user => {
      return user[0].createToken().then(token => {
        res.header("x-auth", token).send(token);
      });
    })
    .catch(e => {
      console.log("error");
      res.status(400).send(e);
    });
});

module.exports = router;
