const express = require("express");
const mongoose = require("mongoose");
const app = express();
const nodemailer = require("nodemailer");
const apirouter = express.Router();
const {
  User,
  Student,
  Evaluator,
  Company,
  Admin,
  TA,
  Coordinator,
  Report,
  GradingForm,
  Announcement,
  Notification,
} = require("./dbmodel");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Specify the destination folder for storing the uploaded files
const fs = require("fs");
const { ObjectId } = require("mongodb");
const { error } = require("jquery");

// ------- mongo db connection --------
mongoose.connect("mongodb://127.0.0.1:27017/internship-system");
const database = mongoose.connection; //get the databa object from mongoose connection

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected: " + database.name);
});

// ------- mongo db connection --------

// ------- email client connection --------

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: "bilkentinternship@outlook.com", // Replace with your Hotmail email address
    pass: "Quasointernship41", // Replace with your Hotmail password
  },
});

// ------- email client connection --------

// ------- List of API's  in this file. -------- //

// Register
apirouter.post("/register/:user", async (req, res) => {
  const user_id = req.body.user_id;
  const password = req.body.password;
  const email = req.body.email ? req.body.email : ""; // Because we handle registraton from home page, and admin-added users
  const fullname = req.body.fullname ? req.body.fullname : ""; // Because we handle registraton from home page, and admin-added users
  const department = req.body.department ? req.body.department : "";
  const userType = req.params.user;

  try {
    if (userType == "student") {
      // Search the Students collection
      const registerResult = await registerStudent(
        user_id,
        password,
        email,
        fullname,
        department
      );
      if (!registerResult) {
        res
          .status(400)
          .json({ message: "Student or User already exists!", status: 400 });
        return;
      } else {
        res
          .status(200)
          .json({ message: "Successfully Registered Student", status: 200 });
      }
    } else if (userType == "evaluator") {
      // Search the Students collection
      const registerResult = await registerEvaluator(
        user_id,
        password,
        email,
        fullname,
        department
      );
      if (!registerResult) {
        res
          .status(400)
          .json({ message: "Evaluator or User already exists!", status: 400 });
        return;
      } else {
        res
          .status(200)
          .json({ message: "Successfully Registered Evaluator", status: 200 });
      }
    } else if (userType == "coordinator") {
      // Search the Students collection
      const registerResult = await registerCoordinator(
        user_id,
        password,
        email,
        fullname,
        department
      );
      if (!registerResult) {
        res.status(400).json({
          message: "Coordinator or User already exists!",
          status: 400,
        });
        return;
      } else {
        res.status(200).json({
          message: "Successfully Registered Coordinator",
          status: 200,
        });
      }
    } else if (userType == "ta") {
      // Search the Students collection
      const registerResult = await registerTA(
        user_id,
        password,
        email,
        fullname,
        department
      );
      if (!registerResult) {
        res
          .status(400)
          .json({ message: "TA or User already exists!", status: 400 });
        return;
      } else {
        res.status(200).json({
          message: "Successfully Registered TA",
          status: 200,
        });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message, status: 400 });
  }
});

async function registerStudent(user_id, password, email, fullname, department) {
  const user = await User.findOne({ user_id: user_id });
  console.log(user);
  if (user) {
    return false;
  }

  const newUser = new User({
    user_id: user_id,
    password: password,
    email: email,
    fullname: fullname,
  });

  const savedUser = await newUser.save();
  const newStudent = new Student({
    user: savedUser._id, // Use the saved user's ID as the reference
    user_id: user_id,
    department: department,
  });
  const newGradingForm = new GradingForm({
    studentID: user_id,
  });
  await newStudent.save();
  await newGradingForm.save();
  return true;
}

async function registerEvaluator(
  user_id,
  password,
  email,
  fullname,
  department
) {
  const user = await User.findOne({ user_id: user_id });
  if (user) {
    return false;
  }

  const newUser = new User({
    user_id: user_id,
    password: password,
    email: email,
    fullname: fullname,
  });

  const savedUser = await newUser.save();
  const newEvaluator = new Evaluator({
    user: savedUser._id, // Use the saved user's ID as the reference
    user_id: user_id,
    department: department,
  });
  await newEvaluator.save();
  return true;
}

async function registerTA(user_id, password, email, fullname, department) {
  const user = await User.findOne({ user_id: user_id });
  if (user) {
    return false;
  }

  const newUser = new User({
    user_id: user_id,
    password: password,
    email: email,
    fullname: fullname,
  });

  const savedUser = await newUser.save();
  const newTA = new TA({
    user: savedUser._id, // Use the saved user's ID as the reference
    user_id: user_id,
    department: department,
  });
  await newTA.save();
  return true;
}

async function registerCoordinator(
  user_id,
  password,
  email,
  fullname,
  department
) {
  const user = await User.findOne({ user_id: user_id });
  if (user) {
    return false;
  }

  const newUser = new User({
    user_id: user_id,
    password: password,
    email: email,
    fullname: fullname,
  });

  const savedUser = await newUser.save();
  const newCoordinator = new Coordinator({
    user: savedUser._id, // Use the saved user's ID as the reference
    user_id: user_id,
    department: department,
  });
  await newCoordinator.save();
  return true;
}

// Admin Register
apirouter.post("/admin-register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    // Search the admins collection
    const admin = await Admin.findOne({ username: username });
    const user = await User.findOne({ user_id: username });
    if (admin || user) {
      return res
        .status(400)
        .json({ message: "Admin or User already exists!", status: 400 });
    }

    const newUser = new User({
      user_id: username,
      password: password,
    });
    await newUser.save();

    const newAdmin = new Admin({
      user: newUser._id,
      username: username,
    });
    await newAdmin.save();

    return res
      .status(201)
      .json({ message: "Admin successfully registered", status: 201 });
  } catch (error) {
    return res.status(400).json({ message: error.message, status: 400 });
  }
});

