jQuery(document).ready(function () {
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
  }
  const students = JSON.parse(sessionStorage.getItem("students"));
  const studentPromises = students.map((student) => getStudent(student));
  Promise.all(studentPromises).then((studentInfos) => {
    studentInfos.forEach((studentInfo) => {
      var studentName = studentInfo.studentName;
      var studentID = studentInfo.studentID;
      var courseName = studentInfo.courseName;
      var surname = studentInfo.surname;
      var mainReportID = studentInfo.mainReportID;

      if (mainReportID == null) {
        var submissionDate = "No report";
        var reportText = "No report";
        var iteration = "No report";

        // Create a new row in the table
        var row = $("<tr></tr>");

        // Populate the row with the student information
        row.append(`<td>${studentID}</td>`);
        row.append(`<td>${courseName}</td>`);
        row.append(`<td>${submissionDate}</td>`);
        row.append(`<td>${reportText}</td>`);
        row.append(`<td>${iteration}</td>`);
        row.append(`<td>No report</td>`);
        row.append(`<td>No report</td>`);
        row.append(`<td>No letter</td>`);
        row.append(`<td>No form</td>`);

        // Add the row to the table body
        $(".table tbody").append(row);
      }

      getReport(studentID).then((report) => {
        console.log(report);

        const dateString = report.lastReportSubmission;

        const lastReportDateF = new Date(dateString);
        const formattedDate = `${lastReportDateF.getFullYear()}-${(
          lastReportDateF.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}-${lastReportDateF
            .getDate()
            .toString()
            .padStart(2, "0")}`;
        // Create a new row in the table
        var row = $("<tr></tr>");

        // Populate the row with the student information
        row.append(`<td>${studentID}</td>`);
        row.append(`<td>${courseName}</td>`);
        row.append(`<td>${formattedDate}</td>`);
        row.append(`
        <td>
          <button class="btn btn-primary" onclick="viewReport('${report._id}','${report.revisionReportID}')">
          View Report
        </button>
        <div class="overlay ${report._id}">
          <button class="btn btn-danger" onclick="closeOverlay('${report._id}')">Close</button>
          <div style="width: 100%; height: 100%;">
          <h3>Uploaded Report</h3>
          <p>Student: ${studentID} </p>
          <div style="width: 100%; height: 100%;" class="report-preview"></div>
          </div>
        </div>
      </td>`);
        row.append(`<td>${report.iteration}</td>`);
        row.append(
          `<td>
          ${report.feedbackRequired
            ? `<button class="btn btn-primary" onclick="giveFeedback('${report._id}', '${studentID}')">Give Feedback</button>`
            : "Feedback given."
          }
          <div class="overlay feedback-${report._id}">
          <button class="btn btn-danger" onclick="closeFeedbackOverlay('${report._id
          }')">Close</button>
          <div style="width: 100%; height: 100%; text-align: center;">
          <h3>Give Feedback</h3>
          <p>Student: ${studentID} </p>
          <textarea id="feedback-text-${report._id
          }" name="feedback" rows="10" cols="50" placeholder="Feedback Notes"></textarea>
          <textarea id="grade-text-${report._id
          }" name="grade" rows="1" cols="50" placeholder="Grade"></textarea>
          <input type="file" id="feedback-file-${report._id}" accept=".pdf" />
          <button class="btn btn-primary" onclick="submitFeedback('${report._id
          }', '${studentID}')">Submit Feedback</button>
          <p class="submit-feedback-response"></p>
          </div>
        </div>
          </td>`
        );
        getGrade(studentID).then((grade) => {
          var new_id = report._id + "G";
          row.append(
            `<td>
            ${grade.gradingFormSubmissionStatus === "Feedback"
              ? `<button class="btn btn-primary" onclick="giveGrade('${new_id}', '${studentID}')">Give Grade after Feedback</button>`
              : grade.gradingFormSubmissionStatus === "Revision"
                ? `<button class="btn btn-primary" onclick="giveGrade('${new_id}', '${studentID}')">Give Revised Grade</button>`
                : grade.gradingFormSubmissionStatus === "No Grades"
                  ? `<button class="btn btn-primary" onclick="giveGrade('${new_id}', '${studentID}')">Give Grade</button>`
                  : (grade.gradingFormSubmissionStatus = "Final"
                    ? "Grade given."
                    : "Grade finalized.")
            }
            <div class="overlay grade-${new_id}">
            <button class="btn btn-danger" onclick="closeGradeOverlay('${new_id}')">Close</button>
            <div style="width: 100%; height: 100%; text-align: center;">
            <h3>Give Grade</h3>
            </script >
            <p>Student: ${studentID} </p>
            <input type="number" id="workQuality-text-${new_id}" name="workQuality" min="0" max="10" placeholder="Work Quality Grade (0 - 10)">
            <input type="number" id="sumOfEvaluation-text-${new_id}" name="sumOfEvaluation" min="0" max="60" placeholder="Sum of Evaluation Scores ( X / 60 )"></textarea><br>
            <input type="number" id="reportQuality-text-${new_id}" name="reportQuality" min="0" max="10" placeholder="Report Quality Grade ( X / 10 )"></textarea><br>
            <button class="btn btn-primary" onclick="submitGrade('${new_id}', '${studentID}')">Submit Grade</button>
            <p class="submit-grade-response"></p>
            </div>
            
          </div>
          
            </td>`

          );
          row.append(`<td>
    
        <button class="btn btn-primary" onclick="viewAcceptanceLetter('${report._id}','${report.acceptanceLetterFile}')">View Acceptance Letter</button>

        <div class="overlay acceptance-letter${report._id}">
          <button class="btn btn-danger" onclick="closeAcceptanceLetter('${report._id}')">Close</button>
          <div style="width: 100%; height: 100%;">
          <h3>Uploaded Acceptance Letter</h3>
          <p>Student: ${studentID} </p>
          <div style="width: 100%; height: 100%;" class="acceptance-letter-preview"></div>
          </div>
        </div>
        </td>`);
          row.append(`<td>
            <button class="btn btn-primary" onclick="viewWorkReport('${report._id}','${report.companyWorkFormFile}')">View Work Report</button>

        <div class="overlay work-report${report._id}">
          <button class="btn btn-danger" onclick="closeWorkReport('${report._id}')">Close</button>
          <div style="width: 100%; height: 100%;">
          <h3>Work Report Uploaded by Company</h3>
          <p>Student: ${studentID} </p>
          <div style="width: 100%; height: 100%;" class="work-report-preview"></div>
          </div>
        </div>
        </td>`);
        });

        // Add the row to the table body
        $(".table tbody").append(row);
      });
    });

  });
});


