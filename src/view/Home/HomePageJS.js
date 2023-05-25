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
    var userid = $("#login-Id").val();
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
    var studentid = $("#register-student-Id").val();
    var password = $("#register-student-password").val();

    // Send the AJAX request
    $.ajax({
      url: "/register/student",
      type: "POST",
      data: {
        user_id: studentid, //DATA as object-value pair here
        password: password,
        studentId: studentid,
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
    var studentid = $("#register-evaluator-Id").val();
    var password = $("#register-evaluator-password").val();

    // Send the AJAX request
    $.ajax({
      url: "/register/evaluator",
      type: "POST",
      data: {
        user_id: studentid, //DATA as object-value pair here
        password: password,
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
  // Admin Forms
  //--------------------------
  // Evaluator Register Form
  $("#register-admin-button").on("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Retrieve the values from the form fields
    var studentid = $("#register-admin-Id").val();
    var password = $("#register-admin-password").val();

    // Send the AJAX request
    $.ajax({
      url: "/register/admin",
      type: "POST",
      data: {
        user_id: studentid, //DATA as object-value pair here
        password: password,
      },
      success: function (response) {
        console.log(response);
        if (response.status == 200) {
          // Handle the success response here
          console.log("Register successful");
          console.log(response.message);

          $(".register-admin-response").text("Successfully Regsitered!");
        } else {
          // Handle other status codes or errors here
          $(".register-admin-response").text(response.message);
          console.log("Register failed with status code:", response.status);
        }
      },
      error: function (error) {
        // Handle the error response here
        console.log("register failed");
        $(".register-admin-response").text(error.responseJSON.message);
        console.log(error.responseJSON.message);
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
  }
}
