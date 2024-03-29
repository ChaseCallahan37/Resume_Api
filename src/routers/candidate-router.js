const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const Candidate = require("../data/models/candidate");
const Resume = require("../data/models/resume");
const logging = require("../services/logger");

const uploadsDirecory = path.join(__dirname, "../uploads").normalize();
console.log(uploadsDirecory);

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

router.get("/candidates", async (req, res) => {
  try {
    const candidates = await Candidate.find({})
      .populate("resumes")
      .populate("attendances");
    res.send(candidates);
  } catch (er) {
    logging(er);
  }
});

router.get("/candidate/:candidateId", async (req, res) => {
  try {
    const candidate = await Candidate.findById(req.params.candidateId);

    await candidate.populate("attendances");

    res.send(candidate);
  } catch (error) {}
});

router.get("/candidate/resume/:fileName", async (req, res) => {
  const filePath = path.join(__dirname, "../../uploads", req.params.fileName);
  res.sendFile(filePath);
});

router.post("/candidate", async (req, res) => {
  console.log(req.body);
  const candidate = new Candidate({ ...req.body });
  try {
    await candidate.save();
    res.send({ candidate });
  } catch (error) {
    logging(error);
    res.send({ error });
  }
});

router.post(
  "/candidate/:candidateId/resume",
  upload.single("resume"),
  async (req, res) => {
    const candidate = await Candidate.findById(req.params.candidateId);
    try {
      const newResume = new Resume({
        owner: req.params.candidateId,
        fileName: req.file.filename,
      });
      candidate.resumes.push(newResume._id);
      await newResume.save();
      await candidate.save();

      res.send({ msg: "Resume succesfully uploaded" });
    } catch (er) {
      res.send({ er });
    }
  }
);

module.exports = router;
