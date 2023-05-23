var script = document.createElement("script");
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js";
document.head.appendChild(script);

$(document).ready(function () {
  console.log("Global JS Loaded");

  $("body").fadeIn(1000);

  // To check if the user is logged in
  if (sessionStorage.getItem("isLoggedIn") === "true") {
    // User is logged in
    redirectToLoginPage();
    // You can retrieve additional user information if necessary
    var userType = sessionStorage.getItem("userType");
    console.log("You are a " + userType);

    if (userType === "Student") {
      $("studentnavbar-component").css("display", "block");
    }
  } else {
    $("studentnavbar-component").css("display", "none");
  }

  // Set the userType in sessionStorage for access in other files
  sessionStorage.setItem("userType", userType);
});

function redirectToLoginPage() {
  var userType = sessionStorage.getItem("userType");
  console.log(userType);
  if (userType === "Student") {
    window.location.href = "/student/view-report";
  } else if (userType === "Evaluator") {
    window.location.href = "/student/view-report";
  }
}