function getStudentData(reportid) {
  console.log("reportid: ", reportid);
  $.ajax({
    url: "/student-details-with-report-id",
    type: "POST",
    data: {
      report_id: reportid,
    },
    success: function (response) {
      if (response.student.companyWorkFormFile || !response.student) {
        $(".student-name").text("This link does not exist");
        $(".upload-data").css("display", "none");
      } else {
        $(".student-name").text(
          "Uploading work report for: " + response.student.user_id
        );

        $(".upload-data").css("display", "block");
        showUploadButton(response.student.user_id);
      }
    },
    error: function (error) {
      $(".student-name").text("This link does not exist");
      //$(".upload-data").css("display", "none"); // uncomment laterrrr !!!!!!!!!!!!!!
      console.error("Error getting file: ", error);
      // Handle the error
    },
  });
}

function showUploadButton(student_id) {
  $(".upload-data").append(
    `
    <button class="btn btn-primary ml-5" onclick="uploadWorkReportFile('${student_id}')">
            Upload
    </button>
    `
  );
}

function uploadWorkReportFile(student_id) {
  showLoadingAnimation();
  var workReportFile = $("#work-report-file-input")[0].files[0];
  var student_id = student_id;
  var companyEvaluationFormAverage = $("#companyEvaluationFormAverage").val();
  var relatedToDepartment = $("#relatedToDepartment").val();
  var supervisorHasEngineeringBackground = $(
    "#supervisorHasEngineeringBackground"
  ).val();

  var formData = new FormData();
  formData.append("student_id", student_id);
  formData.append("companyEvaluationFormAverage", companyEvaluationFormAverage);
  formData.append("relatedToDepartment", relatedToDepartment);
  formData.append(
    "supervisorHasEngineeringBackground",
    supervisorHasEngineeringBackground
  );
  formData.append("file", workReportFile);

  // Send the AJAX request
  $.ajax({
    url: "/upload-company-work-report",
    type: "POST",
    data: formData,
    processData: false,
    contentType: false,
    success: function (response) {
      $(".upload-response").text(response.message);
      location.reload();
      hideLoadingAnimation();
    },
    error: function (error) {
      hideLoadingAnimation();
      // Handle the error response here
      $(".upload-response").text(error.responseJSON.message);
      console.log(error);
    },
  });
}
