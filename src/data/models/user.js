const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: String,
    password: String,
    firstName: String,
    lastName: String,
    organization: String,
    tokens: [
      {
        type: String,
      },
    ],
  },
  { timeStamps: true }
);

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();
  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
