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
  username: {
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
  username: {
    type: String,
    required: true,
  },
  resume: {
    type: String,
  },
  userType: {
    type: String,
  },
  courses: {
    type: [String],
  },
  assignedEvaluator: {
    type: String,
  },
  assignedTAs: {
    type: [String],
  },
  company: {
    type: String,
  },
  courseGrade: {
    type: String,
  },
  internshipReportFile: {
    data: Buffer,
    contentType: String,
  },
  internshipReportSubmissionStatus: {
    type: String,
  },
  revisionCount: {
    type: Number,
  },
  evaluatorFeedbackFile: {
    data: Buffer,
    contentType: String,
  },
  evaluatorFeedbackStatus: {
    type: String,
  },
  revisionDeadline: {
    type: Date,
  },
  reportSubmissionDeadline: {
    type: Date,
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
  username: {
    type: String,
    required: true,
  },
  userType: {
    type: String,
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
  },
  username: {
    type: String,
    required: true,
  },
  courses: {
    type: [String],
  },
  students: {
    type: [String],
  },
  // TA-specific fields...
});

//Company Schema
const companySchema = new mongoose.Schema({
  student: {
    type: [String],
  },
  name: {
    type: String,
  },
  approvalStatus: {
    type: String,
  },
  submittedForm: {
    type: String,
  },
  submittedFormStatus: {
    type: String,
  },
  email: {
    type: String,
  },
  uniqueFormLink: {
    type: String,
  },
  // Company-specific fields...
});

const gradingFormSchema = new mongoose.Schema({
  gradingFormSubmissionStatus: {
    type: String,
  },
  studentUsername: {
    type: String,
  },
  //Part A - WorkPlace
  evaluationFormAverage: {
    type: String,
  },
  relatedToDepartment: {
    type: Boolean,
  },
  supervisorHasEngineeringBackground: {
    type: Boolean,
  },
  //Part B - Revisions
  revisionRequired: {
    type: Boolean,
  },
  revisionDueDate: {
    type: Date,
  },
  //Part C - Final Version of Grading Form
  workQuality: {
    type: String,
  },
  sumOfEvaluationScores: {
    type: String,
  },
  reportQuality: {
    type: String,
  },
  currentEvaluationPart: {
    type: String, //A,B or C
  },
  overallEvaluation: {
    type: String,
  },
  taUsername: {
    type: [String],
  },
  evaluatorusername: {
    type: String,
  },
  date: {
    type: Date,
  },
});

// Create models
const User = mongoose.model("User", userSchema);
const Student = mongoose.model("Student", studentSchema);
const Evaluator = mongoose.model("Evaluator", evaluatorSchema);
const TA = mongoose.model("TA", taSchema);
const Company = mongoose.model("Company", taSchema);
const GradingForm = mongoose.model("GradingForm", gradingFormSchema);

module.exports = {
  User,
  Student,
  Evaluator,
  TA,
  Company,
  GradingForm,
};
