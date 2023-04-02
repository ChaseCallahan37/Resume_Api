const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cors = require("cors");
const upload = multer();

const logging = require("./services/logger");
const Candidate = require("./data/models/candidate");
const Event = require("./data/models/event");

require("./data/connection");
const personRouter = require("./routers/event-router");
const carRouter = require("./routers/candidate-router");
const attendanceRouter = require("./routers/attendance-router");
const populate = require("./populate");

const app = express();

//Makes the public directory able to serve up assets
app.use(express.static("public"));

app.use(cors());

//Allows for JSON bodies to be passed to and accessed from endpoints
app.use(express.json());

//Allows functionality to read in file data
app.use(bodyParser.urlencoded({ extended: true }));

app.use(personRouter);
app.use(carRouter);
app.use(attendanceRouter);

//General route to prove it is working
app.get("/", (req, res) => {
  res.send("working");
});

app.get("/populate", async (req, res) => {
  try {
    await populate();
    res.send("populated data");
  } catch (er) {
    logging(er);
  }
});

app.post("/upload", upload.single("resume"), (req, res) => {
  console.log(req.file.buffer);
  res.send({ msg: "done" });
});

module.exports = app;
