$(document).ready(function () {
  getAllStudents();
});
// Wait for the document to load
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
      var studentName = row.cells[0].textContent.toLowerCase();
      var studentId = row.cells[1].textContent.toLowerCase();

      // Show or hide the row based on the search input
      if (
        studentId.includes(searchQuery) ||
        studentName.includes(searchQuery)
      ) {
        row.style.display = ""; // Show the row
      } else {
        row.style.display = "none"; // Hide the row
      }
    }
  });
});

function getAllStudents() {
  $.ajax({
    url: "/get-all-students",
    type: "POST",
    data: "",
    success: function (response) {
      console.log(response);
      response.students.forEach((student) => {
        return $("#student-list").append(`
            <tr scope="row" id="${student._id}">
              <td>${student.user.fullname}</td>
              <td>${student.user_id}</td>
              <td>
                ${student.assignedEvaluators
            .map((evaluator) => {
              return evaluator;
            })
            .join(", ")}
                </td>
                <td>
                ${student.assignedTAs
            .map((ta) => {
              return ta;
            })
            .join(", ")}
                </td>
              
            </tr>`);
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}
