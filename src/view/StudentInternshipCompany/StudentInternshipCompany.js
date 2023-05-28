$(document).ready(function () {
  getInternshipCompanyDetails();
});

function getInternshipCompanyDetails() {
  var studentId = sessionStorage.getItem("user_id");

  $.ajax({
    url: "/student/get-company-details",
    type: "POST",
    data: {
      user_id: studentId,
    },
    success: function (response) {
      $(".alert").hide();
      $("#current-internship-company-details-reports-list").empty();
      console.log(response);
      $("#current-internship-company-details-reports-list").append(`
              <tr scope="row" id="${response.company._id}">
                <td>${response.company.name}</td>
                <td>${response.company.city}</td>
                <td>${response.company.email}</td>
                <td>${response.company.sector}</td>
                <td>${response.company.approvalStatus}</td>
                <td>
                <button class="btn btn-primary" onclick="viewLetter('${response.company._id}','${response.student.acceptanceLetterFile}')">
                  View File
                </button>
                <div class="overlay ${response.company._id}">
                  <button class="btn btn-danger" onclick="closeOverlay('${response.company._id}')">Close</button>
                  <div style="width: 100%; height: 100%;">
                  <h3>Your Uploaded Acceptance Letter</h3>
                  <div style="width: 100%; height: 100%;" class="letter-preview"></div>
                  </div>
                </div>
                </td>
                <td><button class="btn btn-danger" onclick="removeInternshipCompany('${studentId}')">Remove Company</button></td>
              </tr>`);
    },
    error: function (error) {
      console.error("Error getting Internship Company: ", error);
      $(".current-internship-company-details").append(
        `<p class="alert alert-danger" role="alert">${error.responseJSON.message}</p>`
      );
      // Handle the error
    },
  });
}

function viewLetter(id, filename) {
  $(`.overlay.${id}`).toggle();

  $.ajax({
    url: "/get-file",
    type: "POST",
    data: {
      filename: filename,
    },
    success: function (response) {
      console.log(response.fileUrl);

      // Open the file in a new tab using the window.open() method

      // Alternatively, display the file in an iframe or PDF viewer
      $(".letter-preview").html(
        `<iframe style="width: 100%; height: 100%;" src="${response.fileUrl}"></iframe>`
      );
    },
    error: function (error) {
      console.error("Error getting file: ", error);
      // Handle the error
    },
  });
}

function closeOverlay(id) {
  $(`.overlay.${id}`).toggle();
}

function registerInternshipCompany() {
  var student_id = sessionStorage.getItem("user_id");
  var companyName = $("#companyName").val();
  var companyEmail = $("#companyEmail").val().trim();
  var companyCity = $("#companyCity").val();
  var companyPhone = $("#companyPhone").val().trim();
  var companySector = $("#companySector").val();

  var companyAcceptanceLetter = $("#company-acceptance-letter-input")[0]
    .files[0];

  var formData = new FormData();
  formData.append("student_id", student_id);
  formData.append("companyName", companyName);
  formData.append("companyEmail", companyEmail);
  formData.append("companyPhone", companyPhone);
  formData.append("companyCity", companyCity);
  formData.append("companySector", companySector);
  formData.append("file", companyAcceptanceLetter);

  // Send the AJAX request
  $.ajax({
    url: "/student/register-internship-company",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $(".register-internship-company-response").text(response.message);
      getInternshipCompanyDetails();
    },
    error: function (error) {
      // Handle the error response here
      $(".register-internship-company-response").text(
        error.responseJSON.message
      );
      console.log(error);
    },
  });
}

function removeInternshipCompany(id) {
  const student_id = sessionStorage.getItem("user_id");
  $.ajax({
    url: "/student/remove-internship-company",
    type: "POST",
    data: {
      user_id: student_id,
    },
    success: function (response) {
      $(".remove-internship-company-response").text(response.message);
      $("#current-internship-company-details-reports-list").empty();
      getInternshipCompanyDetails();
    },
    error: function (error) {
      // Handle the error response here
      $(".remove-internship-company-response").text(error.responseJSON.message);
      console.log(error);
    },
  });
}
