
jQuery(document).ready(function () {
  console.log("STUDENT UPLOAD REPORT Page JS Loaded");
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
    console.log(key, value);
  }
});

function submitReport() {
  event.preventDefault(); // Prevent the form from submitting normally

  // Retrieve the values from the form fields
  const student_id = sessionStorage.getItem("user_id");
  // Send the AJAX request
  $.ajax({
    url: "/submit-report",
    type: "POST",
    data: {
      student_id: student_id, //DATA as object-value pair here
    },
    success: function (response) {
      if (response.status == 200) {
        if (response.courses) {
          console.log("Report Created", response.status);
        }
      } else {
        // Handle other status codes or errors here
        console.log("Report Creation Failed", response.status);
      }
    },
    error: function (error) {
      // Handle the error response here
      console.log("Report Creation Failed");
      console.log(error);

    },
  });
}