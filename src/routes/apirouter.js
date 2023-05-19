const express = require("express");
const mongoose = require("mongoose");
const apirouter = express.Router();
const User = require("./dbmodel");
const path = require("path");

// ------- mongo db connection --------
mongoose.connect("mongodb://localhost:27018/internship-system");
const database = mongoose.connection; //get the database object from mongoose connection

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected: " + database.name);
});

// ------- mongo db connection --------

// ------- List of API's  in this file. -------- //
// /register/user - To register a user -  returns: Status Code 200 on sucess, Status Code 400 on failure
// /delete/user - To delete a user -  returns: Status Code 200 on sucess, Status Code 404, 400 on failure

// ADD a user
apirouter.post("/register/user", async (req, res) => {
  User.findOne({ username: req.body.username }).then(async (result) => {
    if (!result) {
      const newUser = new User({
        username: req.body.username,
      });

      try {
        const dataToSave = await newUser.save();
        res.status(200).json(dataToSave);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
    } else {
      res.status(400).json({ message: "User already exists!" });
    }
  });
});

// DELETE a user
apirouter.post("/delete/user", async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ username: req.body.username });

    if (result) {
      res.status(200).json({ message: "User deleted", result: result });
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

//End file and export modules
module.exports = apirouter;
