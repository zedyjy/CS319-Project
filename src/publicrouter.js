const express = require("express");
const publicrouter = express.Router();
const path = require("path");

//You are currently in the /views directory in this files usability perspective
publicrouter.get("/", (req, res) => {
  res.render("homePages/Home");
});

publicrouter.get("/student", (req, res) => {
  res.render("Student/StudentHomePage/student");
});

publicrouter.get("/assets/logos/:imagename", (req, res) => {
  const imageName = req.params.imagename;
  const imagePath = path.join(__dirname, "./view/assets/Logos", imageName);
  res.sendFile(imagePath);
});

module.exports = publicrouter;
