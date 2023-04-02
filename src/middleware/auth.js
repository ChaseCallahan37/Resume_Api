const User = require("../data/models/user");

const auth = async (req, res, next) => {
  try {
    const user = await User.findOne({
      email: req.body.cred.email,
      password: req.body.cred.password,
    });
    console.log(user);
    if (!user) {
      throw new Error();
    }

    req.user = user;
    next();
  } catch (er) {
    res.status(401).send({ error: "Invalid credentials" });
  }
};

module.exports = auth;
