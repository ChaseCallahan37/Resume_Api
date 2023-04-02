const express = require("express");
const router = express.Router();

const User = require("../data/models/user");
const logging = require("../services/logger");
const Candidate = require("../data/models/candidate");

router.get("/user", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.find({ username, password });
    res.send(user);
  } catch (er) {
    logging(er);
  }
});

router.post("/user", async (req, res) => {
  const user = new User({ ...req.body.user });
  try {
    user.save();
    res.send({ user, msg: "user succesfully created" });
  } catch (er) {
    logging(er);
  }
});

module.exports = router;