function sendWorkReportFormEmail(report_id, email) {
  $.ajax({
    url: "/send-work-report-form-email",
    type: "POST",
    data: {
      report_id: report_id,
      email: email,
    },
    success: function (response) {
      $(".send-work-email-response").text(response.message);
    },
    error: function (error) {
      $(".send-work-email-response").text(error.responseJSON.message);
      console.error("Error getting file: ", error);
      // Handle the error
    },
  });
}

function closeWorkReport(id) {
  var overlay = $(`.overlay.work-report${id}`);
  overlay.toggle();
}

function viewWorkReport(id, filename) {
  var overlay = $(`.overlay.work-report${id}`);
  overlay.css("display", "block");

  $.ajax({
    url: "/get-file",
    type: "POST",
    data: {
      filename: filename,
    },
    success: function (response) {
      console.log(response.fileUrl);

      // Open the file in a new tab using the window.open() method

      // Alternatively, display the file in an iframe or PDF viewer
      $(".work-report-preview").html(
        `<iframe style="width: 100%; height: 100%;" src="${response.fileUrl}"></iframe>`
      );
    },
    error: function (error) {
      console.error("Error getting file: ", error);
      // Handle the error
    },
  });
}

function getGrade(studentID) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `/grades/${studentID}`,
      type: "GET",
      success: function (response) {
        var gradeInfo = {
          gradingFormSubmissionStatus: response.gradingFormSubmissionStatus,
          currentFeedbackID: response.currentFeedbackID,
          revisionRequest: response.revisionRequest,
          currentFeedbackOverallGrade: response.currentFeedbackOverallGrade,

          companyEvaluationFormAverage: response.companyEvaluationFormAverage,
          relatedToDepartment: response.relatedToDepartment,
          supervisorHasEngineeringBackground:
            response.supervisorHasEngineeringBackground,

          finalRevisionDate: response.finalRevisionDate,

          workQuality: response.workQuality,
          sumOfEvaluationScores: response.sumOfEvaluationScores,
          reportQuality: response.reportQuality,

          taUsername: response.taUsername,
          evaluatorusername: response.evaluatorusername,
        };
        resolve(gradeInfo);
      },
      error: function (xhr, status, error) {
        console.error(error);
        reject(error);
      },
    });
  });
}

