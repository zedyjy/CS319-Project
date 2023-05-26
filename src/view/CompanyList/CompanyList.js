$(document).ready(function () {
  console.log("Company List JS Loaded");
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
    },
    error: function (error) {
      $(".add-company-response").text(error);
    },
  });
}

function getAllCompanies() {
  $.ajax({
    url: "/get-all-companies",
    type: "POST",
    data: "",
    success: function (response) {
      console.log();
      response.companies.forEach((company) => {
        return $("#company-list").append(`
          <tr scope="row">
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
                <button class="btn-small" onclick="applyToCompany()">
                  Apply
                </button>
                <button class="btn-small" onclick="viewCompanyDetails()">
                  View Details
                </button>
              </div>
              <div class="row company-details">
                <p>${company.sector}</p>
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
