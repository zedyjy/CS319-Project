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
  const userType = sessionStorage.getItem("userType");
  const adminPower = userType === "Evaluator" || userType === "Coordinator";
  $.ajax({
    url: "/get-all-companies",
    type: "POST",
    data: "",
    success: function (response) {
      console.log(response);
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
                <button class="btn-small" onclick="applyToCompany('${
                  company._id
                }')">
                  Apply
                </button>
                <button class="btn-small" onclick="viewCompanyDetails('${
                  company._id
                }')">
                  View Details
                </button>
                ${
                  adminPower
                    ? `<button
                      class="btn btn-primary"
                      onclick="approveCompany('${company._id}')"
                    >
                      Approve
                    </button>`
                    : ""
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
      $(".add-company-response").text(error);
    },
  });
}

function approveCompany(companyid) {}

function viewCompanyDetails(companyid) {
  $(`#${companyid} .company-details`).toggle();
}
