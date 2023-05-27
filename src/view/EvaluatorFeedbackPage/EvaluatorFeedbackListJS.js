jQuery(document).ready(function () {
  console.log("STUDENT HOME Page JS Loaded");
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
    console.log(key, value);
  }
  const students = JSON.parse(sessionStorage.getItem("students"));
  const studentPromises = students.map((student) => getStudent(student));
  Promise.all(studentPromises)
    .then((studentInfos) => {
      studentInfos.forEach((studentInfo) => {
        var studentName = studentInfo.studentName;
        var studentID = studentInfo.studentID;
        var courseName = studentInfo.courseName;
        var surname = studentInfo.surname;
        var mainReportID = studentInfo.mainReportID;
        console.log(mainReportID);

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
          row.append(
            `<td><a id="grade" href="#" onclick="redirectToFeedback(${studentID})">Give Feedback</a></td>`
          );
          row.append(
            `<td><button onclick="gradeStudent('${studentID}')">Grade Student</button></td>`
          );

          // Add the row to the table body
          $(".table tbody").append(row);
        }

        getReport(studentID)
          .then((report) => {
            console.log(studentID);
            var submissionDate = report ? report.lastReportSubmission : "No report";
            var reportText = report ? "Placeholder for button" : "No report";
            var iteration = report ? report.iteration : "No report";

            // Create a new row in the table
            var row = $("<tr></tr>");

            // Populate the row with the student information
            row.append(`<td>${studentID}</td>`);
            row.append(`<td>${courseName}</td>`);
            row.append(`<td>${submissionDate}</td>`);
            row.append(`<td>${reportText}</td>`);
            row.append(`<td>${iteration}</td>`);
            row.append(
              `<td><a id="grade" href="#" onclick="redirectToFeedback(${studentID})">Give Feedback</a></td>`
            );
            row.append(
              `<td><button onclick="gradeStudent('${studentID}')">Grade Student</button></td>`
            );

            // Add the row to the table body
            $(".table tbody").append(row);
          })
      })
    });
})





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
        console.log(studentInfo)
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
        var reportInfo = {
          mainReportID: response.mainReportID,
          currentFeedbackID: response.currentFeedbackID,
          oldFeedbackIDs: response.oldFeedbackIDs,
          revisionRequired: response.revisionRequired,
          feedbackRequired: response.feedbackRequired,
          gradingItemID: response.gradingItemID,
          iteration: response.iteration,
          lastReportSubmission: response.lastReportSubmission,
          revisionDeadline: response.revisionDeadline,
          reportSubmissionDeadline: response.reportSubmissionDeadline,
        };
        console.log(reportInfo)
        resolve(reportInfo);
      },
      error: function (xhr, status, error) {
        console.error(error);
        reject(error);
      },
    });
  });
}

function redirectToFeedback(studentID) {
  // Redirect to the feedback page
  window.location.href = "/evaluator/give-feedback?studentID=" + studentID;
}

jQuery(document).ready(function () {
  console.log("STUDENT HOME Page JS Loaded");

  // Rest of the code...
});

function giveFeedback(studentID) {
  // Function to handle giving feedback to a student
  // Add your implementation here
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
