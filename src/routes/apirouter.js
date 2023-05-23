const express = require("express");
const mongoose = require("mongoose");
const apirouter = express.Router();
const { User, Student, Evaluator } = require("./dbmodel");
const path = require("path");

// ------- mongo db connection --------
mongoose.connect("mongodb://127.0.0.1:27018/internship-system");
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

// Register
apirouter.post("/register/:user", async (req, res) => {
  const username = req.body.username;
  if (req.params.user == "student") {
    try {
      // Search the evaluators collection
      Evaluator.findOne({ username: username }).then(async (evaluator) => {
        if (evaluator) {
          res
            .status(400)
            .json({ message: "Evaluator already exists!", status: 400 });
          return;
        }

        // Search the users collection
        User.findOne({ username: username }).then(async (user) => {
          if (user) {
            res
              .status(400)
              .json({ message: "User already exists!", status: 400 });
            return;
          }

          // Search the students collection
          Student.findOne({ username: username }).then(async (student) => {
            if (student) {
              res
                .status(400)
                .json({ message: "Student already exists!", status: 400 });
              return;
            }

            // Create new user and student if no duplicates found
            const newUser = new User({
              username: req.body.username,
              password: req.body.password,
            });

            try {
              const savedUser = await newUser.save();
              const newStudent = new Student({
                user: savedUser._id, // Use the saved user's ID as the reference
                username: req.body.username,
              });
              await newStudent.save();
              res
                .status(200)
                .json({ message: "Successfully Registered", status: 200 });
            } catch (error) {
              res.status(400).json({ message: error.message, status: 400 });
            }
          });
        });
      });
    } catch (error) {
      res.status(400).json({ message: error.message, status: 400 });
    }
  } else if (req.params.user == "evaluator") {
    try {
      // Search the evaluators collection
      Evaluator.findOne({ username: username }).then(async (evaluator) => {
        if (evaluator) {
          res
            .status(400)
            .json({ message: "Evaluator already exists!", status: 400 });
          return;
        }

        // Search the users collection
        User.findOne({ username: username }).then(async (user) => {
          if (user) {
            res
              .status(400)
              .json({ message: "User already exists!", status: 400 });
            return;
          }

          // Search the students collection
          Student.findOne({ username: username }).then(async (student) => {
            if (student) {
              res
                .status(400)
                .json({ message: "Student already exists!", status: 400 });
              return;
            }

            // Create new user and student if no duplicates found
            const newUser = new User({
              username: req.body.username,
              password: req.body.password,
            });

            try {
              const savedUser = await newUser.save();
              const newStudent = new Evaluator({
                user: savedUser._id, // Use the saved user's ID as the reference
                username: req.body.username,
              });
              await newStudent.save();
              res.status(200).json({
                message: "Successfully Registered Evaluator",
                status: 200,
              });
            } catch (error) {
              res.status(400).json({ message: error.message, status: 400 });
            }
          });
        });
      });
    } catch (error) {
      res.status(400).json({ message: error.message, status: 400 });
    }
  }
});

// Login
apirouter.post("/login", async (req, res) => {
  User.findOne({
    username: req.body.username,
    password: req.body.password,
  }).then(async (result) => {
    if (result) {
      try {
        const userType = await identifyUserType(req.body.username);
        res
          .status(200)
          .json({ message: "Logged In", userType: userType, status: 200 });
      } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
      }
    } else {
      res.status(400).json({ message: "User Not Found!", status: 400 });
    }
  });
});

// Identify a user
async function identifyUserType(usernameParam) {
  try {
    const username = usernameParam;

    // Search the evaluators collection
    const evaluator = await Evaluator.findOne({ username: username });
    if (evaluator) {
      return "Evaluator";
    }

    // Search the students collection
    const student = await Student.findOne({ username: username });
    if (student) {
      return "Student";
    }

    // User not found in either collection
    return "User not found";
  } catch (error) {
    return error;
  }
}

// DELETE a user
apirouter.post("/delete/:student", async (req, res) => {
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