// Login
apirouter.post("/login", async (req, res) => {
  User.findOne({
    user_id: req.body.user_id,
    password: req.body.password,
  }).then(async (result) => {
    if (result) {
      try {
        const userType = await getUserType(req.body.user_id);
        if (userType === "Student") {
          var user = await Student.findOne({ user_id: req.body.user_id });
          res.status(200).json({
            message: "Logged In",
            userType: user.userType,
            user: user,
            courses: user.courses,
            status: 200,
          });
        } else if (userType === "Evaluator") {
          var user = await Evaluator.findOne({
            user_id: req.body.user_id,
          });
          res.status(200).json({
            message: "Logged In",
            userType: user.userType,
            user: user,
            courses: user.courses,
            students: user.students,
            gradingForms: user.gradingForms,
            status: 200,
          });
        } else if (userType === "TA") {
          var user = await TA.findOne({
            user_id: req.body.user_id,
          });
          res.status(200).json({
            message: "Logged In",
            userType: user.userType,
            user: user,
            courses: user.courses,
            students: user.students,
            gradingForms: user.gradingForms,
            status: 200,
          });
        } else if (userType === "Coordinator") {
          var user = await Coordinator.findOne({
            user_id: req.body.user_id,
          });
          res.status(200).json({
            message: "Logged In",
            userType: user.userType,
            user: user,
            courses: user.courses,
            students: user.students,
            gradingForms: user.gradingForms,
            status: 200,
          });
        } else if (userType === "Admin") {
          console.log("IT IS ADMIN");
          var user = await Admin.findOne({
            username: req.body.user_id,
          });
          res.status(200).json({
            message: "Logged In",
            userType: user.userType,
            user: user,
            courses: "",
            students: "",
            gradingForms: "",
            status: 200,
          });
        }
      } catch (error) {
        res.status(400).json({ message: error.message, status: 400 });
      }
    } else {
      res.status(400).json({ message: "User Not Found!", status: 400 });
    }
  });
});

// Identify a user
async function getUserType(usernameParam) {
  try {
    const user_id = usernameParam;

    // Search the evaluators collection
    const evaluator = await Evaluator.findOne({ user_id: user_id });
    if (evaluator) {
      return "Evaluator";
    }

    // Search the Coordinators collection
    const coordinator = await Coordinator.findOne({ user_id: user_id });
    if (coordinator) {
      return "Coordinator";
    }

    // Search the TA collection
    const ta = await TA.findOne({ user_id: user_id });
    if (ta) {
      return "TA";
    }

    // Search the students collection
    const student = await Student.findOne({ user_id: user_id });
    if (student) {
      return "Student";
    }

    // Search the Admin collection
    const admin = await Admin.findOne({ username: user_id });
    if (admin) {
      return "Admin";
    }

    // User not found in either collection
    return "User not found";
  } catch (error) {
    return error;
  }
}