function getStudent(studentID) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `/students/${studentID}`,
      type: "GET",
      success: function (response) {
        var studentInfo = {
          studentID: response.studentID,
          courseName: response.courses,
          studentName: response.fullName,
          surname: response.surname,
          mainReportID: response.mainReportID,
        };
        resolve(studentInfo);
      },
      error: function (xhr, status, error) {
        console.error(error);
        reject(error);
      },
    });
  });
}

function getReport(studentID) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `/reports/${studentID}`,
      type: "GET",
      success: function (response) {
        resolve(response.report);
      },
      error: function (xhr, status, error) {
        console.error(error);
        reject(error);
      },
    });
  });
}

function closeAcceptanceLetter(id) {
  var overlay = $(`.overlay.acceptance-letter${id}`);
  overlay.toggle();
}

function viewAcceptanceLetter(id, filename) {
  var overlay = $(`.overlay.acceptance-letter${id}`);
  overlay.css("display", "block");

  $.ajax({
    url: "/get-file",
    type: "POST",
    data: {
      filename: filename,
    },
    success: function (response) {
      console.log(response.fileUrl);

      // Open the file in a new tab using the window.open() method

      // Alternatively, display the file in an iframe or PDF viewer
      $(".acceptance-letter-preview").html(
        `<iframe style="width: 100%; height: 100%;" src="${response.fileUrl}"></iframe>`
      );
    },
    error: function (error) {
      console.error("Error getting file: ", error);
      // Handle the error
    },
  });
}

function closeOverlay(id) {
  var overlay = $(`.overlay.${id}`);
  overlay.toggle();
}

function viewReport(id, filename) {
  var overlay = $(`.overlay.${id}`);
  overlay.css("display", "block");

  $.ajax({
    url: "/get-file",
    type: "POST",
    data: {
      filename: filename,
    },
    success: function (response) {
      console.log(response.fileUrl);

      // Open the file in a new tab using the window.open() method

      // Alternatively, display the file in an iframe or PDF viewer
      $(".report-preview").html(
        `<iframe style="width: 100%; height: 100%;" src="${response.fileUrl}"></iframe>`
      );
    },
    error: function (error) {
      console.error("Error getting file: ", error);
      // Handle the error
    },
  });
}

function redirectToFeedback(studentID) {
  // Redirect to the feedback page
  window.location.href = "/evaluator/give-feedback?studentID=" + studentID;
}

jQuery(document).ready(function () {
  // Rest of the code...
});

function closeFeedbackOverlay(id) {
  var overlay = $(`.overlay.feedback-${id}`);
  overlay.toggle();
}

function closeGradeOverlay(id) {
  var overlay = $(`.overlay.grade-${id}`);
  overlay.toggle();
}

