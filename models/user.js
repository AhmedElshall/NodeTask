const mongoose = require("mongoose");
const validator = require("validator");
const unique = require("mongoose-unique-validator");

const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "blank"]
  },
  lastName: {
    type: String,
    required: [true, "blank"]
  },
  countryCode: {
    type: String,
    required: [true, "blank"]
  },
  gender: {
    type: String,
    required: [true, "blank"],
    enum: ["Male", "Female"]
  },
  phoneNumber: {
    type: String,
    unique: [true, "taken"],
    minlength: [10, "too_short"],
    maxlength: [15, "too_long"],
    validate: {
      validator: function(phone_num) {
        return /^\+?[1-9]\d{1,14}$/.test(phone_num);
      },
      message: " Not a valid PhoneNumber "
    },
    required: [true, "blank"]
  },
  birthDate: {
    type: Date,
    max: [Date.now, "in the future"],
    // validate: {
    //   validator: function(date) {
    //     console.log(date);
    //     return /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])T00:00:00.000Z$/.test(
    //       date
    //     );
    //   },
    //   message: " Not a valid Date Format "
    // },
    required: [true, "blank"]
  },
  email: {
    type: String,
    required: false,
    unique: [true, "taken"],
    validate: {
      validator: validator.isEmail,
      message: " Not a valid email"
    }
  },

  avatar: {
    type: String,
    required: [true, "blank"]
  },
  password: {
    type: String,
    required: [true, "blank"],
    minlength: 1
  }
});

userSchema.plugin(unique);

userSchema.methods.createToken = function() {
  const user = this;

  var token = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + 60 * 60
    },
    "salt"
  );
  return user.save().then(() => {
    return token;
  });
};

const User = mongoose.model("User", userSchema);

module.exports = User;
