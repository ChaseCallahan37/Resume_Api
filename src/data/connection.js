const mongoose = require("mongoose");

mongoose
  .connect("mongodb://134.122.118.230:27017/innovate-api-db", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));
