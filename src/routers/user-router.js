const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const User = require("../data/models/user");
const logging = require("../services/logger");
const Candidate = require("../data/models/candidate");

router.post("/login", auth, async (req, res) => {
  try {
    res.send(req.user);
  } catch (er) {
    logging(er);
  }
});

router.post("/user", async (req, res) => {
  const user = new User({ ...req.body.user });
  try {
    await user.save();
    res.send({ user: user.toJSON(), msg: "user succesfully created" });
  } catch (er) {
    logging(er);
  }
});

router.patch("/user", auth, async (req, res) => {
  console.log(req.user);
  const updates = Object.keys(req.body);
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user.toJSON());
  } catch (er) {
    res.status(400).send(er);
  }
});

module.exports = router;