function giveFeedback(id, studentID) {
  var overlay = $(`.overlay.feedback-${id}`);
  overlay.css("display", "block");
  // Function to handle giving feedback to a student
  // Add your implementation here
}

function giveGrade(id, studentID) {
  var overlay = $(`.overlay.grade-${id}`);
  overlay.css("display", "block");
  // Function to handle giving feedback to a student
  // Add your implementation here
}

function submitFeedback(id, studentID) {
  // Retrieve the values from the form fields
  const student_id = studentID;
  var fileInput = $(`#feedback-file-${id}`)[0];
  var feedbackText = $(`#feedback-text-${id}`).val();
  var gradeText = $(`#grade-text-${id}`).val();
  var file = fileInput.files[0];

  var formData = new FormData();
  formData.append("student_id", student_id);
  formData.append("feedback_text", feedbackText);
  formData.append("grade_text", gradeText);
  formData.append("file", file);


  // Send the AJAX request
  $.ajax({
    url: "/submit-feedback",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      var notificationMessage = "You were given a feedback."
      issueNotification(student_id, notificationMessage);
      if (response.status == 200) {
        $(".submit-feedback-response").text(response.message);
        location.reload();
      } else {
        // Handle other status codes or errors here
        $(".submit-feedback-response").text(response.message);
      }
    },
    error: function (error) {
      // Handle the error response here
      $(".submit-feedback-response").text(error.responseJSON.message);
      console.log(error);
    },
  });
}

function submitGrade(id, studentID) {
  // Retrieve the values from the form fields
  const student_id = studentID;
  var workQuality = $(`#workQuality-text-${id}`).val();
  var sumOfEvaluation = $(`#sumOfEvaluation-text-${id}`).val();
  var reportQuality = $(`#reportQuality-text-${id}`).val();

  var formData = new FormData();
  formData.append("workQuality", workQuality);
  formData.append("sumOfEvaluation", sumOfEvaluation);
  formData.append("reportQuality", reportQuality);
  formData.append("studentID", student_id);

  // Send the AJAX request
  $.ajax({
    url: "/submit-grade",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      var notificationMessage = "You were given a grade."
      issueNotification(student_id, notificationMessage);
      if (response.status == 200) {
        $(".submit-grade-response").text(response.message);
        location.reload();
      } else {
        // Handle other status codes or errors here
        $(".submit-grade-response").text(response.message);
      }
    },
    error: function (error) {
      // Handle the error response here
      $(".submit-grade-response").text(error.responseJSON.message);
      console.log(error);
    },
  });
}

function gradeStudent(studentID) {
  // Function to handle grading a student
  // Add your implementation here
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the search input element
  var searchInput = document.getElementById("searchInput");

  // Add an event listener to the search input
  searchInput.addEventListener("input", function () {
    // Get the search query
    var searchQuery = searchInput.value.toLowerCase();

    // Get all the rows in the table body
    var rows = document.querySelectorAll(".custom-table tbody tr");

    // Iterate through the rows
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var studentId = row.cells[0].textContent.toLowerCase();

      // Show or hide the row based on the search input
      if (studentId.includes(searchQuery)) {
        row.style.display = ""; // Show the row
      } else {
        row.style.display = "none"; // Hide the row
      }
    }
  });
});

function issueNotification(relatedUserID, message) {
  // Create a JSON payload with the relatedUserID and message
  const payload = {
    relatedUserID: relatedUserID,
    message: message
  };

  // Send a POST request to the server to add the notification
  $.ajax({
    url: '/add-notification',
    type: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(payload),
    success: function (savedNotification) {
      console.log('Notification added:', savedNotification);
      // Perform any necessary actions or update UI with the savedNotification data
    },
    error: function (error) {
      console.error('Error adding notification:', error);
      // Handle the error gracefully and show an error message
    }
  });

}