$(document).ready(function () {
  console.log("ADMIN EVAL LOADED JS");
  getAllEvaluators();
});
// Wait for the document to load
document.addEventListener("DOMContentLoaded", function () {
  // Get the search input element
  var searchInput = document.getElementById("evaluator-searchInput");

  // Add an event listener to the search input
  searchInput.addEventListener("input", function () {
    // Get the search query
    var searchQuery = searchInput.value.toLowerCase();

    // Get all the rows in the table body
    var rows = document.querySelectorAll(".evaluator-table tbody tr");

    // Iterate through the rows
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var evaluatorName = row.cells[0].textContent.toLowerCase();
      var evaluatorId = row.cells[1].textContent.toLowerCase();

      // Show or hide the row based on the search input
      if (
        evaluatorId.includes(searchQuery) ||
        evaluatorName.includes(searchQuery)
      ) {
        row.style.display = ""; // Show the row
      } else {
        row.style.display = "none"; // Hide the row
      }
    }
  });
});

function getAllEvaluators() {
  $.ajax({
    url: "/get-all-evaluators",
    type: "POST",
    data: "",
    success: function (response) {
      console.log(response);
      response.evaluators.forEach((evaluator) => {
        return $("#evaluators-list").append(`
              <tr scope="row" id="${evaluator._id}">
                <td>${evaluator.user.fullname}</td>
                <td>${evaluator.user_id}</td>
                <td>
                ${evaluator.students
                  .map((student) => {
                    console.log(student);
                    return student;
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
