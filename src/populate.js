const Candidate = require("./data/models/candidate");
const Event = require("./data/models/event");

async function populate() {
  await Candidate.deleteMany({});
  await Event.deleteMany({});

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

  await Candidate.insertMany(candidates);

  const events = [
    {
      title: "Campus Recruiting UA",
      location: "123 Dirt Road",
      startDate: new Date("2024-01-15"),
      endDate: new Date("2024-01-16"),
      school: "University of Alabama",
      attendees: [],
    },
    {
      title: "Campus Recruiting Auburn :(",
      location: "123 Moo Cow Road",
      startDate: new Date("2024-03-15"),
      endDate: new Date("2024-03-15"),
      school: "University of Alabama",
      attendees: [],
    },
  ];

  await Event.insertMany(events);

  const attendee = await Candidate.findOne({ firstName: "John" });
  const event = await Event.findOne({
    title: "Campus Recruiting UA",
  });
  event.attendees.push(attendee._id);
  await event.save();
}

module.exports = populate;
