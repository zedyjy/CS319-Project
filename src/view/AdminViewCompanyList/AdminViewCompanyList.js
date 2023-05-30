$(document).ready(function () {
  console.log("ADMIN Coordinator LOADED JS");
  getAllCompanies();
});

function addCompany() {
  var company_name = $("#company-name").val();
  var company_city = $("#company-city").val();
  var company_email = $("#company-email").val();
  var company_phone = $("#company-phone").val();
  var company_sector = $("#company-sector").val();

  $.ajax({
    url: "/add-company",
    type: "POST",
    data: {
      company_name: company_name,
      company_city: company_city,
      company_email: company_email,
      company_phone: company_phone,
      company_sector: company_sector,
    },
    success: function (response) {
      $(".add-company-response").text(response.message);
      getAllCompanies();
      hideAddCompanyOverlay();
    },
    error: function (error) {
      $(".add-company-response").text(error);
    },
  });
}

// Wait for the document to load
document.addEventListener("DOMContentLoaded", function () {
  // Get the search input element
  var searchInput = document.getElementById("company-searchInput");

  // Add an event listener to the search input
  searchInput.addEventListener("input", function () {
    // Get the search query
    var searchQuery = searchInput.value.toLowerCase();

    // Get all the rows in the table body
    var rows = document.querySelectorAll(".company-table tbody tr");

    // Iterate through the rows
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var evaluatorName = row.cells[0].textContent.toLowerCase();
      var evaluatorId = row.cells[1].textContent.toLowerCase();

      // Show or hide the row based on the search input
      if (
        evaluatorId.includes(searchQuery) ||
        evaluatorName.includes(searchQuery)
      ) {
        row.style.display = ""; // Show the row
      } else {
        row.style.display = "none"; // Hide the row
      }
    }
  });
});

function getAllCompanies() {
  $.ajax({
    url: "/get-all-companies",
    type: "POST",
    data: "",
    success: function (response) {
      console.log(response);
      $("#company-list").empty();
      response.companies.forEach((company) => {
        return $("#company-list").append(`
          <tr scope="row" id="${company._id}">
            <td>${company.name}</td>
            <td>${company.city}</td>
            <td>${company.studentRating}</td>
            <td>${company.evaluatorRating}</td>
            <td>
              ${company.acceptedDepartments.forEach((department) => {
                return `<span>${department}</span>`;
              })}
            </td>
            <td>${company.sector}</td>
            <td>
              <div class="row">
                <button class="btn btn-primary mr-1" onclick="viewCompanyDetails('${
                  company._id
                }')">
                  View Details
                </button>
                <!-- <button
                      class="btn btn-primary mr-1"
                      onclick="approveCompany('${company._id}')"
                    >
                      Approve
                </button> -->
                <button
                      class="btn btn-danger mr-1"
                      onclick="removeCompany('${company._id}')"
                    >
                      Remove
                </button>
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
      $(".add-company-response").text(error);
    },
  });
}

function approveCompany(companyid) {}

function removeCompany(companyid) {
  $.ajax({
    url: "/delete-company",
    type: "POST",
    data: {
      id: companyid,
    },
    success: function (response) {
      $(".delete-company-response").text(response.message);
      getAllCompanies();
    },
    error: function (error) {
      $(".delete-company-response").text(error);
    },
  });
}

function viewCompanyDetails(companyid) {
  $(`#${companyid} .company-details`).toggle();
}

function showAddCompanyOverlay() {
  $(".add-company-overlay").toggle();
}

function hideAddCompanyOverlay() {
  $(".add-company-overlay").toggle();
}
