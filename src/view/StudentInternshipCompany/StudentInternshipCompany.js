$(document).ready(function () {
  getInternshipCompanyDetails();
  getAllCompanies();
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
                ${
                  response.student.acceptanceLetterFile
                    ? `<button class="btn btn-primary" onclick="viewLetter('${response.company._id}','${response.student.acceptanceLetterFile}')">
                  View File
                </button>`
                    : ` 
                <input
                type="file"
                class="form-control"
                id="upload-acceptance-letter-input"
                accept=".pdf"
                style="height: 44px"
                required
              />
              <button class="btn btn-primary" onclick="uploadAcceptanceLetter()">
              Upload
              </button>
                
                `
                }
                
                <div class="overlay ${response.company._id}">
                  <button class="btn btn-danger" onclick="closeOverlay('${
                    response.company._id
                  }')">Close</button>
                  <div style="width: 100%; height: 100%;">
                  <h3>Your Uploaded Acceptance Letter</h3>
                  <div style="width: 100%; height: 100%;" class="letter-preview"></div>
                  </div>
                </div>
                </td>
                <td>
                <button class="btn btn-danger" onclick="removeInternshipCompany()">Remove Company</button>
                
                </td>
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
  showLoadingAnimation();
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
      var user = response.user;
      sessionStorage.setItem("user", JSON.stringify(user));
      location.reload();
      hideLoadingAnimation();
    },
    error: function (error) {
      hideLoadingAnimation();
      // Handle the error response here
      $(".register-internship-company-response").text(
        error.responseJSON.message
      );
      console.log(error);
    },
  });
}

function removeInternshipCompany() {
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
      sessionStorage.setItem("user", JSON.stringify(response.user));
      location.reload();
    },
    error: function (error) {
      // Handle the error response here
      $(".remove-internship-company-response").text(error.responseJSON.message);
      console.log(error);
    },
  });
}

function uploadAcceptanceLetter() {
  // Show loading animation
  showLoadingAnimation();

  var student_id = sessionStorage.getItem("user_id");
  var companyAcceptanceLetter = $("#upload-acceptance-letter-input")[0]
    .files[0];

  var formData = new FormData();
  formData.append("student_id", student_id);
  formData.append("file", companyAcceptanceLetter);

  $.ajax({
    url: "/student/upload-acceptance-letter",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      getInternshipCompanyDetails();
      hideLoadingAnimation();
    },
    error: function (error) {
      hideLoadingAnimation();
      // Handle the error response here
      console.log(error);
    },
  });
}

function getAllCompanies() {
  const user = JSON.parse(sessionStorage.getItem("user"));

  $.ajax({
    url: "/get-all-companies",
    type: "POST",
    data: "",
    success: function (response) {
      console.log(response);
      response.companies.forEach((company) => {
        company.acceptedDepartments.forEach((department) => {
          console.log(`<span>${department}</span>`);
        });

        return $("#approved-companies-list").append(`
          <tr scope="row" id="${company._id}">
            <td>${company.name}</td>
            <td>${company.city}</td>
            <td>${company.email}</td>
            <td>${company.sector}</td>
            <td>
            ${company.acceptedDepartments
              .map((department) => `<span>${department}</span>`)
              .join("")}
            </td>
            <td>
              <div class="row" style="margin-top:0px;">
                <button class="btn btn-primary mr-1" onclick="viewCompanyDetails('${
                  company._id
                }')">
                  View Details
                </button>
                ${
                  user.companyId === company._id
                    ? `<p class="alert-danger">Already registered in your account.<p>`
                    : `
                <button class="btn btn-primary mr-1" onclick="chooseCompany('${company._id}')">
                  Choose Company
                </button>
                `
                }
                
                
              </div>
              <div class="company-details" style="display:none">
              <p>Email: ${company.email}</p>
              <p>Phone: ${company.phone}</p>
              </div>
            </td>
          </tr>`);
      });
    },
    error: function (error) {
      console.error("Error getting Internship Company: ", error);
      $(".all-companies").append(
        `<p class="alert alert-danger" role="alert">${error.responseJSON.message}</p>`
      );
      // Handle the error
    },
  });
}

function viewCompanyDetails(companyid) {
  $(`#${companyid} .company-details`).toggle();
}

function chooseCompany(companyid) {
  const student_id = sessionStorage.getItem("user_id");
  $.ajax({
    url: "/student/add-internship-company",
    type: "POST",
    data: {
      user_id: student_id,
      company_id: companyid,
    },
    success: function (response) {
      var user = response.user;
      sessionStorage.setItem("user", JSON.stringify(user));
      location.reload();
    },
    error: function (error) {
      console.error("Error Selecting Internship Company: ", error);
      // Handle the error
    },
  });
}
