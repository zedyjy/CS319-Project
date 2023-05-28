$(document).ready(function () {
  console.log("Home Page JS Loaded");

  // To check if the user is logged in
  if (sessionStorage.getItem("isLoggedIn") === "true") {
    // User is logged in
    redirectToUserHomePage();
    // You can retrieve additional user information if necessary
    var user_id = sessionStorage.getItem("user_id");
    var userType = sessionStorage.getItem("userType");
    console.log(userType);

    $(".forms-group").css("display", "none");
    $(".login-form").css("display", "none");
    $(".loggedin-message").css("display", "block");
    $(".user_id-text").text(user_id);
    $("#goto-homepage").css("display", "block");
  } else {
    // User is not logged in
    console.log("User is not logged in");
    $(".forms-group").css("display", "block");
    $(".login-form").css("display", "block");
    $(".loggedin-message").css("display", "none");
    $("#goto-homepage").css("display", "none");
  }

  //--------------------------
  // Connected Login Form
  //--------------------------
  $("#login-button").on("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Retrieve the values from the form fields
    var userid = $("#login-Id").val().trim();
    var password = $("#login-password").val();

    // Send the AJAX request
    $.ajax({
      url: "/login",
      type: "POST",
      data: {
        user_id: userid, //DATA as object-value pair here
        password: password,
      },
      success: function (response) {
        if (response.status == 200) {
          // After successful login
          sessionStorage.setItem("userType", response.userType);
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("user_id", userid);
          sessionStorage.setItem("user", JSON.stringify(response.user));

          var userType = sessionStorage.getItem("userType");
          console.log(userType);
          if (userType == "Student") {
            sessionStorage.setItem("courses", JSON.stringify(response.courses));
          } else if (userType == "Evaluator") {
            sessionStorage.setItem("courses", JSON.stringify(response.courses));
            sessionStorage.setItem(
              "students",
              JSON.stringify(response.students)
            );
            sessionStorage.setItem(
              "gradingForms",
              JSON.stringify(response.gradingForms)
            );
          } else if (userType == "TA") {
            sessionStorage.setItem("courses", JSON.stringify(response.courses));
            sessionStorage.setItem(
              "students",
              JSON.stringify(response.students)
            );
          } else if (userType == "Coordinator") {
            sessionStorage.setItem("courses", JSON.stringify(response.courses));
          }
          //redirectToUserHomePage();

          location.reload();
          $(".login-response").text("Logging In , please refresh page");
        } else {
          // Handle other status codes or errors here
          $(".login-response").text(response.message);
          // Handle other status codes or errors here
          console.log("Login failed with status code:", response.status);
        }
      },
      error: function (error) {
        // Handle the error response here
        console.log("Login failed");
        console.log(error);
        $(".login-response").text(error.responseJSON.message);
        console.log(error.responseJSON.message);
      },
    });
  });

  //--------------------------
  // Student Forms
  //--------------------------
  // Student Register Form
  $("#student-register-button").on("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Retrieve the values from the form fields
    var student_id = $("#register-student-Id").val().trim();
    var password = $("#register-student-password").val();
    var department = $("#register-student-department").val();

    // Send the AJAX request
    $.ajax({
      url: "/register/student",
      type: "POST",
      data: {
        user_id: student_id, //DATA as object-value pair here
        password: password,
        department: department,
      },
      success: function (response) {
        console.log(response);
        if (response.status == 200) {
          // Handle the success response here
          console.log("Register successful");
          console.log(response.message);

          $(".register-student-response").text("Successfully Registered!");
        } else {
          // Handle other status codes or errors here
          $(".register-student-response").text(response.message);
          console.log("Register failed with status code:", response.status);
        }
      },
      error: function (error) {
        // Handle the error response here
        console.log("register failed");
        $(".register-student-response").text(error.responseJSON.message);
        console.log(error.responseJSON.message);
      },
    });
  });

  //--------------------------
  // Evaluator Forms
  //--------------------------
  // Evaluator Register Form
  $("#register-evaluator-button").on("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Retrieve the values from the form fields
    var studentid = $("#register-evaluator-Id").val().trim();
    var password = $("#register-evaluator-password").val();
    var department = $("#register-evaluator-department").val();

    // Send the AJAX request
    $.ajax({
      url: "/register/evaluator",
      type: "POST",
      data: {
        user_id: studentid, //DATA as object-value pair here
        password: password,
        department: department,
      },
      success: function (response) {
        console.log(response);
        if (response.status == 200) {
          // Handle the success response here
          console.log("Register successful");
          console.log(response.message);

          $(".register-evaluator-response").text("Successfully Regsitered!");
        } else {
          // Handle other status codes or errors here
          $(".register-evaluator-response").text(response.message);
          console.log("Register failed with status code:", response.status);
        }
      },
      error: function (error) {
        // Handle the error response here
        console.log("register failed");
        $(".register-evaluator-response").text(error.responseJSON.message);
        console.log(error.responseJSON.message);
      },
    });
  });

  //--------------------------
  // Coordinator Forms
  //--------------------------
  // Coordinator Register Form
  $("#register-coordinator-button").on("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Retrieve the values from the form fields
    var studentid = $("#register-coordinator-Id").val().trim();
    var password = $("#register-coordinator-password").val();
    var department = $("#register-coordinator-department").val();

    // Send the AJAX request
    $.ajax({
      url: "/register/coordinator",
      type: "POST",
      data: {
        user_id: studentid, //DATA as object-value pair here
        password: password,
        department: department,
      },
      success: function (response) {
        console.log(response);
        if (response.status == 200) {
          // Handle the success response here
          console.log("Register successful");
          console.log(response.message);

          $(".register-coordinator-response").text("Successfully Regsitered!");
        } else {
          // Handle other status codes or errors here
          $(".register-coordinator-response").text(response.message);
          console.log("Register failed with status code:", response.status);
        }
      },
      error: function (error) {
        // Handle the error response here
        console.log("register failed");
        $(".register-coordinator-response").text(error.responseJSON.message);
        console.log(error.responseJSON.message);
      },
    });
  });

  //--------------------------
  // TA Forms
  //--------------------------
  // TA Register Form
  $("#register-ta-button").on("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Retrieve the values from the form fields
    var studentid = $("#register-ta-Id").val().trim();
    var password = $("#register-ta-password").val();
    var department = $("#register-ta-department").val();

    // Send the AJAX request
    $.ajax({
      url: "/register/ta",
      type: "POST",
      data: {
        user_id: studentid, //DATA as object-value pair here
        password: password,
        department: department,
      },
      success: function (response) {
        console.log(response);
        if (response.status == 200) {
          // Handle the success response here
          console.log("Register successful");
          console.log(response.message);

          $(".register-ta-response").text("Successfully Regsitered!");
        } else {
          // Handle other status codes or errors here
          $(".register-ta-response").text(response.message);
          console.log("Register failed with status code:", response.status);
        }
      },
      error: function (error) {
        // Handle the error response here
        console.log("register failed");
        $(".register-ta-response").text(error.responseJSON.message);
        console.log(error.responseJSON.message);
      },
    });
  });

  //--------------------------
  // Admin Forms
  //--------------------------
  // Admin Register Form
  $("#register-admin-button").on("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Retrieve the values from the form fields
    var adminId = $("#register-admin-Id").val().trim();
    var adminPassword = $("#register-admin-password").val();

    // Create an object to hold the request data
    var requestData = {
      username: adminId,
      password: adminPassword,
    };

    // Send the AJAX request
    $.ajax({
      url: "/admin-register",
      type: "POST",
      data: JSON.stringify(requestData), // Convert the request data to JSON string
      contentType: "application/json", // Set the content type to JSON
      success: function (response) {
        console.log(response);
        if (response.status === 200) {
          // Handle the success response here
          console.log("Register successful");
          console.log(response.message);
          $(".register-admin-response").text("Admin Successfully Registered!");
        } else {
          // Handle other status codes or errors here
          $(".register-admin-response").text(response.message);
          console.log("Register failed with status code:", response.status);
        }
      },
      error: function (error) {
        // Handle the error response here
        console.log("Register failed");
        $(".register-admin-response").text(error.responseJSON.message);
      },
    });
  });

  //Logout Logic
  $("#logout-button").on("click", function (event) {
    sessionStorage.clear();
    location.reload();
  });

  //Goto User Home Page
  $("#goto-homepage").on("click", function (event) {
    const userType = sessionStorage.getItem("userType");
    if (userType === "Student") {
      window.location.href = "/student";
    } else if (userType === "Evaluator") {
      window.location.href = "/evaluator";
    } else if (userType === "TA") {
      window.location.href = "/ta";
    }
  });
});

//Multiple Forms Showing Logic
function toggleForms(boxId) {
  // Hide all forms
  $(".forms" + boxId).hide();

  // Show forms for the clicked box
  $("#forms" + boxId).toggle();
}

jQuery(".message a").click(function () {
  jQuery("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
});

function redirectToUserHomePage() {
  const userType = sessionStorage.getItem("userType");
  if (userType === "Student") {
    if (window.location.pathname !== "/student") {
      // Prevent infinite redirect loop
      window.location.href = "/student";
    }
  } else if (userType === "Evaluator") {
    if (window.location.pathname !== "/evaluator") {
      // Prevent infinite redirect loop
      window.location.href = "/evaluator";
    }
  } else if (userType === "Admin") {
    if (window.location.pathname !== "/admin") {
      // Prevent infinite redirect loop
      window.location.href = "/admin";
    }
  } else if (userType === "TA") {
    if (window.location.pathname !== "/ta") {
      // Prevent infinite redirect loop
      window.location.href = "/ta";
    }
  } else if (userType === "Coordinator") {
    if (window.location.pathname !== "/coordinator") {
      // Prevent infinite redirect loop
      window.location.href = "/coordinator";
    }
  }
}
