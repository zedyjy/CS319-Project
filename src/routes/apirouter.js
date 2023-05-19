const express = require("express");
const mongoose = require("mongoose");
const apirouter = express.Router();
const { User, Student } = require("./dbmodel");
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
// /register/student - To register a student -  returns: Status Code 200 on sucess, Status Code 400 on failure
// /login/student - To login a student - returns: Status Code 200 on sucess, Status Code 400 on failure
// /delete/user - To delete a user -  returns: Status Code 200 on sucess, Status Code 404, 400 on failure

// ADD a user
apirouter.post("/register/student", async (req, res) => {
  User.findOne({ username: req.body.username }).then(async (result) => {
    if (!result) {
      const newUser = new User({
        username: req.body.username,
        password: req.body.password,
      });

      try {
        const savedUser = await newUser.save();
        const newStudent = new Student({
          user: savedUser._id, // Use the saved user's ID as the reference
        });
        await newStudent.save();
        res
          .status(200)
          .json({ message: "Sucessfully Registered", status: 200 });
      } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
      }
    } else {
      res.status(400).json({ message: "User already exists!", status: 200 });
    }
  });
});

// Login
apirouter.post("/login/student", async (req, res) => {
  User.findOne({
    username: req.body.username,
    password: req.body.password,
  }).then(async (result) => {
    if (result) {
      try {
        res.status(200).json({ message: "Logged In", status: 200 });
      } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
      }
    } else {
      res.status(400).json({ message: "User Not Found!", status: 400 });
    }
  });
});

// DELETE a user
apirouter.post("/delete/student", async (req, res) => {
  try {
    const result = await Student.findOneAndDelete({
      username: req.body.username,
    });

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
