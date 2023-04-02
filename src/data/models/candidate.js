const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    educataionCerts: [
      {
        type: {
          degree: {
            type: String,
            enum: ["BA", "MA", "Ph.D"],
          },
          major: String,
        },
      },
    ],
    email: String,
    events: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Events",
    },
    firstName: String,
    gpa: Number,
    graduationDate: Date,
    lastName: String,
    resumes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Resume",
      },
    ],
    position: {
      type: String,
      enum: ["internship", "full-time"],
    },
    school: String,
    sponsorshipReq: Boolean,
  },
  { timeStamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
