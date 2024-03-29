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
// ---------- Final Grade ---------- //
//---------------------------------------
publicrouter.get("/coordinator/final-grade", (req, res) => {
  res.render("FinalGrade/FinalGradePage");
});

//---------------------------------------
// ---------- FAQ---------- //
//---------------------------------------
publicrouter.get("/notifications", (req, res) => {
  res.render("Notifications/NotificationsPage");
});
//---------------------------------------
// ---------- Announcements---------- //
//---------------------------------------
publicrouter.get("/announcements", (req, res) => {
  res.render("Announcements/Announcements");
});
publicrouter.get("/create-announcements", (req, res) => {
  res.render("AdminAnnouncements/AdminAnnouncementsPage");
});
//---------------------------------------
// ---------- Others---------- //
//---------------------------------------
publicrouter.get("/others", (req, res) => {
  res.render("Others/Others");
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

publicrouter.get("/student/grades", (req, res) => {
  res.render("StudentGrades/StudentGradesPage");
});

publicrouter.get("/profile", (req, res) => {
  res.render("Profile/Profile");
});

publicrouter.get("/internship-company", (req, res) => {
  res.render("StudentInternshipCompany/StudentInternshipCompany");
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

publicrouter.get("/evaluator/company-list", (req, res) => {
  res.render("EvaluatorCompanyList/EvaluatorCompanyList");
});
//---------------------------------------
// ---------- ta Pages ---------- //
//---------------------------------------
publicrouter.get("/ta", (req, res) => {
  res.render("TaHome/TaHomePage");
});

publicrouter.get("/ta/statistics", (req, res) => {
  res.render("Statistics/Statistics");
});

publicrouter.get("/ta/give-feedback", (req, res) => {
  res.render("TaFeedbackPage/TaGiveFeedbackPage");
});

publicrouter.get("/ta/student-list", (req, res) => {
  res.render("TaFeedbackPage/TaFeedbackListPage");
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

publicrouter.get("/admin/view-company-list", (req, res) => {
  res.render("AdminViewCompanyList/AdminViewCompanyList");
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

//---------------------------------------
// ---------- Coordinator Pages ---------- //
//---------------------------------------
publicrouter.get("/coordinator/assignments", (req, res) => {
  res.render(
    "CoordinatorAssignStudentstoEvaluator/CoordinatorAssignStudentstoEvaluators"
  );
});
publicrouter.get("/coordinator", (req, res) => {
  res.render("CoordinatorHome/CoordinatorHome");
});

publicrouter.get("/coordinator/company-list", (req, res) => {
  res.render("CoordinatorCompanyList/CoordinatorCompanyList");
});
//---------------------------------------
// ---------- Contact Page ---------- //
//---------------------------------------
publicrouter.get("/contact", (req, res) => {
  res.render("Contact/Contact");
});
//---------------------------------------
// ---------- UNIQUE URL LOGIC ---------- //
//---------------------------------------

publicrouter.get("/work-report-form/:reportid", (req, res) => {
  const reportid = req.params.reportid;
  console.log(reportid);
  res.render("CompanyWorkReport/CompanyWorkReport", { report_id: reportid });
});

module.exports = publicrouter;
