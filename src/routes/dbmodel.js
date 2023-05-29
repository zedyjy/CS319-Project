const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
  },
  date: {
    type: Date,
  },
});

// User Schema
const userSchema = new mongoose.Schema({
  user_id: {
    required: true,
    type: String,
  },
  password: {
    required: true,
    type: String,
  },
  fullname: {
    type: String,
  },
  surname: {
    type: String,
  },
  email: {
    type: String,
  },
  notifications: {
    type: [notificationSchema],
  },
  readnotifications: {
    type: [notificationSchema],
  },
});

// Student Schema
const studentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  profileImage: {
    data: {
      filetype: String,
      uploadDate: Date,
    },
  },
  user_id: {
    type: String,
    required: true,
  },
  department: {
    type: String,
  },
  resume: {
    type: String,
  },
  userType: {
    type: String,
    default: "Student",
  },
  courses: {
    type: [String],
  },
  assignedEvaluators: {
    type: [String],
  },
  assignedTAs: {
    type: [String],
  },
  companyId: {
    type: String,
  },
  courseGrade: {
    type: String,
  },
  mainReportID: {
    type: String,
  },
  companyUniqueFormURL: {
    type: String,
  },
  acceptanceLetterFile: {
    type: String,
  },
  companyWorkFormFile: {
    type: String,
  },
  companyEmail: {
    type: String,
  },
  companyReportID: {
    type: String,
  },
  // Student-specific fields...
});

//Evaluator Schema
const evaluatorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
    default: "Evaluator",
  },
  courses: {
    type: [String],
  },
  students: {
    type: [String],
  },
  gradingForms: {
    type: [String],
  },
  department: {
    type: String,
  },

  // Evaluator-specific fields...
});

//TA Schema
const taSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userType: {
    type: String,
    default: "TA",
  },
  user_id: {
    type: String,
    required: true,
  },
  courses: {
    type: [String],
  },
  department: {
    type: String,
  },
  students: {
    type: [String],
  },
  // TA-specific fields...
});

//Coordinator Schema
const coordinatorSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userType: {
    type: String,
    default: "Coordinator",
  },
  user_id: {
    type: String,
    required: true,
  },
  department: {
    type: String,
  },
  courses: {
    type: [String],
  },
});

//Company Schema
const companySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  city: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  sector: {
    type: String,
  },
  approvalStatus: {
    type: String,
    default: "Pending",
  },
  studentRating: {
    type: String,
  },
  evaluatorRating: {
    type: String,
  },
  acceptedDepartments: {
    type: [String],
  },

  // Company-specific fields...
});

const gradingFormSchema = new mongoose.Schema({
  gradingFormSubmissionStatus: {
    // No Grades, Feedback, Final, Revision, Unchangable
    type: String,
    default: "No Grades",
  },
  studentID: {
    type: String,
  },
  revisionRequest: {
    type: Boolean,
    default: false,
  },
  currentFeedbackOverallGrade: {
    type: String,
    default: "No feedback grade.",
  },
  //Part A - WorkPlace
  companyEvaluationFormAverage: {
    type: String,
    default: "Company grade not processed.",
  },
  relatedToDepartment: {
    type: Boolean,
    default: false,
  },
  supervisorHasEngineeringBackground: {
    type: Boolean,
    default: false,
  },
  //Part B - Revision
  finalRevisionDate: {
    type: Date,
  },

  //Part C - Final Version of Grading Form
  workQuality: {
    type: String,
    default: "Final grade not submitted.",
  },
  sumOfEvaluationScores: {
    type: String,
    default: "Final grade not submitted.",
  },
  reportQuality: {
    type: String,
    default: "Final grade not submitted.",
  },

  taUsername: {
    type: [String],
  },
  evaluatorusername: {
    type: [String],
  },
});

const adminSchema = new mongoose.Schema({
  userType: {
    type: String,
    default: "Admin",
  },
  username: {
    type: String,
    required: true,
  },
});

const reportSchema = new mongoose.Schema({
  relatedStudentID: {
    type: String,
    required: true,
  },
  companyUniqueFormURL: {
    type: String,
  },
  acceptanceLetterFile: {
    type: String,
  },
  companyWorkFormFile: {
    type: String,
  },
  companyWorkFormRequestStatus: {
    type: Boolean,
  },
  companyEmail: {
    type: String,
  },
  mainReportID: {
    type: String,
    required: true,
  },
  revisionReportID: {
    type: String,
  },
  currentFeedbackID: {
    type: String,
  },
  currentFeedbackNotes: {
    type: String,
  },
  oldFeedbackIDs: {
    type: [String],
  },
  feedbackStatus: {
    type: Boolean,
    default: false,
  },
  feedbackRequired: {
    type: Boolean,
    default: true,
  },
  revisionRequired: {
    type: Boolean,
    default: false,
  },
  gradingItemID: {
    type: String,
  },
  iteration: {
    type: Number,
    default: 1,
  },
  lastReportSubmission: {
    type: Date,
  },
  revisionDeadline: {
    type: Date,
  },
  reportSubmissionDeadline: {
    type: Date,
    default: "2024-05-27T01:00:17.475Z",
  },
});

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
  },
  content: {
    type: String,
    required: true,
  },
});

// Create models
const User = mongoose.model("User", userSchema);
const Student = mongoose.model("Student", studentSchema);
const Evaluator = mongoose.model("Evaluator", evaluatorSchema);
const TA = mongoose.model("TA", taSchema);
const Coordinator = mongoose.model("Coordinator", coordinatorSchema);
const Company = mongoose.model("Company", companySchema);
const Admin = mongoose.model("Admin", adminSchema);
const GradingForm = mongoose.model("GradingForm", gradingFormSchema);
const Report = mongoose.model("Report", reportSchema);
const Announcement = mongoose.model("Announcement", announcementSchema);

module.exports = {
  User,
  Student,
  Evaluator,
  TA,
  Coordinator,
  Company,
  GradingForm,
  Admin,
  Report,
  Announcement,
};
