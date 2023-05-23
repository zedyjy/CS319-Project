document.addEventListener("DOMContentLoaded", function () {
  const gradeTable = document.getElementById("grade-table");

  // Function to populate the table with data
  function populateTable(data) {
    const tbody = gradeTable.querySelector("tbody");
    tbody.innerHTML = ""; // Clear existing table rows

    // Iterate over the data and create table rows
    data.forEach(function (row) {
      const tr = document.createElement("tr");
      // Populate the table cells with corresponding data
      tr.innerHTML = `
        <td>${row.studentID}</td>
        <td>${row.courseName}</td>
        <td>${row.submissionDate}</td>
        <td><a href="${row.reportURL}">My Report</a></td>
        <td>${row.iteration}</td>
        <td>${row.feedbackStatus}</td>
        <td><a href="/evaluator/give-feedback">Click to grade</a></td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Retrieve the table data from the backend using fetch
  fetch("/api/get-table-data") // Adjust the URL according to your backend API endpoint
    .then((response) => response.json())
    .then((data) => {
      console.log("Table data retrieved successfully:", data);
      populateTable(data); // Populate the table with the retrieved data
    })
    .catch((error) => {
      console.error("Failed to retrieve table data:", error);
      // Handle any error actions or notifications
    });
});
// Wait for the document to load
document.addEventListener("DOMContentLoaded", function() {
    // Get the search input element
    var searchInput = document.getElementById("searchInput");
  
    // Add an event listener to the search input
    searchInput.addEventListener("input", function() {
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