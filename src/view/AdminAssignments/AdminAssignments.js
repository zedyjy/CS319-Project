$(document).ready(function () {
  getAllStudents();
  getAllEvaluators();
});

function showOverlay(id) {
  var overlay = $(`.overlay.${id}`);
  overlay.css("display", "block");
}

function showOverlayDeAssign(id) {
  var overlay = $(`.overlay-deassign.${id}`);
  overlay.css("display", "block");
}

function closeOverlay(id) {
  var overlay = $(`.overlay.${id}`);
  overlay.toggle();
}

function closeOverlayDeAssign(id) {
  var overlay = $(`.overlay-deassign.${id}`);
  overlay.toggle();
}

function assignEvaluatorTA(studentid, studentObjectId) {
  var overlayInput = $(`#assign-evaluator-ta-${studentObjectId}`).val();
  var responsePara = $(`p.${studentObjectId}`);

  $.ajax({
    url: "/assign-student",
    type: "POST",
    data: {
      user_id: overlayInput,
      student_id: studentid,
    },
    success: function (response) {
      console.log(response);
      responsePara.text(response.message);
      getAllStudents();
      getAllEvaluators();
    },
    error: function (error) {
      responsePara.text(error.responseJSON.message);
      console.log(error);
    },
  });
}

function deassignEvaluatorTA(studentid, studentObjectId) {
  var overlayInput = $(`#deassign-evaluator-ta-${studentObjectId}`).val();
  var responsePara = $(`p.deassign${studentObjectId}`);

  $.ajax({
    url: "/remove-assigned-student",
    type: "POST",
    data: {
      user_id: overlayInput,
      student_id: studentid,
    },
    success: function (response) {
      console.log(response);
      responsePara.text(response.message);
      getAllStudents();
      getAllEvaluators();
    },
    error: function (error) {
      responsePara.text(error.responseJSON.message);
      console.log(error);
    },
  });
}

// --------------------------------
// ------- Student -------
// --------------------------------

// ------- Student Search Box -------
// Wait for the document to load
document.addEventListener("DOMContentLoaded", function () {
  // Get the search input element
  var searchInput = document.getElementById("student-searchInput");

  // Add an event listener to the search input
  searchInput.addEventListener("input", function () {
    // Get the search query
    var searchQuery = searchInput.value.toLowerCase();

    // Get all the rows in the table body
    var rows = document.querySelectorAll(".student-table tbody tr");

    // Iterate through the rows
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var studentName = row.cells[0].textContent.toLowerCase();
      var studentId = row.cells[1].textContent.toLowerCase();

      // Show or hide the row based on the search input
      if (
        studentId.includes(searchQuery) ||
        studentName.includes(searchQuery)
      ) {
        row.style.display = ""; // Show the row
      } else {
        row.style.display = "none"; // Hide the row
      }
    }
  });
});

// ------- Student Table -------
function getAllStudents() {
  $.ajax({
    url: "/get-all-students",
    type: "POST",
    data: "",
    success: function (response) {
      $("#student-list").empty();
      console.log(response);
      response.students.forEach((student) => {
        return $("#student-list").append(`
              <tr scope="row" id="${student._id}">
                <td >${student.name}</td>
                <td>${student.user_id}</td>
                <td>
                ${student.assignedEvaluators
                  .map((evaluator) => {
                    console.log(evaluator);
                    return evaluator;
                  })
                  .join(", ")}
                </td>
                <td>
                ${student.assignedTAs
                  .map((ta) => {
                    console.log(ta);
                    return ta;
                  })
                  .join(", ")}
                </td>
                <td>
                <button class="btn btn-primary"  onclick="showOverlay('${
                  student._id
                }')">Assign Evaluator/TA</button>
                <div class="overlay ${student._id}">
                  <button class="btn btn-danger" onclick="closeOverlay('${
                    student._id
                  }')">Close</button>
                  <div>
                  <h3>Assign Evaluator/TA</h3>
                  <p>Student: ${student.user_id}</p>
                  <input
                  type="text"
                  id="assign-evaluator-ta-${student._id}"
                  placeholder="Evaluator/TA ID"
                  />
                  <button class="btn btn-primary" onclick="assignEvaluatorTA('${
                    student.user_id
                  }', '${student._id}')">Assign </button>
                  <p class="${student._id}"></p>
                  </div>
                </div>

                <button class="btn btn-danger"  onclick="showOverlayDeAssign('${
                  student._id
                }')">De Assign Evaluator/TA</button>
                    <div class="overlay-deassign ${student._id}">
                      <button class="btn btn-danger" onclick="closeOverlayDeAssign('${
                        student._id
                      }')">Close</button>
                      <div>
                      <h3>De Assign Evaluator/TA</h3>
                      <p>Student: ${student.user_id}</p>
                      <input
                      type="text"
                      id="deassign-evaluator-ta-${student._id}"
                      placeholder="Evaluator/TA ID"
                      />
                      <button class="btn btn-danger" onclick="deassignEvaluatorTA('${
                        student.user_id
                      }', '${student._id}')">De Assign </button>
                      <p class="deassign${student._id}"></p>
                      </div>
                    </div>
                
                </td>
                
              </tr>`);
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}

// --------------------------------
// ------- Evaluator -------
// --------------------------------
// Wait for the document to load
document.addEventListener("DOMContentLoaded", function () {
  // Get the search input element
  var searchInput = document.getElementById("evaluator-searchInput");

  // Add an event listener to the search input
  searchInput.addEventListener("input", function () {
    // Get the search query
    var searchQuery = searchInput.value.toLowerCase();

    // Get all the rows in the table body
    var rows = document.querySelectorAll(".evaluator-table tbody tr");

    // Iterate through the rows
    for (var i = 0; i < rows.length; i++) {
      var row = rows[i];
      var studentName = row.cells[0].textContent.toLowerCase();
      var studentId = row.cells[1].textContent.toLowerCase();

      // Show or hide the row based on the search input
      if (
        studentId.includes(searchQuery) ||
        studentName.includes(searchQuery)
      ) {
        row.style.display = ""; // Show the row
      } else {
        row.style.display = "none"; // Hide the row
      }
    }
  });
});

function getAllEvaluators() {
  $.ajax({
    url: "/get-all-evaluators",
    type: "POST",
    data: "",
    success: function (response) {
      $("#evaluators-list").empty();
      console.log(response);
      response.evaluators.forEach((evaluator) => {
        return $("#evaluators-list").append(`
              <tr scope="row" id="${evaluator._id}">
                <td>${evaluator.name}</td>
                <td>${evaluator.user_id}</td>
                <td>
                ${evaluator.students
                  .map((student) => {
                    console.log(student);
                    return student;
                  })
                  .join(", ")}
                </td>
                
              </tr>`);
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}
