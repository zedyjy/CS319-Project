$(document).ready(function () {
  //Get Current Resume Name
  getFileName();
  getAllUserData();

  // Upload Resume
  $("#upload-resume").on("click", function () {
    const user_id = sessionStorage.getItem("user_id");
    var fileInput = $("#resume-input")[0];
    var file = fileInput.files[0];

    var formData = new FormData();
    formData.append("user_id", user_id);
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
    const user_id = sessionStorage.getItem("user_id");
    console.log(user_id);

    $.ajax({
      url: "/get-file",
      type: "POST",
      data: {
        user_id: user_id,
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
    const user_id = sessionStorage.getItem("user_id");

    $.ajax({
      url: "/student/delete-resume",
      type: "POST",
      data: {
        user_id: user_id,
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
  const user_id = sessionStorage.getItem("user_id");

  $.ajax({
    url: "/student/get-file-name",
    type: "POST",
    data: {
      user_id: user_id,
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

function getAllUserData() {
  const user_id = sessionStorage.getItem("user_id");
  $.ajax({
    url: "/get-user-data",
    type: "POST",
    data: {
      user_id: user_id,
    },
    success: function (response) {
      $(".fullname").val(response.user.user.fullname);
      $(".email").val(response.user.user.email);
    },
    error: function (error) {
      console.error("Error getting user data: ", error);
    },
  });
}

function editProfile() {
  if ($(".edit-profile").hasClass("cancel")) {
    $(".edit-profile").text("Edit Profile");
    $(".edit-profile").removeClass("cancel");
    $(".save-profile").css("display", "none");
    $(".fullname").prop("readonly", true);
    $(".email").prop("readonly", true);
  } else {
    // edit profile mode
    $(".edit-profile").text("Cancel");
    $(".edit-profile").addClass("cancel");
    $(".save-profile").css("display", "block");
    $(".fullname").prop("readonly", false);
    $(".email").prop("readonly", false);
  }
}

function saveProfile() {
  const user_id = sessionStorage.getItem("user_id");
  const fullname = $(".fullname").val();
  const email = $(".email").val();

  $.ajax({
    url: "/update-user",
    type: "POST",
    data: {
      user_id: user_id,
      fullname: fullname,
      email: email,
    },
    success: function (response) {
      $(".save-profile-response").text(response.message);
    },
    error: function (error) {
      $(".save-profile-response").text(error);
      console.error("Error getting user data: ", error);
    },
  });
}
