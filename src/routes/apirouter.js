const express = require("express");
const mongoose = require("mongoose");
const apirouter = express.Router();
const { User, Student, Evaluator, Company, Admin } = require("./dbmodel");
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
          console.log("IT IS AMDIN");
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
  console.log(studentId);

  try {
    const student = await Student.findOne({ user_id: studentId });
    console.log(student);

    if (student) {
      res.status(200).json({
        fullName: student.fullName,
        surname: student.surname,
        studentId: student.studentId,
        courses: student.courses.map((course) => course.name),
        username: student.username,
        iteration: student.revisionCount,
        status: 200,
      });
    } else {
      res.status(404).json({ message: "Student not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Upload File
apirouter.post(
  "/student/upload-file",
  upload.single("file"),
  async (req, res) => {
    try {
      // Find the student by user_id
      const student = await Student.findOne({
        user_id: req.body.user_id,
      });
      if (!student) {
        // Student not found
        res.status(404).json({ error: "Student not found" });
        return;
      }

      // Check if student already has a resume file
      if (student.resume) {
        await fs.promises.unlink(
          path.join(__dirname, "../../uploads", req.file.filename)
        );
        res.status(400).json({ error: "Student already has a resume file" });
        return;
      }

      if (!req.file) {
        // No file was uploaded
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      // Access the uploaded file using req.file
      const uploadedFile = req.file;

      // Generate a unique filename
      const uniqueFilename = Date.now() + "-" + uploadedFile.originalname;

      try {
        // Move the uploaded file to a permanent location
        const destination = path.join(
          __dirname,
          "../../uploads",
          uniqueFilename
        );
        fs.renameSync(uploadedFile.path, destination);

        // Update the student's resume field with the filename
        student.resume = uniqueFilename;
        await student.save();

        // Example response
        res.json({ message: "File uploaded successfully" });
      } catch (error) {
        console.error("Error saving the file: ", error);
        res.status(500).json({ error: "Error saving the file" });
      }
    } catch (error) {
      console.error("Error finding the student: ", error);
      res.status(500).json({ error: "Error finding the student" });
    }
  }
);

// Get File
apirouter.post("/student/get-file", async (req, res) => {
  const student = await Student.findOne({ user_id: req.body.user_id });
  if (!student) {
    // Student not found
    res.status(404).json({ error: "Student not found" });
    return;
  }
  // Check if student already has a resume file
  if (!student.resume) {
    res.status(404).json({ error: "No Resume Exists!" });
    return;
  }

  const filename = student.resume;

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

// Get File Name
apirouter.post("/student/get-file-name", async (req, res) => {
  const student = await Student.findOne({ user_id: req.body.user_id });
  if (!student) {
    // Student not found
    res.status(404).json({ error: "Student not found" });
    return;
  }
  const filename = student.resume;

  try {
    res.status(200).json({ message: "File found", filename: filename });
  } catch (error) {
    console.error("Error retrieving the file name: ", error);
    res.status(500).json({ error: "Error retrieving the file" });
  }
});

// Delete Student Resume
apirouter.post("/student/delete-resume", async (req, res) => {
  try {
    const student = await Student.findOne({ user_id: req.body.user_id });
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    const filename = student.resume;
    if (!filename) {
      return res.status(404).json({ error: "File not found" });
    }
    const filePath = path.join(__dirname, "../../uploads", filename);

    try {
      await fs.promises.unlink(filePath);
      student.resume = "";
      await student.save();
      return res.status(200).json({ message: `File Deleted: ${filename}` });
    } catch (error) {
      console.error("Error deleting the file or file does not exist:", error);
      return res
        .status(500)
        .json({ error: "Error deleting the file or file does not exist" });
    }
  } catch (error) {
    console.error("Error retrieving the file name: ", error);
    return res.status(500).json({ error: "Error retrieving the file" });
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

//End file and export modules
module.exports = apirouter;
