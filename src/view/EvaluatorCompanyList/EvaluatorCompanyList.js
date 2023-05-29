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
      location.reload();
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
      console.log(response);
      response.companies.forEach((company) => {
        if (company.approvalStatus === "Pending") {
          return $("#pending-company-list").append(`
              <tr scope="row" id="${company._id}">
                <td>${company.name}</td>
                <td>${company.city}</td>
                <td>${company.email}</td>
                <td>${company.sector}</td>
                <td>
                  ${company.acceptedDepartments.forEach((department) => {
                    return `<span>${department}</span>`;
                  })}
                </td>
              
                <td>
                  <div class="row">
                    <button class="btn btn-primary mr-1" onclick="viewCompanyDetails('${
                      company._id
                    }')">
                      View Details
                    </button>
                  
                        <button
                          class="btn btn-primary"
                          onclick="approveCompany('${company._id}')"
                        >
                          Approve
                        </button>

                        <button
                          class="btn btn-danger"
                          onclick="rejectCompany('${company._id}')"
                        >
                          Reject
                        </button>
                        
                    
                  </div>
                  <div class="company-details" style="display:none">
                  <p>Phone: ${company.phone}</p>
                  </div>
                </td>
              </tr>`);
        } else if (company.approvalStatus === "Approved") {
          return $("#approved-company-list").append(`
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
                <div class="row">
                  <button class="btn btn-primary mr-1" onclick="viewCompanyDetails('${
                    company._id
                  }')">
                    View Details
                  </button>
                
                  <button
                  class="btn btn-danger"
                  onclick="rejectCompany('${company._id}')"
                >
                  Reject
                </button>
                      
                  
                </div>
                <div class="company-details" style="display:none">
                <p>Phone: ${company.phone}</p>
                </div>
              </td>
            </tr>`);
        } else if (company.approvalStatus === "Rejected") {
          return $("#rejected-company-list").append(`
            <tr scope="row" id="${company._id}">
              <td>${company.name}</td>
              <td>${company.city}</td>
              <td>${company.email}</td>
              <td>${company.sector}</td>
              <td>
                ${company.acceptedDepartments.forEach((department) => {
                  return `<span>${department}</span>`;
                })}
              </td>
            
              <td>
                <div class="row">
                  <button class="btn btn-primary mr-1" onclick="viewCompanyDetails('${
                    company._id
                  }')">
                    View Details
                  </button>
                
                      <button
                        class="btn btn-primary"
                        onclick="approveCompany('${company._id}')"
                      >
                        Approve
                      </button>

                      
                      
                  
                </div>
                <div class="company-details" style="display:none">
                <p>Phone: ${company.phone}</p>
                </div>
              </td>
            </tr>`);
        }
      });
    },
    error: function (error) {
      $(".add-company-response").text(error);
    },
  });
}

function approveCompany(companyid) {
  const evaluator = JSON.parse(sessionStorage.getItem("user"));
  console.log(evaluator);
  $.ajax({
    url: "/approve-company",
    type: "POST",
    data: {
      company_id: companyid,
      department: evaluator.department,
    },
    success: function (response) {
      console.log(response);
      $("#pending-company-list").empty();
      $("#approved-company-list").empty();
      $("#rejected-company-list").empty();
      getAllCompanies(true, true, true);
    },
    error: function (error) {
      $(".add-company-response").text(error);
    },
  });
}

function rejectCompany(companyid) {
  const evaluator = JSON.parse(sessionStorage.getItem("user"));
  $.ajax({
    url: "/reject-company",
    type: "POST",
    data: {
      company_id: companyid,
      department: evaluator.department,
    },
    success: function (response) {
      console.log(response);
      $("#pending-company-list").empty();
      $("#approved-company-list").empty();
      $("#rejected-company-list").empty();
      getAllCompanies(true, true, true);
    },
    error: function (error) {
      $(".add-company-response").text(error);
    },
  });
}

function viewCompanyDetails(companyid) {
  $(`#${companyid} .company-details`).toggle();
}

// -------------------- SEARCH BOXES -------------
// Wait for the document to load
document.addEventListener("DOMContentLoaded", function () {
  // Get the search input element
  var searchInput = document.getElementById("pending-searchInput");

  // Add an event listener to the search input
  searchInput.addEventListener("input", function () {
    // Get the search query
    var searchQuery = searchInput.value.toLowerCase();

    // Get all the rows in the table body
    var rows = document.querySelectorAll(".pending-table tbody tr");

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

// Wait for the document to load
document.addEventListener("DOMContentLoaded", function () {
  // Get the search input element
  var searchInput = document.getElementById("rejected-searchInput");

  // Add an event listener to the search input
  searchInput.addEventListener("input", function () {
    // Get the search query
    var searchQuery = searchInput.value.toLowerCase();

    // Get all the rows in the table body
    var rows = document.querySelectorAll(".rejected-table tbody tr");

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

// Wait for the document to load
document.addEventListener("DOMContentLoaded", function () {
  // Get the search input element
  var searchInput = document.getElementById("approved-searchInput");

  // Add an event listener to the search input
  searchInput.addEventListener("input", function () {
    // Get the search query
    var searchQuery = searchInput.value.toLowerCase();

    // Get all the rows in the table body
    var rows = document.querySelectorAll(".approved-table tbody tr");

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
