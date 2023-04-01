const express = require("express");

const logging = require("./services/logger");
const Candidate = require("./data/models/candidate");

require("./data/connection");
const personRouter = require("./routers/person-router");
const carRouter = require("./routers/candidate-router");

const app = express();

//Allows for JSON bodies to be passed to and accessed from endpoints
app.use(express.json());

app.use(personRouter);
app.use(carRouter);

//General route to prove it is working
app.get("/", (req, res) => {
  res.send("working");
});

app.get("/populate", (req, res) => {
  try {
    populate();
    res.send("populated data");
  } catch (er) {
    logging(er);
  }
});

async function populate() {
  await Candidate.deleteMany({});

  //Give me 5 different candidates within the an array called candidate
  //Based off the candidate schema

  const candidates = [
    {
      email: "johndoe@example.com",
      firstName: "John",
      lastName: "Doe",
      educataionCerts: [
        {
          degree: "BA",
          major: "Computer Science",
        },
      ],
      gpa: 3.8,
      graduationDate: new Date("2022-05-01"),
      position: "full-time",
      school: "University of California, Berkeley",
      sponsorshipReq: false,
    },
    {
      email: "janedoe@example.com",
      firstName: "Jane",
      lastName: "Doe",
      educataionCerts: [
        {
          degree: "MA",
          major: "Electrical Engineering",
        },
      ],
      gpa: 3.5,
      graduationDate: new Date("2023-05-01"),
      position: "internship",
      school: "Massachusetts Institute of Technology",
      sponsorshipReq: true,
    },
    {
      email: "bobsmith@example.com",
      firstName: "Bob",
      lastName: "Smith",
      educataionCerts: [
        {
          degree: "Ph.D",
          major: "Economics",
        },
      ],
      gpa: 3.2,
      graduationDate: new Date("2022-06-01"),
      position: "full-time",
      school: "Stanford University",
      sponsorshipReq: false,
    },
    {
      email: "alicewang@example.com",
      firstName: "Alice",
      lastName: "Wang",
      educataionCerts: [
        {
          type: {
            degree: "BA",
            major: "Environmental Studies",
          },
        },
      ],
      gpa: 3.9,
      graduationDate: new Date("2023-06-01"),
      position: "internship",
      school: "University of California, Los Angeles",
      sponsorshipReq: true,
    },
    {
      email: "davidnguyen@example.com",
      firstName: "David",
      lastName: "Nguyen",
      educataionCerts: [
        {
          degree: "MA",
          major: "Mathematics",
        },
        {
          type: {
            degree: "Ph.D",
            major: "Computer Science",
          },
        },
      ],
      gpa: 3.7,
      graduationDate: new Date("2023-06-01"),
      position: "full-time",
      school: "University of Washington",
      sponsorshipReq: false,
    },
  ];

  Candidate.insertMany(candidates);
}
module.exports = app;
