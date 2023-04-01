const mongoose = require("mongoose");

const candidateSchema = new mongoose.Schema(
  {
    email: String,
    firstName: String,
    lastName: String,
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
    gpa: Number,
    graduationDate: Date,
    position: {
      type: String,
      enum: ["internship", "full-time"],
    },
    //Optional
    school: String,
    sponsorshipReq: Boolean,
  },
  { timeStamps: true }
);

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
