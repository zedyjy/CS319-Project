jQuery(document).ready(function () {
  console.log("Home Page JS Loaded");
});

jQuery(".message a").click(function () {
  jQuery("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
});

function redirectToLoginPage() {
  window.location.href = "GeneralLogin.html";
}
