jQuery(document).ready(function () {
  console.log("STUDENT UPLOAD REPORT Page JS Loaded");
  getReport();
  getReportsRequiringRevision();
});

function submitReport() {
  event.preventDefault(); // Prevent the form from submitting normally

  // Retrieve the values from the form fields
  const student_id = sessionStorage.getItem("user_id");
  var fileInput = $("#report-input")[0];
  var file = fileInput.files[0];

  var formData = new FormData();
  formData.append("student_id", student_id);
  formData.append("file", file);

  // Send the AJAX request
  $.ajax({
    url: "/submit-report",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response.status == 200) {
        $(".submit-report-response").text(response.message);
        getReport();
      } else {
        // Handle other status codes or errors here
        $(".submit-report-response").text(response.message);
      }
    },
    error: function (error) {
      // Handle the error response here
      $(".submit-report-response").text(error.responseJSON.message);
      console.log(error);
    },
  });
}
function closeOverlay(id) {
  var overlay = $(`.overlay.${id}`);
  overlay.toggle();
}

function deleteReport(filename) {
  const studentID = sessionStorage.getItem("user_id");
  const mainReportID = filename;
  $.ajax({
    url: `/delete-report`,
    type: "POST",
    data: {
      studentID: studentID,
      mainReportID: mainReportID,
    },
    success: function (response) {
      $(".delete-report-response").text(response.message);
      $("#reports-list").empty();
      getReport();
    },
    error: function (error) {
      // Handle the error response here
      $(".delete-report-response").text(error.responseJSON.message);
      console.log(error);
    },
  });
}

function getReport() {
  // Retrieve the values from the form fields
  const student_id = sessionStorage.getItem("user_id");
  // Send the AJAX request
  $.ajax({
    url: `/reports/${student_id}`,
    type: "GET",
    data: "",
    success: function (response) {
      $("#reports-list").empty();
      console.log(response.report);
      $("#reports-list").append(`
              <tr scope="row" id="${response.report._id}">
                <td>${response.report.revisionReportID}</td>
                <td>${response.report.feedbackStatus}</td>
                <td>${response.report.iteration}</td>
                <td>${response.report.revisionRequired}</td>
                <td>${response.report.lastReportSubmission}</td>
                <td>${response.report.reportSubmissionDeadline}</td>
                <td>
                <button class="btn btn-primary" onclick="viewReport('${response.report._id}','${response.report.revisionReportID}')">
                  View Report
                </button>
                <!-- <button class="btn btn-danger" onclick="deleteReport('${response.report.mainReportID}')">
                  Delete Report
                </button> -->
                <div class="overlay ${response.report._id}">
                  <button class="btn btn-danger" onclick="closeOverlay('${response.report._id}')">Close</button>
                  <div style="width: 100%; height: 100%;">
                  <h3>Your Uploaded Report</h3>
                  <div style="width: 100%; height: 100%;" class="report-preview"></div>
                  </div>
                </div>
                </td>
              </tr>`);
    },
    error: function (error) {
      // Handle the error response here
      console.log("Report Creation Failed");
      console.log(error);
    },
  });
}

function submitRevisionReport(id) {
  // Retrieve the values from the form fields
  const student_id = sessionStorage.getItem("user_id");
  var fileInput = $(`#revision-report-input-${id}`)[0];
  var file = fileInput.files[0];

  var formData = new FormData();
  formData.append("student_id", student_id);
  formData.append("file", file);

  // Send the AJAX request
  $.ajax({
    url: "/submit-revision-report",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      if (response.status == 200) {
        $(".submit-revision-response").text(response.message);
        getReport();
        getReportsRequiringRevision();
      } else {
        // Handle other status codes or errors here
        $(".submit-revision-response").text(response.message);
      }
    },
    error: function (error) {
      // Handle the error response here
      $(".submit-revision-response").text(error.responseJSON.message);
      console.log(error);
    },
  });
}

function getReportsRequiringRevision() {
  // Retrieve the values from the form fields
  const student_id = sessionStorage.getItem("user_id");
  // Send the AJAX request
  $.ajax({
    url: `/reports/${student_id}`,
    type: "GET",
    data: "",
    success: function (response) {
      $("#revision-reports-list").empty();
      console.log(response.report);
      if (response.report.revisionRequired) {
        $("#revision-reports-list").append(`
        <tr scope="row" id="${response.report._id}">
          <td>${response.report.revisionReportID}</td>
          <td>
          <button class="btn btn-primary" onclick="viewFeedback('${response.report._id}','${response.report.currentFeedbackID}')">View Feedback</button>
          </td>
          <td>${response.report.iteration}</td>
          <td>${response.report.revisionRequired}</td>
          <td>${response.report.lastReportSubmission}</td>
          <td>${response.report.reportSubmissionDeadline}</td>
          <td>
          <div class="col-auto">
          <input type="file" id="revision-report-input-${response.report._id}" accept=".pdf" />
          <button onclick="submitRevisionReport('${response.report._id}')" class="btn btn-primary">
            Submit Revision
          </button>
          <p class="submit-revision-response"></p>
        </div>
          <div class="overlay feedback-${response.report._id}">
            <button class="btn btn-danger" onclick="closeFeedbackOverlay('${response.report._id}')">Close</button>
            <div style="width: 100%; height: 100%;">
            <h3>Report Feedback</h3>
            <p> Notes: </p>
            <p> ${response.report.currentFeedbackNotes}</p>
            <div style="width: 100%; height: 100%;" class="feedback-preview"></div>
            </div>
          </div>
          </td>
        </tr>`);
      }
    },
    error: function (error) {
      // Handle the error response here
      console.log("Report Creation Failed");
      console.log(error);
    },
  });
}

function closeFeedbackOverlay(id) {
  var overlay = $(`.overlay.feedback-${id}`);
  overlay.toggle();
}

function viewFeedback(id, filename) {
  var overlay = $(`.overlay.feedback-${id}`);
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
      $(".feedback-preview").html(
        `<iframe style="width: 100%; height: 100%;" src="${response.fileUrl}"></iframe>`
      );
    },
    error: function (error) {
      console.error("Error getting file: ", error);
      // Handle the error
    },
  });
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
