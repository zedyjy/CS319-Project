var script = document.createElement("script");
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js";
document.head.appendChild(script);

$(document).ready(function () {
  console.log("Global JS Loaded");

  const userType = sessionStorage.getItem("user_type");
  if (userType === "Student") {
    $("student-sidebar-component").show();
    $("evaluator-sidebar-component").hide();
  } else if (userType === "Evaluator") {
    $("evaluator-sidebar-component").show();
    $("student-sidebar-component").hide();
  }

  $("body").fadeIn(1000);

  // To check if the user is logged in
  // User is logged in
  if (sessionStorage.getItem("isLoggedIn") === "true") {
    const userType = sessionStorage.getItem("userType");
    console.log("You are a " + userType);
    //redirectToUserHomePage(userType);
  } else {
    //User is NOT logged in
    redirectToLoginPage();
  }
});

function redirectToLoginPage() {
  if (window.location.pathname !== "/") {
    // Prevent infinite redirect loop
    window.location.href = "/";
  }
}
