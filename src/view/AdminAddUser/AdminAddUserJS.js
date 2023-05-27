const userTypeRadios = document.querySelectorAll('input[name="userType"]');

function sendUserEmail() {
  // Retrieve the user's email and password
  var email = "<user_email>"; // Replace with the actual user's email
  var password = generateRandomPassword();

  // Send an email with the password to the user
  // Implement your email sending logic here

  // Display a success message to the admin
  alert("Email sent to user with the password: " + password);
}

$(document).ready(function () {
  console.log("Add User Loaded");

  // Add click event listener to the button with class "btn btn-primary"
  $(".btn.btn-primary").click(function () {
    const checkedRadio = document.querySelector(
      'input[name="userType"]:checked'
    );
    if (checkedRadio) {
      const userType = checkedRadio.value;
      if (userType === "student") {
        studentRegister();
        console.log("student add");
      } else if (userType === "evaluator") {
        evaluatorRegister();
        console.log("evaluator add");
      } else if (userType === "admin") {
        adminRegister();
        console.log("admin add");
      }
    }
  });

  $(".btn delete-user").click(function () {
    console.log("Delete User Loaded");

    const checkedRadio = document.querySelector(
      'input[name="userType"]:checked'
    );
    deleteUser();
  });
});

$(document).ready(function () {
  $(".delete-user").click(function () {
    const checkedRadio = document.querySelector(
      'input[name="userType"]:checked'
    );
    deleteUser();
  });
});

function deleteUser() {
  // Retrieve the values from the form fields
  var user_id = $("#userId-delete").val();

  // Send the AJAX request
  $.ajax({
    url: "/delete",
    type: "POST",
    data: {
      user_id: user_id, //DATA as object-value pair here
    },
    success: function (response) {
      console.log(response);
      if (response.status == 200) {
        // Handle the success response here
        console.log("Delete successful");
        console.log(response.message);
        $(".delete-user-response").text("Successfully Registered!");
      } else {
        // Handle other status codes or errors here
        console.log("Deletion failed with status code:", response.status);
        $(".delete-user-response").text(response.message);
      }
    },
    error: function (error) {
      // Handle the error response here
      console.log("register failed");
      console.log(error.responseJSON.message);
      $(".delete-user-response").text(error.responseJSON.message);
    },
  });
}

function generateRandomPassword(length) {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-=_+";
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }

  return password;
}

// Example usage: Generate a random password with a length of 8 characters

function studentRegister() {
  event.preventDefault(); // Prevent the form from submitting normally

  const randomPassword = generateRandomPassword(8);

  // Retrieve the values from the form fields
  var student_id = $("#userId").val();
  var password = randomPassword;

  // Send the AJAX request
  $.ajax({
    url: "/register/student",
    type: "POST",
    data: {
      user_id: student_id, //DATA as object-value pair here
      password: password,
    },
    success: function (response) {
      console.log(response);
      if (response.status == 200) {
        // Handle the success response here
        console.log("Register successful");
        console.log(response.message);
        $(".add-user-response").text("Successfully Registered!");
      } else {
        // Handle other status codes or errors here
        console.log("Register failed with status code:", response.status);
        $(".add-user-response").text(response.message);
      }
    },
    error: function (error) {
      // Handle the error response here
      console.log("register failed");
      console.log(error.responseJSON.message);
      $(".add-user-response").text(error.responseJSON.message);
    },
  });
}

//--------------------------
// Evaluator Forms
//--------------------------
// Evaluator Register Form
function evaluatorRegister() {
  const randomPassword = generateRandomPassword(8);

  event.preventDefault(); // Prevent the form from submitting normally

  // Retrieve the values from the form fields
  var studentid = $("#userId").val();
  var password = randomPassword;

  // Send the AJAX request
  $.ajax({
    url: "/register/evaluator",
    type: "POST",
    data: {
      user_id: studentid, //DATA as object-value pair here
      password: password,
    },
    success: function (response) {
      console.log(response);
      if (response.status == 200) {
        // Handle the success response here
        console.log("Register successful");
        console.log(response.message);
        $(".add-user-response").text("Successfully Registered!");
      } else {
        // Handle other status codes or errors here
        console.log("Register failed with status code:", response.status);
        $(".add-user-response").text(response.message);
      }
    },
    error: function (error) {
      // Handle the error response here
      console.log("register failed");
      console.log(error.responseJSON.message);
      $(".add-user-response").text(error.responseJSON.message);
    },
  });
}

//--------------------------
// Admin Forms
//--------------------------
// Admin Register Form
function adminRegister() {
  const randomPassword = generateRandomPassword(8);

  event.preventDefault(); // Prevent the form from submitting normally

  // Retrieve the values from the form fields
  var adminId = $("#userId").val();
  var adminPassword = randomPassword;

  // Create an object to hold the request data
  var requestData = {
    username: adminId,
    password: adminPassword,
  };

  // Send the AJAX request
  $.ajax({
    url: "/admin-register",
    type: "POST",
    data: JSON.stringify(requestData), // Convert the request data to JSON string
    contentType: "application/json", // Set the content type to JSON
    success: function (response) {
      console.log(response);
      if (response.status == 200) {
        // Handle the success response here
        console.log("Register successful");
        console.log(response.message);
        $(".add-user-response").text("Successfully Registered!");
      } else {
        // Handle other status codes or errors here
        console.log("Register failed with status code:", response.status);
        $(".add-user-response").text(response.message);
      }
    },
    error: function (error) {
      // Handle the error response here
      console.log("register failed");
      console.log(error.responseJSON.message);
      $(".add-user-response").text(error.responseJSON.message);
    },
  });
}
