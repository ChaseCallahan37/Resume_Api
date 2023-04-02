const express = require("express");
const multer = require("multer");
const upload = multer();
const router = express.Router();

const Candidate = require("../data/models/candidate");
const Resume = require("../data/models/resume");
const Attendance = require("../data/models/attendance");
const logging = require("../services/logger");

router.get("/attendance", async (req, res) => {
  try {
    const attendances = await Attendance.find({})
      .populate("events")
      .populate("candidates");
    res.send(attendances);
  } catch (er) {
    logging(er);
  }
});

router.post("/attendance", async (req, res) => {
  let candidate;
  const bodyCandidate = req.body.candidate;
  if (!bodyCandidate._id) {
    candidate = new Candidate({ ...bodyCandidate });
    await candidate.save();
  } else {
    candidate = await Candidate.findById(bodyCandidate._id);
  }
  const attendance = new Attendance({
    createdAt: Date.now(),
    event: req.body.candidate._id,
    candidate: candidate._id,
  });
  try {
    await attendance.save();
    res.send({ msg: "Resume succesfully uploaded" });
  } catch (er) {
    res.send({ er });
  }
});

module.exports = router;
