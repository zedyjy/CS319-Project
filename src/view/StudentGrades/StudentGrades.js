jQuery(document).ready(function () {
    console.log("STUDENT GRADES Page JS Loaded");

    // Retrieve the user ID from session storage
    const studentID = sessionStorage.getItem("user_id");

    // Call the getGrade function to fetch the grade information
    getGrade(studentID).then((grade) => {
        console.log(grade);

        // Display grades based on grading form submission status
        switch (grade.gradingFormSubmissionStatus) {
            case "No Grades":
                $(".grades").append("<li>No grades to show yet.</li>");
                break;
            case "Feedback":
                $(".grades").append("<li>You are in the feedback stage.</li>");

                if (grade.currentFeedbackOverallGrade == null) {
                    $(".grades").append("<li>You did not receive a feedback grade yet.</li>");
                } else {
                    $(".grades").append(`<li>Your current feedback grade is ${grade.currentFeedbackOverallGrade}.</li>`);
                }
                break;
            case "Final":
                $(".grades").append("<li>You are in the final grade stage.</li>");
                $(".grades").append(`<li>Your work quality grade: ${grade.workQuality}.</li>`);
                $(".grades").append(`<li>Your sum of evaluation scores grade: ${grade.sumOfEvaluationScores}.</li>`);
                $(".grades").append(`<li>Your report quality grade: ${grade.reportQuality}.</li>`);
                $(".grades").append("<li>You are eligible for revision.</li>");

                const button = document.createElement("button");
                button.textContent = "Ask for Revision";
                $(".grades").append(button);

                // Attach event listener to the button
                button.addEventListener("click", function () {
                    changeGradingStatusToRevision(studentID);
                    location.reload(); // Reload the page
                });
                break;
            case "Revision":
                $(".grades").append("<li>You are in the revision stage.</li>");
                $(".grades").append(`<li>Your work quality grade: ${grade.workQuality}.</li>`);
                $(".grades").append(`<li>Your sum of evaluation scores grade: ${grade.sumOfEvaluationScores}.</li>`);
                $(".grades").append(`<li>Your report quality grade: ${grade.reportQuality}.</li>`);
                $(".grades").append("<li>You already asked for revision, you are not eligible for revision.</li>");
                break;
            case "Unchangable":
                $(".grades").append("<li>You are in the end stage, your grade cannot be changed anymore.</li>");
                $(".grades").append(`<li>Your work quality grade: ${grade.workQuality}.</li>`);
                $(".grades").append(`<li>Your sum of evaluation scores grade: ${grade.sumOfEvaluationScores}.</li>`);
                $(".grades").append(`<li>Your report quality grade: ${grade.reportQuality}.</li>`);
                $(".grades").append("<li>You are not eligible for revision.</li>");
                break;
            default:
                break;
        }

        // Display company grades and related information
        if (grade.companyEvaluationFormAverage === "Company grade not processed.") {
            $(".company-grades").append("<li>No company grades to show yet.</li>");
        } else {
            $(".company-grades").append(`<li>Your company evaluation form average grade: ${grade.companyEvaluationFormAverage}.</li>`);

            if (grade.supervisorHasEngineeringBackground) {
                $(".company-grades").append("<li>Your supervisor is an engineer related to your department.</li>");
            } else {
                $(".company-grades").append("<li>Your supervisor is not an engineer related to your department.</li>");
            }
        }
    });
});


function getGrade(studentID) {
    return new Promise((resolve, reject) => {
        $.ajax({
            url: `/grades/${studentID}`,
            type: "GET",
            success: function (response) {
                resolve(response);
            },
            error: function (xhr, status, error) {
                console.error(error);
                reject(error);
            },
        });
    });
}


function changeGradingStatusToRevision(studentID) {
    // Send the AJAX request
    $.ajax({
        url: "/change-to-revision",
        type: "POST",
        data: {
            studentID: studentID,
        },
        success: function (response) {
            if (response.status == 200) {
                $(".change-to-revision-response").text(response.message);
                location.reload();
            } else {
                // Handle other status codes or errors here
                $(".change-to-revision-response").text(response.message);
            }
        },
        error: function (error) {
            // Handle the error response here
            $(".change-to-revision-response").text(error.responseJSON.message);
            console.log(error);
        },
    });
}
