$(document).ready(function () {
  console.log("Home Page JS Loaded");

  // To check if the user is logged in
  if (sessionStorage.getItem("isLoggedIn") === "true") {
    // User is logged in
    // You can retrieve additional user information if necessary
    var username = sessionStorage.getItem("username");
    $(".login-form").css("display", "none");
    $(".register-form").css("display", "none");
    $(".loggedin-message").css("display", "block");
    $(".username-text").text(username);
  } else {
    // User is not logged in
    console.log("User is not logged in");
    $(".login-form").css("display", "block");
    $(".register-form").css("display", "block");
    $(".loggedin-message").css("display", "none");
  }

  // Register Form
  $("#register-button").on("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Retrieve the values from the form fields
    var studentid = $("#register-studentId").val();
    var password = $("#register-password").val();

    // Send the AJAX request
    $.ajax({
      url: "/register/user",
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

          $(".register-response").text("Successfully Regsitered!");
        } else {
          // Handle other status codes or errors here
          $(".register-response").text(response.message);
          console.log("Register failed with status code:", response.status);
        }
      },
      error: function (error) {
        // Handle the error response here
        console.log("register failed");
        $(".register-response").text(error.responseJSON.message);
        console.log(error.responseJSON.message);
      },
    });
  });

  // Login Form
  $("#login-button").on("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Retrieve the values from the form fields
    var studentid = $("#login-studentId").val();
    var password = $("#login-password").val();

    // Send the AJAX request
    $.ajax({
      url: "/login/user",
      type: "POST",
      data: {
        username: studentid, //DATA as object-value pair here
        password: password,
      },
      success: function (response) {
        if (response.status == 200) {
          // Handle the success response here
          console.log("Login successful");
          console.log(response);

          // After successful login
          sessionStorage.setItem("isLoggedIn", "true");
          sessionStorage.setItem("username", studentid);
          location.reload();
          $(".login-response").text("Logging In , please refresh page");
        } else {
          // Handle other status codes or errors here
          $(".register-response").text(response.message);
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

  //Logout Logic
  $("#logout-button").on("click", function (event) {
    sessionStorage.clear();
    location.reload();
  });
});

jQuery(".message a").click(function () {
  jQuery("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
});

function redirectToLoginPage() {
  window.location.href = "GeneralLogin.html";
}
