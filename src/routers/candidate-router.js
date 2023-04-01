const express = require("express");
const router = express.Router();

const Candidate = require("../data/models/candidate");
const logging = require("../services/logger");

router.get("/candidates", async (req, res) => {
  try {
    const candidates = await Candidate.find({});
    res.send(candidates);
  } catch (er) {
    logging(er);
  }
});

module.exports = router;
