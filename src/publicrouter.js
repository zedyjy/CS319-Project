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

//For Serving User Uploaded Files
publicrouter.get("/uploads/:filename", (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, "../uploads/", fileName);
  res.sendFile(filePath);
});

//---------------------------------------
// ---------- Login Page ---------- //
//---------------------------------------
publicrouter.get("/login", (req, res) => {
  res.render("Login/GeneralLogin");
});

//---------------------------------------
// ---------- Home Page ---------- //
//---------------------------------------
publicrouter.get("/", (req, res) => {
  res.render("Home/Home");
});
//---------------------------------------
// ---------- Summer Training Coordinators Page ---------- //
//---------------------------------------
publicrouter.get("/summer-training-coordinators", (req, res) => {
  res.render("SummerTrainingCoordinators/SummerTrainingCoordinators");
});

//---------------------------------------
// ---------- Course Descriptions---------- //
//---------------------------------------
publicrouter.get("/course-descriptions", (req, res) => {
  res.render("CourseDescriptions/CourseDescriptions");
});
//---------------------------------------
// ---------- FAQ---------- //
//---------------------------------------
publicrouter.get("/frequently-asked-questions", (req, res) => {
  res.render("FrequentlyAskedQuestions/FrequentlyAskedQuestions");
});
//---------------------------------------
// ---------- Announcements---------- //
//---------------------------------------
publicrouter.get("/announcements", (req, res) => {
  res.render("Announcements/Announcements");
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

publicrouter.get("/profile", (req, res) => {
  res.render("Profile/Profile");
});
//---------------------------------------
// ---------- Evaluator Pages ---------- //
//---------------------------------------
publicrouter.get("/evaluator", (req, res) => {
  res.render("EvaluatorHomePage/EvaluatorHomePage");
});

publicrouter.get("/evaluator/give-feedback", (req, res) => {
  res.render("EvaluatorFeedbackPage/EvaluatorGiveFeedbackPage");
});

publicrouter.get("/evaluator/student-list", (req, res) => {
  res.render("EvaluatorFeedbackPage/EvaluatorFeedbackListPage");
});

//---------------------------------------
// ---------- Admin Pages ---------- //
//---------------------------------------
publicrouter.get("/admin", (req, res) => {
  res.render("AdminHome/AdminHome");
});

publicrouter.get("/admin/add-delete-user", (req, res) => {
  res.render("AdminAddUser/AdminAddUser");
});

publicrouter.get("/admin/view-student-list", (req, res) => {
  res.render("AdminViewStudentList/AdminViewStudentList");
});

publicrouter.get("/admin/assignments", (req, res) => {
  res.render("AdminAssignments/AdminAssignments");
});
publicrouter.get("/admin/view-evaluator-list", (req, res) => {
  res.render("AdminViewEvaluator/AdminViewEvaluator");
});
publicrouter.get("/admin/view-coordinator-list", (req, res) => {
  res.render("AdminViewCoordinatorList/AdminViewCoordinatorList");
});
publicrouter.get("/admin/view-tas-list", (req, res) => {
  res.render("AdminViewTAList/AdminViewTAList");
});

//---------------------------------------
// ---------- Company Pages ---------- //
//---------------------------------------
publicrouter.get("/company", (req, res) => {
  res.render("CompanyList/CompanyList");
});

//---------------------------------------
// ---------- Profile Page ---------- //
//---------------------------------------
publicrouter.get("/profile", (req, res) => {
  res.render("Profile/Profile");
});

module.exports = publicrouter;
