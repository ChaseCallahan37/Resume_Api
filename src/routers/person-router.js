const express = require("express");
const router = express.Router();

const Person = require("../data/models/candidate");
const logging = require("../services/logger");

router.get("/people", async (req, res) => {
  try {
    const people = await Person.find({}).populate("cars").exec();
    res.send(people);
  } catch (er) {
    logging(er);
  }
});

module.exports = router;
