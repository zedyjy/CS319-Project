$(document).ready(function () {
  console.log("Home Page JS Loaded");

  // To check if the user is logged in
  if (sessionStorage.getItem("isLoggedIn") === "true") {
    // User is logged in
    // You can retrieve additional user information if necessary
    var username = sessionStorage.getItem("username");
    var userType = sessionStorage.getItem("userType");
    console.log(userType)

    $(".forms-group").css("display", "none");
    $(".login-form").css("display", "none");
    $(".loggedin-message").css("display", "block");
    $(".username-text").text(username);
  } else {
    // User is not logged in
    console.log("User is not logged in");
    $(".forms-group").css("display", "block");
    $(".login-form").css("display", "block");
    $(".loggedin-message").css("display", "none");
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
        username: userid, //DATA as object-value pair here
        password: password,
      },
      success: function (response) {
        if (response.status == 200) {
          if (response.userType) {
            // After successful login
            sessionStorage.setItem("userType", response.userType);
            sessionStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("username", userid);
            //redirectToLoginPage();
          }

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
        username: studentid, //DATA as object-value pair here
        password: password,
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
        username: studentid, //DATA as object-value pair here
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

  //Logout Logic
  $("#logout-button").on("click", function (event) {
    sessionStorage.clear();
    location.reload();
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

function redirectToLoginPage() {
  var userType = sessionStorage.getItem("userType");
  console.log(userType);
  if (userType === "Student") {
    //window.location.href = "evaluator";
  } else if (userType === "Evaluator") {
    //window.location.href = "evaluator";
  }
}
