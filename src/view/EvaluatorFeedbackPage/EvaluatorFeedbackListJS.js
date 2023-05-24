const studentUsername = "22001037";
$.ajax({
  url: `/students/${studentUsername}`,
  type: "GET",
  success: function (response) {
    // Update the HTML with the student information
    var studentInfoHTML = `
        <p><strong>Full Name:</strong> ${response.fullName}</p>
        <p><strong>Student ID:</strong> ${response.studentId}</p>
      `;
    var studentInfo = document.getElementById("student-info");
    studentInfo.innerHTML = studentInfoHTML;

    console.log(studentInfoHTML);
  },
  error: function (xhr, status, error) {
    // Handle error
    console.error(error);
  },
});
