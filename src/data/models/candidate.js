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
    attendances: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Attendance",
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

// candidateSchema.virtual("attendances", {
//   ref: "Attendance",
//   localField: "_id",
//   foreignField: "candidate",
//   justOne: false, // set this option to false to return an array
//   get: function () {
//     return this._attendances; // this will return an array of attendances documents
//   },
//   set: function (attendances) {
//     this._attendances = attendances; // this will set the _attendances property of the Candidate document
//   },
// });

const Candidate = mongoose.model("Candidate", candidateSchema);

module.exports = Candidate;
