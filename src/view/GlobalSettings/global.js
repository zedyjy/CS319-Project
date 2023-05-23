var script = document.createElement("script");
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js";
document.head.appendChild(script);

$(document).ready(function () {
  console.log("Global JS Loaded");

  $("body").fadeIn(1000);

  // To check if the user is logged in
  if (sessionStorage.getItem("isLoggedIn") === "true") {
    // User is logged in

    // You can retrieve additional user information if necessary
    var userType = sessionStorage.getItem("userType");
    console.log("You are a " + userType);

    if (userType === "Student") {
      $("studentnavbar-component").css("display", "block");
    }
  } else {
    //User is NOT logged in
    redirectToLoginPage();
    $("studentnavbar-component").css("display", "none");
  }

  // Set the userType in sessionStorage for access in other files
  sessionStorage.setItem("userType", userType);
});

function redirectToLoginPage() {
  //redirect to login page if not logged in
  //var userType = sessionStorage.getItem("userType");
  //console.log(userType);
  window.location.href = "/";
  // if (userType === "Student") {
  //   window.location.href = "/student/view-report";
  // } else if (userType === "Evaluator") {
  //   window.location.href = "/student/view-report";
  // }
}
