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
    const candidates = await Candidate.find({}).populate("resumes");
    res.send(candidates);
  } catch (er) {
    logging(er);
  }
});

router.get("/candidate/resume/:fileName", async (req, res) => {
  // const pdfPath = "example.pdf";
  // res.setHeader("Content-Type", "application/pdf");
  // pdfStream.pipe(res);

  const filePath = path.join(
    __dirname,
    "../../uploads",
    `${req.params.fileName}.jpg`
  );
  console.log(`Dir Name: ${filePath}`);
  res.sendFile(filePath);
  // const pdfStream = fs.createReadStream(`./uploads/${req.params.fileName}`);
  // res.setHeader("Content-Type", "image/png");
  // pdfStream.pipe(res);

  // res.sendFile(test3);
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
