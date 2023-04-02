const express = require("express");
const multer = require("multer");

const router = express.Router();

const Candidate = require("../data/models/candidate");
const Resume = require("../data/models/resume");
const Attendance = require("../data/models/attendance");
const Event = require("../data/models/event");
const logging = require("../services/logger");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".jpg"); // specify the file name (use the current timestamp and '.png' extension)
  },
});

const upload = multer({
  storage,
});

router.get("/attendances", async (req, res) => {
  try {
    const attendances = await Attendance.find({})
      .populate("event")
      .populate("candidate");
    res.send(attendances);
  } catch (er) {
    logging(er);
  }
});

router.post("/attendance", async (req, res) => {
  const candidate = await Candidate.findById(req.body.candidateId);
  const event = await Event.findById(req.body.eventId);

  const attendance = new Attendance({
    createdAt: Date.now(),
    event: event._id,
    candidate: candidate._id,
  });
  candidate.attendances.push(attendance._id);
  event.attendees.push(attendance._id);
  try {
    await attendance.save();
    await candidate.save();
    await event.save();
    res.send({ msg: "Attendance Successfully saved" });
  } catch (er) {
    res.send({ er });
  }
});

module.exports = router;
