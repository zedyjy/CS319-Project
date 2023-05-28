var script = document.createElement("script");
script.src = "https://ajax.googleapis.com/ajax/libs/jquery/3.6.4/jquery.min.js";
document.head.appendChild(script);

$(document).ready(function () {
  console.log("Global JS Loaded");

  const userType = sessionStorage.getItem("user_type");

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

function showLoadingAnimation() {
  var overlay = $('<div id="loading-overlay"></div>');
  var spinner = $('<div id="loading-spinner"></div>');

  overlay.append(spinner);
  $("body").append(overlay);
}

function hideLoadingAnimation() {
  $("#loading-overlay").remove();
}
