const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    tokens: [
      {
        type: String,
      },
    ],
  },
  { timeStamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
