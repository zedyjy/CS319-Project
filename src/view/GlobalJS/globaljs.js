$(document).ready(function () {
  console.log("Global JS Loaded");

  $("body").fadeIn(1000);

  // To check if the user is logged in
  if (sessionStorage.getItem("isLoggedIn") === "true") {
    // User is logged in
    // You can retrieve additional user information if necessary
    var userType = sessionStorage.getItem("userType");
    console.log("You are a " + userType);
    if ((userType = "Student")) {
      $("studentnavbar-component").css("display", "block");
    }
  } else {
    $("studentnavbar-component").css("display", "none");
  }
});
