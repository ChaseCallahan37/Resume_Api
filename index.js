const populate = require("./src/populate");
const app = require("./src/app");
const Person = require("./src/data/models/candidate");
const Car = require("./src/data/models/event");

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on http://127.0.0.1:${port}`);
});

// populate();
