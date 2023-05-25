$(document).ready(function () {
  //Get Current Resume Name
  getFileName();

  // Upload Resume
  $("#upload-resume").on("click", function () {
    const username = sessionStorage.getItem("username");
    var fileInput = $("#resume-input")[0];
    var file = fileInput.files[0];

    var formData = new FormData();
    formData.append("username", username);
    formData.append("file", file);

    $.ajax({
      url: "/student/upload-file",
      type: "POST",
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
        console.log("File uploaded successfully.");
        location.reload();
        // Handle the response from the server
      },
      error: function (error) {
        console.error("Error uploading file: ", error);
        // Handle the error
      },
    });
  });

  // View Resume
  $("#view-resume").on("click", function () {
    const username = sessionStorage.getItem("username");
    console.log(username);

    $.ajax({
      url: "/student/get-file",
      type: "POST",
      data: {
        username: username,
      },
      success: function (response) {
        console.log(response.fileUrl);

        // Open the file in a new tab using the window.open() method

        // Alternatively, display the file in an iframe or PDF viewer
        $(".modal-body").html(
          `<iframe class="w-100 h-100" src="${response.fileUrl}"></iframe>`
        );
      },
      error: function (error) {
        console.error("Error getting file: ", error);
        // Handle the error
      },
    });
  });

  // Delete Resume
  $("#delete-resume").on("click", function () {
    const username = sessionStorage.getItem("username");

    $.ajax({
      url: "/student/delete-resume",
      type: "POST",
      data: {
        username: username,
      },
      success: function (response) {
        console.log(response.message);
        location.reload();
        // Open the file in a new tab using the window.open() method

        // Alternatively, display the file in an iframe or PDF viewer
        $(".current-resume").html(response.message);
      },
      error: function (error) {
        $(".current-resume").html("File Not Found!");
        console.log("Error getting file: ", error);
        // Handle the error
      },
    });
  });
});

function getFileName() {
  const username = sessionStorage.getItem("username");

  $.ajax({
    url: "/student/get-file-name",
    type: "POST",
    data: {
      username: username,
    },
    success: function (response) {
      if (!response.filename) {
        $(".current-resume").html("File Not Found!");
      }
      $(".current-resume").html(response.filename);
    },
    error: function (error) {
      console.error("Error getting file: ", error);
    },
  });
}
