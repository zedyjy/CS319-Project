$(document).ready(function () {
  console.log("ADMIN Coordinator LOADED JS");
  getAllCoordinators();
});
// Wait for the document to load
document.addEventListener("DOMContentLoaded", function () {
  // Get the search input element
  var searchInput = document.getElementById("coordinator-searchInput");

  // Add an event listener to the search input
  searchInput.addEventListener("input", function () {
    // Get the search query
    var searchQuery = searchInput.value.toLowerCase();

    // Get all the rows in the table body
    var rows = document.querySelectorAll(".coordinator-table tbody tr");

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

function getAllCoordinators() {
  $.ajax({
    url: "/get-all-coordinators",
    type: "POST",
    data: "",
    success: function (response) {
      console.log(response);
      response.coordinators.forEach((coordinator) => {
        return $("#coordinators-list").append(`
                <tr scope="row" id="${coordinator._id}">
                  <td>${coordinator.name}</td>
                  <td>${coordinator.user_id}</td>
                  <td>
                  
                  </td>
                </tr>`);
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}
