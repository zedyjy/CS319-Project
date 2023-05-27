$(document).ready(function () {
  getInternshipCompanyDetails();
});

function getInternshipCompanyDetails() {
  var studentId = sessionStorage.getItem("user_id");

  $.ajax({
    url: "/get-current-internship-company-details",
    type: "POST",
    data: {
      user_id: studentId,
    },
    success: function (response) {},
    error: function (error) {
      console.error("Error getting Internship Company: ", error);
      $(".current-internship-company-details").append(
        `<p class="alert alert-danger" role="alert">${error.responseJSON.message}</p>`
      );
      // Handle the error
    },
  });
}

function registerInternshipCompany() {}
