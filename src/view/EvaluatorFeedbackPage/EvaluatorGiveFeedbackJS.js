const tableBody = document.querySelector("#tableBody");

jQuery(document).ready(function() {
    console.log("STUDENT HOME Page JS Loaded");

    // Retrieve the student ID from sessionStorage
    const urlParams = new URLSearchParams(window.location.search);
    const studentID = urlParams.get("studentID");
    console.log(studentID);
    // Make an AJAX request to get the student information
    $.ajax({
        url: `/students/${studentID}`,
        type: "GET",
        success: function(response) {
            // Retrieve the relevant information from the response
            var studentName = response.name;
            var courseName = response.courseName;
            var submissionDate = response.submissionDate;
            var report = response.report;
            var iteration = response.revisionCount;
            var grade = response.grade;
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
            row.append(`<td>${ grade !== null ? grade : "Not graded yet"}</td>`);

            // Add the row to the table body
            $(".table tbody").append(row);
        },
        error: function(xhr, status, error) {
            console.error(error);
        }
    });
});
