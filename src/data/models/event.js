const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  title: String,
  location: String,
  startDate: Date,
  endDate: Date,
  school: String,
  attendees: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
    },
  ],
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;
