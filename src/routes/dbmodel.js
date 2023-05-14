const mongoose = require("mongoose");

const users = new mongoose.Schema({
  username: {
    type: String,
  },
});

module.exports = mongoose.model("users", users);
