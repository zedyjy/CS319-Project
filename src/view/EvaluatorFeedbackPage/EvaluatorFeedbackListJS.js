jQuery(document).ready(function () {
  console.log("STUDENT HOME Page JS Loaded");
  for (let i = 0; i < sessionStorage.length; i++) {
    const key = sessionStorage.key(i);
    const value = sessionStorage.getItem(key);
    console.log(key, value);
  }
  const students = JSON.parse(sessionStorage.getItem("students"));
  const studentPromises = students.map((student) => getStudent(student));
  Promise.all(studentPromises)
    .then((studentInfos) => {
      studentInfos.forEach((studentInfo) => {
        const listItem = document.createElement("li");
        listItem.textContent = studentInfo.name;
        $(".students").append(listItem);
      });
    })
    .catch((error) => {
      console.error(error);
    });
});

function getStudent(studentID) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `/students/${studentID}`,
      type: "GET",
      success: function (response) {
        var studentInfo = {
          name: response.user_id,
          studentID: response.studentId,
        };
        console.log(studentInfo);
        resolve(studentInfo);
      },
      error: function (xhr, status, error) {
        console.error(error);
        reject(error);
      },
    });
  });
}
