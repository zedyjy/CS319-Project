jQuery(document).ready(function () {
    // Retrieve data and populate table1
    $.ajax({
        url: "/get-all-students",
        type: "POST",
        data: "",
        success: function (response) {
            var departmentCounts = {}; // Object to store department counts
            var grades = [];
            var sumOfGrades = [];
            console.log(response);

            var statusCounts = {
                "No Grades": 0,
                "Feedback": 0,
                "Final": 0,
                "Revision": 0,
                "Unchangable": 0
            };

            var spromises = response.students.map((student) => {
                var studentID = student.user_id;
                var department = student.department;
                console.log(department);
                if (department) {
                    // Increment the count for the department
                    if (department in departmentCounts) {
                        departmentCounts[department]++;
                    } else {
                        departmentCounts[department] = 1;
                    }
                }


                // Return a resolved promise
                return Promise.resolve();
            });

            var promises = response.students.map((student) => {
                var studentID = student.user_id;

                return getGrade(studentID).then((gradeInfo) => {
                    var status = gradeInfo.gradingFormSubmissionStatus;
                    var averageGrade = gradeInfo.companyEvaluationFormAverage;
                    var curGrade = gradeInfo.sumOfEvaluationScores;
                    sumOfGrades.push(curGrade);
                    grades.push(averageGrade);
                    statusCounts[status]++;
                }).catch((error) => {
                    console.error(error);
                });
            });

            // Wait for all promises to resolve
            Promise.all(promises).then(() => {
                // Create histogram
                createHistogram(statusCounts);
                createLineGraph(grades);
                createLineGraph2(sumOfGrades);
            }).catch((error) => {
                console.error(error);
            });

            // Wait for all spromises to resolve
            Promise.all(spromises).then(() => {
                // Create pie chart
                createPieChart(departmentCounts);
            }).catch((error) => {
                console.error(error);
            });
        },
        error: function (error) {
            console.log(error);
        },
    });
});

// Rest of the code remains the same



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

function createHistogram(statusCounts) {
    // Convert statusCounts object to an array of [status, count] pairs
    // Get the status labels and counts in the original order
    var labels = Object.keys(statusCounts);
    var counts = Object.values(statusCounts);

    // Create the histogram using a chart library of your choice (e.g., Chart.js)
    // Here's an example using Chart.js
    var ctx = document.getElementById("histogram").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Student Count",
                data: counts,
                backgroundColor: "rgba(0, 123, 255, 0.5)",
                borderColor: "rgba(0, 123, 255, 1)",
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Student Stages (Final = given a non-feedback grade)",
                    padding: {
                        top: 10
                    },
                    font: {
                        size: 18 // Adjust the size as needed
                    },
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    stepSize: 1
                }
            }
        }
    });
}



function createPieChart(departmentCounts) {
    // Convert department counts to chart data format
    console.log(departmentCounts);
    var chartData = {
        labels: Object.keys(departmentCounts),
        datasets: [{
            data: Object.values(departmentCounts),
            backgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                // Add more colors if needed
            ],
            hoverBackgroundColor: [
                '#FF6384',
                '#36A2EB',
                '#FFCE56',
                // Add more colors if needed
            ]
        }]
    };

    // Create the pie chart
    var ctx = document.getElementById("pieChart").getContext("2d");
    new Chart(ctx, {
        type: 'pie',
        data: chartData,
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Students by Departments",
                    padding: {
                        top: 10
                    },
                    font: {
                        size: 18 // Adjust the size as needed
                    },
                }
            },
        }
    });
}

function createLineGraph(grades) {
    var labels = Array.from({ length: grades.length }, (_, i) => i + 1); // Generate labels as 1, 2, 3, ...

    var ctx = document.getElementById("lineGraph").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Company Evaluation Form Average",
                data: grades,
                fill: false,
                borderColor: "rgba(0, 123, 255, 1)",
                borderWidth: 2
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Company Evaluation Form Average Grades",
                    padding: {
                        top: 10
                    },
                    font: {
                        size: 18 // Adjust the size as needed
                    },
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Grade"
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "Student"
                    }
                }
            }
        }
    });
}

function createLineGraph2(grades) {
    var labels = Array.from({ length: grades.length }, (_, i) => i + 1); // Generate labels as 1, 2, 3, ...

    var ctx = document.getElementById("lineGraph2").getContext("2d");
    new Chart(ctx, {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Sum",
                data: grades,
                fill: false,
                borderColor: "rgba(0, 123, 255, 1)",
                borderWidth: 2
            }]
        },
        options: {
            plugins: {
                title: {
                    display: true,
                    text: "Sum of Evaluation Scores",
                    padding: {
                        top: 10
                    },
                    font: {
                        size: 18 // Adjust the size as needed
                    },
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Grade"
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: "Student"
                    }
                }
            }
        }
    });
}