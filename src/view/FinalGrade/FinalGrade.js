jQuery(document).ready(function () {
    // Retrieve data and populate table1


    // Handle button click event
    $("#switchButton").click(function () {
        // Toggle the visibility of table1 and table2
        $("#studentTable").toggle();
        $("#table2").toggle();

        // Check which table is currently visible and populate the corresponding table
        if ($("#studentTable").is(":visible")) {
            // Table 1 is visible, do nothing
        } else {
            // Table 2 is visible, retrieve data and populate table2
            populateTable2();
        }
    });
    $.ajax({
        url: "/get-all-students",
        type: "POST",
        data: "",
        success: function (response) {
            console.log(response);
            response.students.forEach((student) => {
                var studentID = student.user_id;

                getGrade(studentID).then((gradeInfo) => {
                    var html = "<tr>";
                    html += "<td>" + studentID + "</td>";
                    html += "<td>" + (gradeInfo.companyEvaluationFormAverage || "Not given.") + "</td>";
                    html += "<td>" + (gradeInfo.relatedToDepartment || "Not given.") + "</td>";
                    html += "<td>" + (gradeInfo.supervisorHasEngineeringBackground || "Not given.") + "</td>";
                    html += "<td>" + (gradeInfo.workQuality || "Not given.") + "</td>";
                    html += "<td>" + (gradeInfo.sumOfEvaluationScores || "Not given.") + "</td>";
                    html += "<td>" + (gradeInfo.reportQuality || "Not given.") + "</td>";
                    html += "</tr>";
                    $("#studentTable tbody").append(html);
                }).catch((error) => {
                    console.error(error);
                });
            });
        },
        error: function (error) {
            console.log(error);
        },
    });


    function populateTable2() {
        // Clear existing data in table2
        $("#table2Body").empty();

        // Retrieve data for table2
        $.ajax({
            url: "/get-all-students",
            type: "POST",
            data: "",
            success: function (response) {
                console.log(response);
                response.students.forEach((student) => {
                    var studentID = student.user_id;

                    getGrade(studentID)
                        .then((gradeInfo) => {
                            var passOrFail = decideEndGrade
                            var html = "<tr>";
                            html += "<td>" + studentID + "</td>";
                            html +=
                                "<td>" +
                                (gradeInfo.companyEvaluationFormAverage || "Not given.") +
                                "</td>";
                            html += "</tr>";
                            $("#table2Body").append(html);
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                });
            },
            error: function (error) {
                console.log(error);
            },
        });
    }
});


function getStudent(studentID) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/students/${studentID}`,
            type: "GET",
            success: function (response) {
                var studentInfo = {
                    studentID: response.studentID,
                    courseName: response.courses,
                    studentName: response.fullName,
                    surname: response.surname,
                    mainReportID: response.mainReportID,
                };
                resolve(studentInfo);
            },
            error: function (xhr, status, error) {
                console.error(error);
                reject(error);
            },
        });
    });
}

function getGrade(studentID) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/grades/${studentID}`,
            type: "GET",
            success: function (response) {
                var gradeInfo = {
                    gradingFormSubmissionStatus: response.gradingFormSubmissionStatus,
                    currentFeedbackID: response.currentFeedbackID,
                    revisionRequest: response.revisionRequest,
                    currentFeedbackOverallGrade: response.currentFeedbackOverallGrade,

                    companyEvaluationFormAverage: response.companyEvaluationFormAverage,
                    relatedToDepartment: response.relatedToDepartment,
                    supervisorHasEngineeringBackground:
                        response.supervisorHasEngineeringBackground,

                    finalRevisionDate: response.finalRevisionDate,

                    workQuality: response.workQuality,
                    sumOfEvaluationScores: response.sumOfEvaluationScores,
                    reportQuality: response.reportQuality,

                    taUsername: response.taUsername,
                    evaluatorusername: response.evaluatorusername,
                };
                resolve(gradeInfo);
            },
            error: function (xhr, status, error) {
                console.error(error);
                reject(error);
            },
        });
    });
}