jQuery(document).ready(function () {
  console.log("STUDENT HOME Page JS Loaded");

  // To check if the user is logged in
  if (sessionStorage.getItem("isLoggedIn") === "true") {
    // User is logged in
    // You can retrieve additional user information if necessary
    var username = sessionStorage.getItem("username");
    var userType = sessionStorage.getItem("userType");
  } else {
    // User is not logged in

    window.location.replace("/");
  }
});
