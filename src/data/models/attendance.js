const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    createdAt: Date,
    candidate: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
    },
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  },
  { timeStamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
