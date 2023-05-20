const express = require("express");
const publicrouter = express.Router();
const path = require("path");

//You are currently in the /views directory in this files usability perspective

//For Serving Images
publicrouter.get("/assets/:filename", (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "/view/assets/", fileName);
  res.sendFile(filePath);
});

//For Serving CSS files
publicrouter.get("/css/:foldername/:filename", (req, res) => {
  const folderName = req.params.foldername;
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "/view/", folderName, fileName);
  res.sendFile(filePath);
});

//For serving JS files
publicrouter.get("/js/:foldername/:filename", (req, res) => {
  const folderName = req.params.foldername;
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "/view/", folderName, fileName);
  res.sendFile(filePath);
});

//For serving components
publicrouter.get("/components/:foldername/:filename", (req, res) => {
  const folderName = req.params.foldername;
  const fileName = req.params.filename;
  const filePath = path.join(
    __dirname,
    "/view/components/",
    folderName,
    fileName
  );
  res.sendFile(filePath);
});

//---------------------------------------
// ---------- Home Page ---------- //
//---------------------------------------
publicrouter.get("/", (req, res) => {
  res.render("Home/Home");
});

//---------------------------------------
// ---------- Student Pages ---------- //
//---------------------------------------
publicrouter.get("/student", (req, res) => {
  res.render("StudentHome/StudentHomePage");
});

publicrouter.get("/student/view-report", (req, res) => {
  res.render("StudentViewReport/StudentViewReport");
});

publicrouter.get("/student/upload-report", (req, res) => {
  res.render("StudentUploadReport/StudentUploadReport");
});

module.exports = publicrouter;
