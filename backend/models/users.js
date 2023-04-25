const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid!");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 7,
      validate(value) {
        if (validator.contains(value, "password")) {
          throw new Error("Password can not contain password");
        }
      },
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    avatar: {
      type: String,
    },
  },
  {timestamps: true},
);

UserSchema.post("save", (error, _, next) => {
  if (error.name === "MongoServerError" && error.code === 11000) {
    return next(new Error("Already user exists with this email!"));
  } else {
    return next(error);
  }
});

module.exports = mongoose.model("User", UserSchema);
