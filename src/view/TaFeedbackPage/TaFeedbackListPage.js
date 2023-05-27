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
        row.append(
          `<td><a id="grade" href="#" onclick="redirectToFeedback(${studentID})">Give Feedback</a></td>`
        );

        // Add the row to the table body
        $(".table tbody").append(row);
      }

      getReport(studentID).then((report) => {
        console.log(report);
        // Create a new row in the table
        var row = $("<tr></tr>");

        // Populate the row with the student information
        row.append(`<td>${studentID}</td>`);
        row.append(`<td>${courseName}</td>`);
        row.append(`<td>${report.lastReportSubmission}</td>`);
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
            ${
              report.feedbackRequired && report.iteration < 3
                ? `<button class="btn btn-primary" onclick="giveFeedback('${report._id}', '${studentID}')">Give Feedback</button>`
                : report.iteration < 3
                ? "Feedback given"
                : "Max Iteration Count Reached! Please Grade."
            }
            <div class="overlay feedback-${report._id}">
            <button class="btn btn-danger" onclick="closeFeedbackOverlay('${
              report._id
            }')">Close</button>
            <div style="width: 100%; height: 100%; text-align: center;">
            <h3>Give Feedback</h3>
            <p>Student: ${studentID} </p>
            <textarea id="feedback-text-${
              report._id
            }" name="feedback" rows="10" cols="50" placeholder="Feedback Notes"></textarea>
            <input type="file" id="feedback-file-${report._id}" accept=".pdf" />
            <button class="btn btn-primary" onclick="submitFeedback('${
              report._id
            }', '${studentID}')">Submit Feedback</button>
            <p class="submit-feedback-response"></p>
            </div>
          </div>
            </td>`
        );

        // Add the row to the table body
        $(".table tbody").append(row);
      });
    });
  });
});

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

function giveFeedback(id, studentID) {
  var overlay = $(`.overlay.feedback-${id}`);
  overlay.css("display", "block");
  // Function to handle giving feedback to a student
  // Add your implementation here
}

function submitFeedback(id, studentID) {
  // Retrieve the values from the form fields
  const student_id = studentID;
  var fileInput = $(`#feedback-file-${id}`)[0];
  var feedbackText = $(`#feedback-text-${id}`).val();
  var file = fileInput.files[0];

  var formData = new FormData();
  formData.append("student_id", student_id);
  formData.append("feedback_text", feedbackText);
  formData.append("file", file);

  // Send the AJAX request
  $.ajax({
    url: "/submit-feedback",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
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
