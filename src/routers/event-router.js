const express = require("express");
const router = express.Router();

const Event = require("../data/models/event");
const logging = require("../services/logger");
const Candidate = require("../data/models/candidate");

router.get("/events", async (req, res) => {
  const events = await Event.find({}).populate("attendees");
  try {
    res.send(events);
  } catch (er) {
    logging(er);
  }
});

router.post("/event", async (req, res) => {
  try {
    const event = new Event({ ...req.body });
    event.save();
    res.send(event);
  } catch (er) {
    logging(er);
  }
});

router.patch("/event", async (req, res) => {
  const updates = Object.keys(req.body);
  const event = await Event.findById(req.body._id);
  try {
    updates.forEach((update) => (event[update] = req.body[update]));
    await event.save();
    res.send({ msg: "succesful", event });
  } catch (error) {
    logging(error);
  }
});

// router.post("/event/attendance", async (req, res) => {
//   const event = await Event.findById(req.body.eventId);
//   event.attendees.push(req.body.attendeeId);
//   console.log(event.attendees);
//   try {
//     event.save();
//     res.send({ msg: "saved succesfully" });
//   } catch (er) {
//     logging(er);
//   }
// });

module.exports = router;
