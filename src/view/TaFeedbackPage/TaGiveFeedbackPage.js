const tableBody = document.querySelector("#tableBody");

jQuery(document).ready(function () {
  // Retrieve the student ID from sessionStorage
  const urlParams = new URLSearchParams(window.location.search);
  const studentID = urlParams.get("studentID");
  console.log(studentID);
  // Make an AJAX request to get the student information
  $.ajax({
    url: `/students/${studentID}`,
    type: "GET",
    success: function (response) {
      // Retrieve the relevant information from the response
      var studentName = response.fullname;
      var courseName = response.courses;
      var report = "response.report";
      var iteration = response.iteration;
      var grade = "response.grade";
      var submissionDate = "Placeholder";
      console.log(iteration);
      // Create a new row in the table
      var row = $("<tr></tr>");

      // Populate the row with the student information
      row.append(`<td>${studentName}</td>`);
      row.append(`<td>${studentID}</td>`);
      row.append(`<td>${courseName}</td>`);
      row.append(`<td>${submissionDate}</td>`);
      row.append(`<td>${report}</td>`);
      row.append(`<td>${iteration}</td>`);
      row.append(`<td>${grade !== null ? grade : "Not graded yet"}</td>`);

      // Add the row to the table body
      $(".table tbody").append(row);
    },
    error: function (xhr, status, error) {
      console.error(error);
    },
  });
});

function getReport(studentID) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `/students/${studentID}`,
      type: "GET",
      success: function (response) {
        var studentInfo = {
          studentID: response.user_id,
          courseName: response.courses,
          submissionDate: response.submissionDate,
          report: response.report,
          iteration: response.iteration,
          feedback: response.feedback,
          grade: response.grade,
        };
        console.log(studentInfo);
        resolve(studentInfo);
      },
      error: function (xhr, status, error) {
        console.error(error);
        reject(error);
      },
    });
  });
}
