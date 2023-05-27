jQuery(document).ready(function () {
    console.log("STUDENT GRADES Page JS Loaded");
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        console.log(key, value);
    }
    const studentID = sessionStorage.getItem("user_id");
    getGrade(studentID).then((grade) => {
        console.log(grade);
        // No Grades, Feedback, Final, Revision, Unchangable
        if (grade.gradingFormSubmissionStatus === "No Grades") {
            var listItem = document.createElement("li");
            listItem.textContent = "No grades to show yet.";
            $(".grades").append(listItem);
        }
        else if (grade.gradingFormSubmissionStatus === "Feedback") {
            var listItem = document.createElement("li");
            listItem.textContent = "You are in the feedback stage.";
            $(".grades").append(listItem);

            if (grade.currentFeedbackOverallGrade == null) {
                listItem = document.createElement("li");
                listItem.textContent = 'You did not receive a feedback grade yet.';
                $(".grades").append(listItem);
            }
            else {
                listItem = document.createElement("li");
                console.log("asfgaasfsa");
                listItem.textContent = "Your current feedback grade is " + grade.currentFeedbackOverallGrade + ".";
                $(".grades").append(listItem);
            }
        }
        else if (grade.gradingFormSubmissionStatus === "Final") {
            var listItem = document.createElement("li");
            listItem.textContent = "You are in the final grade stage.";
            $(".grades").append(listItem);

            listItem = document.createElement("li");
            listItem.textContent = "Your work quality grade: " + grade.workQuality + ".";
            $(".grades").append(listItem);

            listItem = document.createElement("li");
            listItem.textContent = "Your sum of evaluation scores grade: " + grade.sumOfEvaluationScores + ".";
            $(".grades").append(listItem);

            listItem = document.createElement("li");
            listItem.textContent = "Your report quality grade: " + grade.reportQuality + ".";
            $(".grades").append(listItem);

            listItem = document.createElement("li");
            listItem.textContent = "You are eligible for revision.";
            $(".grades").append(listItem);

            const button = document.createElement("button");
            button.textContent = "Ask for Revision";

            // Append the button to the desired element
            $(".grades").append(button);

            // Attach event listener to the button
            button.addEventListener("click", function () {
                changeGradingStatusToRevision(studentID);
                location.reload(); // Reload the page
            });
        }
        else if (grade.gradingFormSubmissionStatus === "Revision") {
            var listItem = document.createElement("li");
            listItem.textContent = "You are in the revision stage.";
            $(".grades").append(listItem);

            listItem = document.createElement("li");
            listItem.textContent = "Your work quality grade: " + grade.workQuality + ".";
            $(".grades").append(listItem);

            listItem = document.createElement("li");
            listItem.textContent = "Your sum of evaluation scores grade: " + grade.sumOfEvaluationScores + ".";
            $(".grades").append(listItem);

            listItem = document.createElement("li");
            listItem.textContent = "Your report quality grade: " + grade.reportQuality + ".";
            $(".grades").append(listItem);

            listItem = document.createElement("li");
            listItem.textContent = "You already asked for revision, you are not eligible for revision.";
            $(".grades").append(listItem);
        }
        else if (grade.gradingFormSubmissionStatus === "Unchangable") {

            var listItem = document.createElement("li");
            listItem.textContent = "You are in the end stage, your grade cannot be changed anymore.";
            $(".grades").append(listItem);

            listItem = document.createElement("li");
            listItem.textContent = "Your work quality grade: " + grade.workQuality + ".";
            $(".grades").append(listItem);

            listItem = document.createElement("li");
            listItem.textContent = "Your sum of evaluation scores grade: " + grade.sumOfEvaluationScores + ".";
            $(".grades").append(listItem);

            listItem = document.createElement("li");
            listItem.textContent = "Your report quality grade: " + grade.reportQuality + ".";
            $(".grades").append(listItem);

            listItem = document.createElement("li");
            listItem.textContent = "You are not eligible for revision.";
            $(".grades").append(listItem);
        }

        if (grade.companyEvaluationFormAverage === "Company grade not processed.") {
            var secondaryListItem = document.createElement("li");
            secondaryListItem.textContent = "No company grades to show yet.";
            $(".company-grades").append(secondaryListItem);
        }
        else {
            var secondaryListItem = document.createElement("li");
            secondaryListItem.textContent = "Your company evaluation form average grade: " + grade.companyEvaluationFormAverage + ".";
            $(".company-grades").append(secondaryListItem);

            if (grade.supervisorHasEngineeringBackground) {
                secondaryListItem = document.createElement("li");
                secondaryListItem.textContent = "Your supervisor is an engineer related to your department.";
                $(".company-grades").append(secondaryListItem);
            }
            else {
                secondaryListItem = document.createElement("li");
                secondaryListItem.textContent = "Your supervisor is not an engineer related to your department.";
                $(".company-grades").append(secondaryListItem);
            }
        }

    })
});


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
                    supervisorHasEngineeringBackground: response.supervisorHasEngineeringBackground,

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