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