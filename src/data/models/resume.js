const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema(
  {
    createdAt: Date,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
    },
    data: Buffer,
  },
  { timeStamps: true }
);

const Resume = mongoose.model("Resume", resumeSchema);

module.exports = Resume;
