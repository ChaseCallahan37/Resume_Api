const express = require("express");
const multer = require("multer");
const upload = multer();
const router = express.Router();

const Candidate = require("../data/models/candidate");
const Resume = require("../data/models/resume");
const logging = require("../services/logger");

router.get("/candidates", async (req, res) => {
  try {
    const candidates = await Candidate.find({});
    res.send(candidates);
  } catch (er) {
    logging(er);
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
        data: req.file.buffer,
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
