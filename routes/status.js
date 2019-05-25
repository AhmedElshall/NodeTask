const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Status = require("../models/status");
const jwt = require("jsonwebtoken");

router.post("/create", (req, res) => {
  const { phoneNumber, authToken, status } = req.body;

  User.find({
    phoneNumber: phoneNumber
  }).then(user => {
    console.log(user);
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      jwt.verify(authToken, "salt", (err, data) => {
        if (err) {
          res.sendStatus(403);
          reject();
        } else {
          const newStatus = new Status({
            status,
            user
          });
          newStatus.save(err => {
            if (!err) res.send("Sucess");
          });
          resolve();
        }
      });
    });
  });
});

module.exports = router;
