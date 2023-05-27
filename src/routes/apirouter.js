const express = require("express");
const mongoose = require("mongoose");
const apirouter = express.Router();
const {
  User,
  Student,
  Evaluator,
  Company,
  Admin,
  TA,
  Report,
  GradingForm,
} = require("./dbmodel");
const path = require("path");
const multer = require("multer");
const upload = multer({ dest: "uploads/" }); // Specify the destination folder for storing the uploaded files
const fs = require("fs");
const { ObjectId } = require("mongodb");

// ------- mongo db connection --------
mongoose.connect("mongodb://127.0.0.1:27017/internship-system");
const database = mongoose.connection; //get the databae object from mongoose connection

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
// /enroll-course/student - To enroll a student in a course  - returns Status Code 200 on sucess, Status Code 404, 400 on failure

// Register
apirouter.post("/register/:user", async (req, res) => {
  const user_id = req.body.user_id;
  if (req.params.user == "student") {
    try {
      // Search the evaluators collection
      Evaluator.findOne({ user_id: user_id }).then(async (evaluator) => {
        if (evaluator) {
          res
            .status(400)
            .json({ message: "Evaluator already exists!", status: 400 });
          return;
        }

        // Search the users collection
        User.findOne({ user_id: user_id }).then(async (user) => {
          if (user) {
            res
              .status(400)
              .json({ message: "User already exists!", status: 400 });
            return;
          }

          // Search the students collection
          Student.findOne({ user_id: user_id }).then(async (student) => {
            if (student) {
              res
                .status(400)
                .json({ message: "Student already exists!", status: 400 });
              return;
            }

            // Create new user and student if no duplicates found
            const newUser = new User({
              user_id: req.body.user_id,
              password: req.body.password,
            });

            try {
              const savedUser = await newUser.save();
              const newStudent = new Student({
                user: savedUser._id, // Use the saved user's ID as the reference
                user_id: req.body.user_id,
              });
              const newGradingForm = new GradingForm({
                studentID: req.body.user_id,
              });
              await newStudent.save();
              await newGradingForm.save();
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
      Evaluator.findOne({ user_id: user_id }).then(async (evaluator) => {
        if (evaluator) {
          res
            .status(400)
            .json({ message: "Evaluator already exists!", status: 400 });
          return;
        }

        // Search the users collection
        User.findOne({ user_id: user_id }).then(async (user) => {
          if (user) {
            res
              .status(400)
              .json({ message: "User already exists!", status: 400 });
            return;
          }

          // Search the students collection
          Student.findOne({ user_id: user_id }).then(async (student) => {
            if (student) {
              res
                .status(400)
                .json({ message: "Student already exists!", status: 400 });
              return;
            }

            // Create new user and student if no duplicates found
            const newUser = new User({
              user_id: req.body.user_id,
              password: req.body.password,
            });

            try {
              const savedUser = await newUser.save();
              const newEvaluator = new Evaluator({
                user: savedUser._id, // Use the saved user's ID as the reference
                user_id: req.body.user_id,
              });
              await newEvaluator.save();
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

// Admin Register
apirouter.post("/admin-register", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  try {
    // Search the admins collection
    const admin = await Admin.findOne({ username: username });
    const user = await User.findOne({ username: username });
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
apirouter.post("/delete/:student", async (req, res) => {
  try {
    const result = await Student.findOneAndDelete({
      user_id: req.body.user_id,
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
    }
    else {
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
  }
  catch (error) {
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
        report: report,
        status: 200,
      });
    } else {
      res.status(404).json({ message: "No Such Report" });
    }
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
        supervisorHasEngineeringBackground: grade.supervisorHasEngineeringBackground,

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
      name: company_name,
      email: company_email,
      phone: company_phone,
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

// Add a new company
apirouter.post("/get-all-companies", async (req, res) => {
  try {
    const companies = await Company.find();
    return res.status(200).json({ companies: companies });
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
    const evaluators = await Evaluator.find();
    return res.status(200).json({ evaluators: evaluators });
  } catch (error) {
    return res.status(500).json({ error: "Error Getting evaluators" });
  }
});

// Get All TAs
apirouter.post("/get-all-tas", async (req, res) => {
  try {
    const tas = await TA.find();
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

//End file and export modules
module.exports = apirouter;
