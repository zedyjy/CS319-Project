jQuery(document).ready(function () {
  console.log("STUDENT HOME Page JS Loaded");
  getEnrolledCourses();
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
    console.log(key, value);
  }
  const courses = JSON.parse(sessionStorage.getItem("courses")); // !
  courses.forEach((course) => {
    const listItem = document.createElement("li");
    listItem.textContent = course;
    $(".enrolled-courses").append(listItem);
  });
});

function enrollCourse(courseId) {
  const storedUsername = sessionStorage.getItem("username");
  event.preventDefault(); // Prevent the form from submitting normally

  // Retrieve the values from the form fields

  // Send the AJAX request
  $.ajax({
    url: "/enroll-course/student",
    type: "POST",
    data: {
      username: storedUsername, //DATA as object-value pair here
      courseId: courseId,
    },
    success: function (response) {
      if (response.status == 200) {
        if (response.courses) {
          // After successful login
          sessionStorage.setItem("courses", JSON.stringify(response.courses)); // !
          $(".enroll-response").text(response.message);
        }
      } else {
        // Handle other status codes or errors here
        $(".enroll-response").text(response.message);
        // Handle other status codes or errors here
        console.log("Enroll Failed", response.status);
      }
    },
    error: function (error) {
      // Handle the error response here
      console.log("Enroll failed");
      console.log(error);
      $(".enroll-response").text(error.responseJSON.message);
      console.log(error.responseJSON.message);
    },
  });
}

function getEnrolledCourses() {
  const storedUsername = sessionStorage.getItem("username");
  $.ajax({
    url: "/get-courses",
    type: "POST",
    data: {
      username: storedUsername, //DATA as object-value pair here
    },
    success: function (response) {
      if (response.status == 200) {
        const responseType = typeof response.courses;
        console.log("Type of responseType:", responseType);
        if (response.courses) {
          sessionStorage.setItem("courses", JSON.stringify(response.courses));
        }
      } else {
        // Handle other status codes or errors here
        console.log("Error getting Courses!", response.status);
      }
    },
    error: function (error) {
      // Handle the error response here
      console.log("Error getting Courses!");
      console.log(error);
      $(".login-response").text(error.responseJSON.message);
      console.log(error.responseJSON.message);
    },
  });
}
