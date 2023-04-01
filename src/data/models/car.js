const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
  make: String,
  model: String,
  owners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Person",
    },
  ],
});

const Car = mongoose.model("Car", carSchema);

module.exports = Car;
