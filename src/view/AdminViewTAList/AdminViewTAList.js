$(document).ready(function () {
  console.log("ADMIN TA LOADED JS");
  getAllTAs();
});
// Wait for the document to load
document.addEventListener("DOMContentLoaded", function () {
  // Get the search input element
  var searchInput = document.getElementById("ta-searchInput");

  // Add an event listener to the search input
  searchInput.addEventListener("input", function () {
    // Get the search query
    var searchQuery = searchInput.value.toLowerCase();

    // Get all the rows in the table body
    var rows = document.querySelectorAll(".ta-table tbody tr");

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

function getAllTAs() {
  $.ajax({
    url: "/get-all-tas",
    type: "POST",
    data: "",
    success: function (response) {
      console.log(response);
      response.tas.forEach((ta) => {
        return $("#tas-list").append(`
                  <tr scope="row" id="${ta._id}">
                    <td>${ta.name}</td>
                    <td>${ta.user_id}</td>
                    <td>
                    ${ta.students
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