// DELETE a user
apirouter.post("/delete", async (req, res) => {
  const user_id = req.body.user_id;
  const existingUser = await User.findOne({ user_id: user_id });
  if (!existingUser) {
    res.status(404).json({ message: "User not found" });
  }
  const userType = await getUserType(user_id);
  try {
    if (userType === "Student") {
      const result = await Student.findOneAndDelete({
        user_id: req.body.user_id,
      });
      await User.findOneAndDelete({ user_id: req.body.user_id });
      if (result) {
        res.status(200).json({ message: "Student deleted", result: result });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else if (userType === "Evaluator") {
      const result = await Evaluator.findOneAndDelete({
        user_id: req.body.user_id,
      });
      await User.findOneAndDelete({ user_id: req.body.user_id });
      if (result) {
        res.status(200).json({ message: "Evaluator deleted", result: result });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else if (userType === "TA") {
      const result = await TA.findOneAndDelete({
        user_id: req.body.user_id,
      });
      await User.findOneAndDelete({ user_id: req.body.user_id });
      if (result) {
        res.status(200).json({ message: "TA deleted", result: result });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else if (userType === "Coordinator") {
      const result = await Coordinator.findOneAndDelete({
        user_id: req.body.user_id,
      });
      await User.findOneAndDelete({ user_id: req.body.user_id });
      if (result) {
        res
          .status(200)
          .json({ message: "Coordinator deleted", result: result });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } else if (userType === "Admin") {
      const result = await Admin.findOneAndDelete({
        username: req.body.user_id,
      });
      await User.findOneAndDelete({ user_id: req.body.user_id });
      if (result) {
        res.status(200).json({ message: "Admin deleted", result: result });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// ENROLL a Student in a course
apirouter.post("/enroll-course/student", async (req, res) => {
  const user_id = req.body.user_id;
  const courseId = req.body.courseId;
  try {
    const student = await Student.findOne({
      user_id: user_id,
    });

    if (student && student.courses.includes(courseId)) {
      // The courseId exists in the student's courses array
      // Add your code here to handle the case
      res
        .status(404)
        .json({ message: "Already Enrolled In Course", status: 400 });
    } else {
      // The courseId does not exist in the student's courses array
      // Add your code here to handle the case
      student.courses.push(courseId);
      student.save();
      res.status(200).json({
        message: "Sucessfully Enrolled In Course",
        courses: student.courses,
        status: 200,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Change grading status to revision
apirouter.post("/change-to-revision", async (req, res) => {
  const student_id = req.body.studentID;
  console.log(student_id);
  console.log("student_id");
  try {
    const grade = await GradingForm.findOne({ studentID: student_id });
    const report = await Report.findOne({ relatedStudentID: student_id });

    report.feedbackRequired = true;
    report.revisionRequired = false;
    report.feedbackStatus = false;

    grade.gradingFormSubmissionStatus = "Revision";
    grade.revisionRequest = true;
    await grade.save();
    await report.save();

    res.status(200).json({
      message: "Grading status changed to revision.",
      status: 200,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Submit Feedback
apirouter.post("/submit-feedback", upload.single("file"), async (req, res) => {
  const student_id = req.body.student_id;
  const feedback_text = req.body.feedback_text;
  const grade_text = req.body.grade_text;
  try {
    const student = await Student.findOne({ user_id: student_id });
    if (!student) {
      await fs.promises.unlink(
        path.join(__dirname, "../../uploads", req.file.filename)
      );
      res.status(404).json({ message: "Student Does Not Exist", status: 404 });
    } else {
      if (!req.file) {
        // No file was uploaded
        res.status(400).json({ message: "No file uploaded" });
        return;
      }

      // Access the uploaded file using req.file
      const uploadedFile = req.file;

      // Generate a unique filename
      const uniqueFilename =
        Date.now() + "-" + "feedback" + "-" + uploadedFile.originalname;

      // Move the uploaded file to a permanent location
      const destination = path.join(__dirname, "../../uploads", uniqueFilename);
      fs.renameSync(uploadedFile.path, destination);
      const report = await Report.findOne({ relatedStudentID: student_id });
      const grade = await GradingForm.findOne({ studentID: student_id });
      report.feedbackRequired = false;
      report.revisionRequired = true;
      report.feedbackStatus = true;
      console.log(grade_text);
      report.currentFeedbackNotes = feedback_text;
      report.currentFeedbackID = uniqueFilename;
      report.oldFeedbackIDs.push(uniqueFilename);

      grade.currentFeedbackOverallGrade = grade_text;
      grade.gradingFormSubmissionStatus = "Feedback";
      await report.save();
      await grade.save();

      res.status(200).json({
        message: "Sucessfully submitted Feedback",
        status: 200,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Submit Grade
apirouter.post("/submit-grade", upload.single("file"), async (req, res) => {
  const workQuality = req.body.workQuality;
  const sumOfEvaluation = req.body.sumOfEvaluation;
  const reportQuality = req.body.reportQuality;
  const studentID = req.body.studentID;

  try {
    const report = await Report.findOne({ relatedStudentID: studentID });
    const grade = await GradingForm.findOne({ studentID: studentID });

    report.feedbackRequired = false;
    report.revisionRequired = false;

    if (grade.gradingFormSubmissionStatus === "Revision") {
      grade.gradingFormSubmissionStatus = "Unchangable";
    } else {
      grade.gradingFormSubmissionStatus = "Final";
    }

    grade.workQuality = workQuality;
    grade.sumOfEvaluationScores = sumOfEvaluation;
    grade.reportQuality = reportQuality;

    await grade.save();
    await report.save();

    res.status(200).json({
      message: "Sucessfully submitted Grade",
      status: 200,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Submit Revision Report // MAX 3 iterations
apirouter.post(
  "/submit-revision-report",
  upload.single("file"),
  async (req, res) => {
    const student_id = req.body.student_id;
    try {
      const report = await Report.findOne({ relatedStudentID: student_id });
      if (!report) {
        await fs.promises.unlink(
          path.join(__dirname, "../../uploads", req.file.filename)
        );
        res.status(404).json({ message: "Report Does Not Exist", status: 404 });
      } else if (report.iteration >= 3) {
        await fs.promises.unlink(
          path.join(__dirname, "../../uploads", req.file.filename)
        );
        res.status(500).json({
          message: "Max Iteration Count Reached, please contact evaluator/TA",
          status: 500,
        });
      } else {
        if (!req.file) {
          // No file was uploaded
          res.status(400).json({ message: "No file uploaded" });
          return;
        }

        // Access the uploaded file using req.file
        const uploadedFile = req.file;

        // Generate a unique filename
        const uniqueFilename =
          Date.now() + "-" + "revision" + "-" + uploadedFile.originalname;

        // Move the uploaded file to a permanent location
        const destination = path.join(
          __dirname,
          "../../uploads",
          uniqueFilename
        );
        fs.renameSync(uploadedFile.path, destination);

        report.feedbackRequired = true;
        report.revisionRequired = false;
        report.feedbackStatus = false;
        report.revisionReportID = uniqueFilename;
        report.iteration = report.iteration + 1;
        await report.save();

        res.status(200).json({
          message: "Sucessfully submitted Revison Report",
          status: 200,
        });
      }
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
);

// Submit new report
apirouter.post("/submit-report", upload.single("file"), async (req, res) => {
  const student_id = req.body.student_id;
  try {
    const report = await Report.findOne({ relatedStudentID: student_id });
    if (report) {
      await fs.promises.unlink(
        path.join(__dirname, "../../uploads", req.file.filename)
      );
      res.status(404).json({ message: "Report Already Exists", status: 400 }); // This should be changed to replace report in the future.
    } else {
      if (!req.file) {
        // No file was uploaded
        res.status(400).json({ message: "No file uploaded" });
        return;
      }

      // Access the uploaded file using req.file
      const uploadedFile = req.file;

      // Generate a unique filename
      const uniqueFilename = Date.now() + "-" + uploadedFile.originalname;

      // Move the uploaded file to a permanent location
      const destination = path.join(__dirname, "../../uploads", uniqueFilename);
      fs.renameSync(uploadedFile.path, destination);
      const newReport = new Report({
        relatedStudentID: student_id,
        mainReportID: uniqueFilename,
        revisionReportID: uniqueFilename,
        lastReportSubmission: new Date(),
      });

      const student = await Student.findOne({ user_id: student_id });
      if (student.acceptanceLetterFile) {
        newReport.acceptanceLetterFile = student.acceptanceLetterFile;
      }
      if (student.companyWorkFormFile) {
        newReport.companyWorkFormFile = student.companyWorkFormFile;
      }

      newReport.companyEmail = student.companyEmail ? student.companyEmail : "";

      await newReport.save();

      await Student.updateOne(
        { user_id: student_id },
        { $set: { mainReportID: uniqueFilename } }
      );

      res.status(200).json({
        message: "Sucessfully submitted Report",
        status: 200,
      });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// GET all User Courses
apirouter.post("/get-courses", async (req, res) => {
  const user_id = req.body.user_id;
  const userType = await getUserType(user_id);
  try {
    var user = { courses: "Courses Not Found" };

    if (userType === "Student") {
      user = await Student.findOne({ user_id: req.body.user_id });
    } else if (userType === "Evaluator") {
      user = await Evaluator.findOne({ user_id: req.body.user_id });
    }

    res.status(200).json({
      courses: user.courses,
      status: 200,
    });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// Retrieve student information
apirouter.get("/students/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const student = await Student.findOne({ user_id: studentId });

    res.status(200).json({
      fullName: student.fullname,
      surname: student.surname,
      studentID: student.user_id,
      courses: student.courses,
      mainReportID: student.mainReportID,
      status: 200,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Retrieve report information
apirouter.get("/reports/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const report = await Report.findOne({ relatedStudentID: studentId });
    if (report) {
      res.status(200).json({
        mainReportID: report.mainReportID,
        currentFeedbackID: report.currentFeedbackID,
        oldFeedbackIDs: report.oldFeedbackIDs,
        revisionRequired: report.revisionRequired,
        feedbackRequired: report.feedbackRequired,
        gradingItemID: report.gradingItemID,
        iteration: report.iteration,
        lastReportSubmission: report.lastReportSubmission,
        revisionDeadline: report.revisionDeadline,
        reportSubmissionDeadline: report.reportSubmissionDeadline,
        report: report, // send the whole report object all together (ALOT SIMPLER than above code)
        status: 200,
      });
    } else {
      res.status(404).json({ message: "No Such Report" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Student with report id
apirouter.post("/student-details-with-report-id", async (req, res) => {
  try {
    const report_id = req.body.report_id;
    const report = await Report.findOne({ _id: report_id });
    if (!report) {
      return res.status(404).json({ message: "No Such Report" });
    }

    const student = await Student.findOne({ user_id: report.relatedStudentID });
    if (!student) {
      return res.status(404).json({ message: "No Such Student" });
    }
    return res.status(200).json({ student: student });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Retrieve grade information
apirouter.get("/grades/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    const grade = await GradingForm.findOne({ studentID: studentId });
    if (grade) {
      res.status(200).json({
        gradingFormSubmissionStatus: grade.gradingFormSubmissionStatus,
        currentFeedbackID: grade.currentFeedbackID,
        revisionRequest: grade.revisionRequest,
        currentFeedbackOverallGrade: grade.currentFeedbackOverallGrade,

        companyEvaluationFormAverage: grade.companyEvaluationFormAverage,
        relatedToDepartment: grade.relatedToDepartment,
        supervisorHasEngineeringBackground:
          grade.supervisorHasEngineeringBackground,

        finalRevisionDate: grade.finalRevisionDate,

        workQuality: grade.workQuality,
        sumOfEvaluationScores: grade.sumOfEvaluationScores,
        reportQuality: grade.reportQuality,

        taUsername: grade.taUsername,
        evaluatorusername: grade.evaluatorusername,

        status: 200,
      });
    } else {
      res.status(404).json({ message: "No Such Grade" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get File
apirouter.post("/get-file", async (req, res) => {
  const filename = req.body.filename;
  // Check if student already has a resume file
  if (!filename) {
    res.status(404).json({ error: "File Param Cannot be Empty!" });
    return;
  }

  try {
    // Check if the file exists
    const filePath = path.join(__dirname, "../../uploads", filename);
    const fileUrl = "/uploads/" + filename;
    if (!fs.existsSync(filePath)) {
      // File not found
      res.status(404).json({ error: "File not found" });
      return;
    }

    res.status(200).json({ message: "File found", fileUrl: fileUrl });
  } catch (error) {
    console.error("Error retrieving the file: ", error);
    res.status(500).json({ error: "Error retrieving the file" });
  }
});

// Delete Student Report
apirouter.post("/delete-report", async (req, res) => {
  const studentID = req.body.studentID;
  const mainReportID = req.body.mainReportID;
  try {
    const report = await Report.findOne({ mainReportID: mainReportID });
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }
    await report.deleteOne();
    const student = await Student.findOne({ user_id: studentID });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const filename = mainReportID;
    const filePath = path.join(__dirname, "../../uploads", filename);

    try {
      await fs.promises.unlink(filePath);
      student.mainReportID = "";
      await student.save();
      return res.status(200).json({ message: `Report Deleted: ${filename}` });
    } catch (error) {
      console.error(
        "Error deleting the Report or Report does not exist:",
        error
      );
      return res
        .status(500)
        .json({ error: "Error deleting the Report or Report does not exist" });
    }
  } catch (error) {
    console.error("Error retrieving the Report name: ", error);
    return res.status(500).json({ error: "Error retrieving the Report" });
  }
});

// Get All User Data
apirouter.post("/update-user", async (req, res) => {
  const user_id = req.body.user_id;
  try {
    const fullname = req.body.fullname;
    const email = req.body.email;
    const userType = await getUserType(user_id);
    if (userType === "Student") {
      const student = await Student.findOne({
        user_id: user_id,
      }).populate("user");
      student.user.fullname = fullname;
      student.user.email = email;

      await student.user.save();

      return res.status(200).json({ message: "User Updated" });
    } else if (userType === "Evaluator") {
      const evaluator = await Evaluator.findOne({
        user_id: user_id,
      }).populate("user");
      evaluator.user.fullname = fullname;
      evaluator.user.email = email;

      await evaluator.user.save();

      return res.status(200).json({ message: "User Updated" });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error Updating User" });
  }
});

// Get All User Data
apirouter.post("/get-user-data", async (req, res) => {
  const user_id = req.body.user_id;
  try {
    const userType = await getUserType(user_id);
    if (userType === "Student") {
      const student = await Student.findOne({
        user_id: user_id,
      }).populate("user");
      return res.status(200).json({ user: student });
    } else if (userType === "Evaluator") {
      const evaluator = await Evaluator.findOne({
        user_id: user_id,
      }).populate("user");

      return res.status(200).json({ user: evaluator });
    }
  } catch (error) {
    return res.status(500).json({ error: "Error retrieving user data" });
  }
});

// Add a new company
apirouter.post("/add-company", async (req, res) => {
  const company_name = req.body.company_name;
  const company_city = req.body.company_city;
  const company_email = req.body.company_email;
  const company_phone = req.body.company_phone;
  const company_sector = req.body.company_sector;
  try {
    const company = await Company.findOne({
      $or: [
        { name: company_name },
        { email: company_email },
        { phone: company_phone },
      ],
    });

    if (company) {
      return res.status(200).json({ message: "Company Already Exists" });
    }

    const newCompany = new Company({
      name: company_name,
      city: company_city,
      email: company_email,
      phone: company_phone,
      sector: company_sector,
      approvalStatus: "Pending",
    });
    console.log(newCompany);
    await newCompany.save();

    return res.status(200).json({ message: "Company Added" });
  } catch (error) {
    return res.status(500).json({ error: "Error Adding Company" });
  }
});

// Get all company
apirouter.post("/get-all-companies", async (req, res) => {
  try {
    const companies = await Company.find();
    return res.status(200).json({ companies: companies });
  } catch (error) {
    return res.status(500).json({ error: "Error Getting Companies" });
  }
});

// Get all company
apirouter.post("/delete-company", async (req, res) => {
  const id = req.body.id;
  try {
    await Company.findOneAndDelete({ _id: id });
    return res.status(200).json({ message: "Company Deleted" });
  } catch (error) {
    return res.status(500).json({ error: "Error Getting Companies" });
  }
});

// Get All Students
apirouter.post("/get-all-students", async (req, res) => {
  try {
    const students = await Student.find().populate("user");
    return res.status(200).json({ students: students });
  } catch (error) {
    return res.status(500).json({ error: "Error Getting students" });
  }
});

// Get All Evaluators
apirouter.post("/get-all-evaluators", async (req, res) => {
  try {
    const evaluators = await Evaluator.find().populate("user");
    return res.status(200).json({ evaluators: evaluators });
  } catch (error) {
    return res.status(500).json({ error: "Error Getting evaluators" });
  }
});

// Get All Coordinators
apirouter.post("/get-all-coordinators", async (req, res) => {
  try {
    const coordinators = await Coordinator.find().populate("user");
    return res.status(200).json({ coordinators: coordinators });
  } catch (error) {
    return res.status(500).json({ error: "Error Getting Cooridinators" });
  }
});

// Get All TAs
apirouter.post("/get-all-tas", async (req, res) => {
  try {
    const tas = await TA.find().populate("user");
    return res.status(200).json({ tas: tas });
  } catch (error) {
    return res.status(500).json({ error: "Error Getting tas" });
  }
});

// Assign Students to Users
apirouter.post("/assign-student", async (req, res) => {
  const user_id = req.body.user_id;
  const student_id = req.body.student_id;

  try {
    const student = await Student.findOne({
      user_id: student_id,
    });
    if (!student) {
      return res.status(404).json({
        message: "Student Does Not Exist",
        status: 404,
      });
    }

    const userType = await getUserType(user_id);
    if (userType === "Student") {
      return res.status(400).json({
        message: "Student Cannot be Assigned to a Student",
        status: 400,
      });
    } else if (userType === "Evaluator") {
      const evaluator = await Evaluator.findOne({
        user_id: user_id,
      });
      if (evaluator.students.includes(student_id)) {
        return res.status(400).json({
          message: "Student Already Assigned to Evaluator",
          status: 400,
        });
      } else {
        student.assignedEvaluators.push(user_id);
        evaluator.students.push(student_id);
        await evaluator.save();
        await student.save();
        return res
          .status(200)
          .json({ message: "Student Assigned to Evaluator", status: 200 });
      }
    } else if (userType === "TA") {
      const ta = await TA.findOne({
        user_id: user_id,
      });
      if (ta.students.includes(student_id)) {
        return res.status(400).json({
          message: "Student Already Assigned to TA",
          status: 400,
        });
      } else {
        student.assignedTAs.push(user_id);
        ta.students.push(student_id);
        await ta.save();
        await student.save();
        return res
          .status(200)
          .json({ message: "Student Assigned to TA", status: 200 });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error Assigning Student", status: 500 });
  }
});

// Remove Student Assignments from Users
apirouter.post("/remove-assigned-student", async (req, res) => {
  const user_id = req.body.user_id;
  const student_id = req.body.student_id;
  try {
    const student = await Student.findOne({
      user_id: student_id,
    });
    if (!student) {
      return res.status(404).json({
        message: "Student Does Not Exist",
        status: 404,
      });
    }
    const userType = await getUserType(user_id);
    if (userType === "Student") {
      return res.status(400).json({
        message: "Student Cannot be De-Assigned from a Student",
        status: 400,
      });
    } else if (userType === "Evaluator") {
      const evaluator = await Evaluator.findOne({
        user_id: user_id,
      });
      if (!evaluator.students.includes(student_id)) {
        return res.status(400).json({
          message: "Student is NOT Assigned to Evaluator",
          status: 400,
        });
      } else {
        const evalIndex = student.assignedEvaluators.findIndex(
          (id) => id === user_id
        );
        student.assignedEvaluators.splice(evalIndex, 1);
        const studentIndex = evaluator.students.findIndex(
          (id) => id === student_id
        );
        evaluator.students.splice(studentIndex, 1);
        await evaluator.save();
        await student.save();
        return res
          .status(200)
          .json({ message: "Student De-Assigned from Evaluator", status: 200 });
      }
    } else if (userType === "TA") {
      const ta = await TA.findOne({
        user_id: user_id,
      });
      if (!ta.students.includes(student_id)) {
        return res.status(400).json({
          message: "Student is NOT Assigned to TA",
          status: 400,
        });
      } else {
        const taIndex = student.assignedTAs.findIndex((id) => id === user_id);
        student.assignedTAs.splice(taIndex, 1);
        const studentIndex = ta.students.findIndex((id) => id === student_id);
        ta.students.splice(studentIndex, 1);
        await ta.save();
        await student.save();
        return res
          .status(200)
          .json({ message: "Student De-Assigned from TA", status: 200 });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error De-Assigning Student", status: 500 });
  }
});

// Randomly Assign Every Student to an Evaluator and a TA
apirouter.post("/random-assignment", async (req, res) => {
  try {
    const students = await Student.find();
    const evaluators = await Evaluator.find();
    const TAs = await TA.find();

    students.forEach((student) => {
      var assignedEvaluators = student.assignedEvaluators;
      var assignedTAs = student.assignedTAs;

      if (assignedEvaluators.length === 0) {
        // Assign an evaluator to the student
        const evaluatorWithLeastStudents = evaluators.reduce(
          (minEvaluator, currentEvaluator) => {
            return currentEvaluator.students.length <
              minEvaluator.students.length
              ? currentEvaluator
              : minEvaluator;
          }
        );

        if (!evaluatorWithLeastStudents.students.includes(student)) {
          assignedEvaluators.push(evaluatorWithLeastStudents.user_id);
          evaluatorWithLeastStudents.students.push(student.user_id);
        }
      }

      if (assignedTAs.length === 0) {
        // Assign a TA to the student
        const TAWithLeastStudents = TAs.reduce((minTA, currentTA) => {
          return currentTA.students.length < minTA.students.length
            ? currentTA
            : minTA;
        });

        if (!TAWithLeastStudents.students.includes(student)) {
          assignedTAs.push(TAWithLeastStudents.user_id);
          TAWithLeastStudents.students.push(student.user_id);
        }
      }
    });

    // Save the updated data
    await Promise.all([
      students.map((student) => student.save()),
      evaluators.map((evaluator) => evaluator.save()),
      TAs.map((TA) => TA.save()),
    ]);

    res
      .status(200)
      .json({ message: "Random assignment completed successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while performing random assignment." });
  }
});

// returns true if email sent, false otherwise
async function sendEmail(email, subject, messageToSend) {
  // Prepare the email message
  const mailOptions = {
    from: "bilkentinternship@outlook.com",
    to: email,
    subject: subject,
    text: messageToSend,
  };

  // Send the email
  const result = await transporter.sendMail(mailOptions);
  const response = result.response;

  if (response.includes("OK")) {
    return true;
  } else {
    return false;
  }
}

// Define a route for sending emails
apirouter.post("/send-registration-email", async (req, res) => {
  try {
    const email = req.body.email;
    const messageToSend = req.body.messageToSend;
    const subject = "Your Account Password";

    const result = await sendEmail(email, subject, messageToSend);
    console.log(result);
    if (!result) {
      return res
        .status(500)
        .json({ error: "Error Sending Registration Email" });
    }
    return res.status(200).json({ message: "Email Sent" });
  } catch (error) {
    return res.status(500).json({ error: "Error Sending Registration Email" });
  }
});

// Get Student Current Internship Company Details
apirouter.post("/student/get-company-details", async (req, res) => {
  const student_id = req.body.user_id;

  try {
    const student = await Student.findOne({ user_id: student_id });
    if (!student) {
      return res.status(404).json({
        message: "Student Does Not Exist",
        status: 404,
      });
    }

    if (!student.companyId) {
      return res.status(404).json({
        message: "You do not have a internship company registered!",
        status: 404,
      });
    }

    const company = await Company.findOne({ _id: student.companyId });

    return res
      .status(200)
      .json({ company: company, student: student, status: 200 });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error Getting Internship Company Details" });
  }
});

// Register NEW Intership Company
apirouter.post(
  "/student/register-internship-company",
  upload.single("file"),
  async (req, res) => {
    try {
      const student_id = req.body.student_id;
      const name = req.body.companyName ? req.body.companyName : "";
      const email = req.body.companyEmail;
      const phone = req.body.companyPhone;
      const city = req.body.companyCity ? req.body.companyCity : "";
      const sector = req.body.companySector ? req.body.companySector : "";

      const student = await Student.findOne({ user_id: student_id });
      const company = await Company.findOne({
        $or: [{ _id: student.companyId }, { name: name }], // CHECK FOR ALREADY EXISTING COMPANY
      });

      if (
        company &&
        (company.approvalStatus === "Approved" ||
          company.approvalStatus === "Pending")
      ) {
        await fs.promises.unlink(
          path.join(__dirname, "../../uploads", req.file.filename)
        );
        res.status(404).json({
          message:
            "Internship Company Already Exists and/or is Approved/Awating Approval, Please check the company list and choose the company from there",
          status: 400,
        });
        return;
      } else {
        if (!req.file) {
          // No file was uploaded
          res.status(400).json({ message: "No file uploaded" });
          return;
        }
        // Access the uploaded file using req.file
        const uploadedFile = req.file;

        // Generate a unique filename
        const uniqueFilename =
          Date.now() +
          "-" +
          "acceptance-letter" +
          "-" +
          uploadedFile.originalname;

        // Move the uploaded file to a permanent location
        const destination = path.join(
          __dirname,
          "../../uploads",
          uniqueFilename
        );
        fs.renameSync(uploadedFile.path, destination);

        const company = new Company({
          name: name,
          email: email,
          phone: phone,
          city: city,
          sector: sector,
        });
        await company.save();

        student.acceptanceLetterFile = uniqueFilename;
        student.companyId = company._id;
        student.companyEmail = company.email;
        await student.save();

        const report = await Report.findOne({
          relatedStudentID: student.user_id,
        });
        if (report) {
          report.acceptanceLetterFile = uniqueFilename;
          report.companyEmail = company.email;
          await report.save();
        }

        res.status(200).json({
          message:
            "Sucessfully Registered Internship Company, Awaiting Approval",
          user: student,
          status: 200,
        });
      }
    } catch (error) {
      if (req.file) {
        await fs.promises.unlink(
          path.join(__dirname, "../../uploads", req.file.filename)
        );
      }

      res.status(400).json({ message: error });
    }
  }
);

// Upload Acceptance Letter
apirouter.post(
  "/student/upload-acceptance-letter",
  upload.single("file"),
  async (req, res) => {
    try {
      const student_id = req.body.student_id;

      if (!req.file) {
        // No file was uploaded
        res.status(400).json({ message: "No file uploaded" });
        return;
      }
      // Access the uploaded file using req.file
      const uploadedFile = req.file;

      // Generate a unique filename
      const uniqueFilename =
        Date.now() +
        "-" +
        "acceptance-letter" +
        "-" +
        uploadedFile.originalname;

      // Move the uploaded file to a permanent location
      const destination = path.join(__dirname, "../../uploads", uniqueFilename);
      fs.renameSync(uploadedFile.path, destination);

      const student = await Student.findOne({ user_id: student_id });

      student.acceptanceLetterFile = uniqueFilename;
      await student.save();

      const report = await Report.findOne({
        relatedStudentID: student.user_id,
      });
      if (report) {
        report.acceptanceLetterFile = uniqueFilename;
        await report.save();
      }

      res
        .status(200)
        .json({ message: "Acceptance Letter Uploaded", user: student });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error Uploading Acceptance Letter" });
    }
  }
);

//Add Existing Internship Company
apirouter.post("/student/add-internship-company", async (req, res) => {
  const student_id = req.body.user_id;
  const company_id = req.body.company_id;

  try {
    const student = await Student.findOne({
      user_id: student_id,
    });
    const company = await Company.findOne({ _id: company_id });
    student.companyId = company_id;
    student.companyEmail = company.email;
    await student.save();

    const report = await Report.findOne({ relatedStudentID: student.user_id });
    if (report) {
      report.companyEmail = company.email;
      await report.save();
    }

    res
      .status(200)
      .json({ message: "Internship Company Added", user: student });
  } catch (error) {
    return res.status(500).json({ error: "Error Adding Internship Company" });
  }
});

//Remove Internship Company
apirouter.post("/student/remove-internship-company", async (req, res) => {
  const student_id = req.body.user_id;

  try {
    const student = await Student.findOne({
      user_id: student_id,
    });
    if (student.acceptanceLetterFile) {
      await fs.promises.unlink(
        path.join(__dirname, "../../uploads", student.acceptanceLetterFile)
      );
    }

    student.acceptanceLetterFile = null;
    student.companyId = null;
    await student.save();

    const report = await Report.findOne({
      relatedStudentID: student.user_id,
    });
    if (report) {
      report.acceptanceLetterFile = null;
      report.companyEmail = null;
      await report.save();
    }

    return res
      .status(200)
      .json({ message: "Internship Company Removed", user: student });
  } catch (error) {
    return res.status(500).json({ error: "Error Removing Internship Company" });
  }
});

//Approve Internship Company
apirouter.post("/approve-company", async (req, res) => {
  const company_id = req.body.company_id;
  const department = req.body.department;
  try {
    const company = await Company.findOne({
      _id: company_id,
    });

    company.approvalStatus = "Approved";
    if (!company.acceptedDepartments.includes(department)) {
      company.acceptedDepartments.push(department);
    }
    await company.save();

    res.status(200).json({ message: "Internship Company Approved" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error Approving Internship Company" });
  }
});

//Approve Internship Company
apirouter.post("/reject-company", async (req, res) => {
  const company_id = req.body.company_id;
  const department = req.body.department;

  try {
    const company = await Company.findOne({
      _id: company_id,
    });

    company.approvalStatus = "Rejected";
    if (company.acceptedDepartments.includes(department)) {
      var index = company.acceptedDepartments.indexOf(department);
      if (index > -1) {
        company.acceptedDepartments.splice(index, 1);
      }
    }
    await company.save();

    res.status(200).json({ message: "Internship Company Rejected" });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error Rejecting Internship Company" });
  }
});

//Send Company Work Report Form Email/Reminder
apirouter.post("/send-work-report-form-email", async (req, res) => {
  try {
    const email = req.body.email;
    const report_id = req.body.report_id;

    const report = await Report.findOne({ _id: report_id });
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const uniqueURL = baseUrl + "/" + "work-report-form/" + report_id;

    const result = await sendEmail(email, "Work Report Form", `${uniqueURL}`);
    if (result) {
      report.companyWorkFormRequestStatus = true;
      await report.save();
      res.status(200).json({ message: "Work Report Form Email Sent" });
    } else {
      res.status(500).json({
        message: "There was an error sending the work report form email!",
      });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Error Sending Work Report Form Email" });
  }
});

//Upload Company Work Report Form
apirouter.post(
  "/upload-company-work-report",
  upload.single("file"),
  async (req, res) => {
    try {
      const student_id = req.body.student_id;

      if (!req.file) {
        // No file was uploaded
        res.status(400).json({ message: "No file uploaded" });
        return;
      }
      // Access the uploaded file using req.file
      const uploadedFile = req.file;

      // Generate a unique filename
      const uniqueFilename =
        Date.now() +
        "-" +
        "work-report-" +
        student_id +
        "-" +
        uploadedFile.originalname;

      // Move the uploaded file to a permanent location
      const destination = path.join(__dirname, "../../uploads", uniqueFilename);
      fs.renameSync(uploadedFile.path, destination);

      const student = await Student.findOne({ user_id: student_id });

      student.companyWorkFormFile = uniqueFilename;
      await student.save();

      const report = await Report.findOne({
        relatedStudentID: student.user_id,
      });
      if (report) {
        report.companyWorkFormFile = uniqueFilename;
        await report.save();
      }

      res.status(200).json({ message: "Work Report Uploaded", user: student });
    } catch (error) {
      return res
        .status(500)
        .json({ error: "Error Uploading Acceptance Letter" });
    }
  }
);

// Receive all announcements
apirouter.get("/get-announcements", async (req, res) => {
  // Fetch announcements from the database
  Announcement.find({})
    .then(announcements => {
      // Send the announcements as a JSON response
      res.json(announcements);
    })
    .catch(error => {
      console.error('Error fetching announcements:', error);
      res.status(500).json({ error: 'An error occurred while fetching announcements' });
    });
});

// Delete an announcement
apirouter.post("/delete-announcement", async (req, res) => {
  const title = req.body.title_d;
  const content = req.body.content_d;
  console.log(title);

  try {
    const deletedAnnouncement = await Announcement.findOneAndDelete({ title: title }, { content: content });
    if (deletedAnnouncement) {
      res.json({ message: 'Announcement deleted successfully' });
    } else {
      res.status(404).json({ error: 'Announcement not found' });
    }
  } catch (err) {
    console.error('Error deleting announcement:', err);
    res.status(500).json({ error: 'An error occurred while deleting the announcement' });
  }
});

// Add announcement
apirouter.post("/add-announcement", async (req, res) => {
  // Extract the title and content from the request body;
  title = req.body.title_d;
  content = req.body.content_d;


  // Create a new announcement object
  const newAnnouncement = new Announcement({
    title: title,
    content: content
  });

  // Save the new announcement to the database
  newAnnouncement
    .save()
    .then(savedAnnouncement => {
      res.status(200).json(savedAnnouncement);
    })
    .catch(error => {
      console.error('Error adding announcement:', error);
      res.status(500).json({ error: 'An error occurred while adding the announcement' });
    });
});

apirouter.post("/get-notifications", async (req, res) => {
  const relatedUserID = req.body.relatedUserID;
  console.log("message");
  console.log(relatedUserID);
  try {
    const notifications = await Notification.find({ relatedUserID: relatedUserID });
    res.json(notifications);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch notifications' });
  }
});

// Delete an announcement
apirouter.post("/delete-notification", async (req, res) => {
  const relatedUserID = req.body.relatedUserID;
  const message = req.body.message;

  try {
    const deletedNotification = await Notification.findOneAndDelete({ relatedUserID: relatedUserID }, { content: message });
    if (deletedNotification) {
      res.json({ message: 'Notification deleted successfully' });
    } else {
      res.status(404).json({ error: 'Notification not found' });
    }
  } catch (err) {
    console.error('Error deleting Notification:', err);
    res.status(500).json({ error: 'An error occurred while deleting the Notification' });
  }
});

// Add notification
apirouter.post("/add-notification", async (req, res) => {
  // Extract the title and content from the request body;
  relatedUserID = req.body.relatedUserID;
  message = req.body.message;
  date = Date.now();

  if (relatedUserID === "Everyone") {
    // Fetch all users from the database
    const users = await User.find();

    // Create an array to store all the promises for saving notifications
    const savePromises = [];

    // Iterate over each user
    for (const user of users) {
      // Create a new Notification object
      const newNotification = new Notification({
        relatedUserID: user.user_id, // Assign the current user's ID as relatedUserID
        message: message,
        date: date,
      });

      // Save the new Notification to the database and add the promise to the array
      savePromises.push(newNotification.save());
    }

    // Wait for all promises to resolve
    Promise.all(savePromises)
      .then(savedNotifications => {
        res.status(200).json(savedNotifications);
      })
      .catch(error => {
        console.error('Error adding notifications:', error);
        res.status(500).json({ error: 'An error occurred while adding the notifications' });
      });
  } else {
    // Create a new Notification object
    const newNotification = new Notification({
      relatedUserID: relatedUserID,
      message: message,
      date: date,
    });

    // Save the new Notification to the database
    newNotification
      .save()
      .then(savedNotification => {
        res.status(200).json(savedNotification);
      })
      .catch(error => {
        console.error('Error adding notification:', error);
        res.status(500).json({ error: 'An error occurred while adding the notification' });
      });
  }
});



//End file and export modules
module.exports = apirouter;
