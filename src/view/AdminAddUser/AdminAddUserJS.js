const userTypeRadios = document.querySelectorAll('input[name="userType"]');

// ------SEND EMAILS TO USERS------

function sendUserEmail(user_id, password, email) {
  //ADD YOUR CODE HERE
  alert("Email sent to user with the password: " + password);
}

// ------SEND EMAILS TO USERS END------

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
      $(".delete-user-response").text(response.message);
    },
    error: function (error) {
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

// Add New User
function addUser() {
  const generatedPassword = generateRandomPassword(8);
  const checkedRadio = document.querySelector('input[name="userType"]:checked');
  if (checkedRadio) {
    const userType = checkedRadio.value;
    if (userType === "student") {
      studentRegister(generatedPassword);
      console.log("student add");
    } else if (userType === "evaluator") {
      evaluatorRegister(generatedPassword);
      console.log("evaluator add");
    } else if (userType === "ta") {
      taRegister(generatedPassword);
      console.log("evaluator add");
    } else if (userType === "admin") {
      adminRegister(generatedPassword);
      console.log("admin add");
    } else if (userType === "coordinator") {
      coordinatorRegister(generatedPassword);
      console.log("coordinator add");
    }
  }
}

function studentRegister(password) {
  // Retrieve the values from the form fields
  var userid = $("#userId").val().trim();
  var email = $("#userEmail").val();
  var fullname = $("#userFullname").val();

  // Send the AJAX request
  $.ajax({
    url: "/register/student",
    type: "POST",
    data: {
      user_id: userid, //DATA as object-value pair here
      password: password,
      email: email,
      fullname: fullname,
    },
    success: function (response) {
      console.log(response);
      if (response.status == 200) {
        // Handle the success response here
        $(".add-user-response").text(response.message);
        sendUserEmail(userid, password, email);
      } else {
        // Handle other status codes or errors here
        $(".add-user-response").text(response.message);
      }
    },
    error: function (error) {
      // Handle the error response here
      $(".add-user-response").text(error.responseJSON.message);
    },
  });
}

// Evaluator Register Form
function evaluatorRegister(password) {
  // Retrieve the values from the form fields
  var userid = $("#userId").val().trim();
  var email = $("#userEmail").val();
  var fullname = $("#userFullname").val();

  // Send the AJAX request
  $.ajax({
    url: "/register/evaluator",
    type: "POST",
    data: {
      user_id: userid, //DATA as object-value pair here
      password: password,
      email: email,
      fullname: fullname,
    },
    success: function (response) {
      console.log(response);
      if (response.status == 200) {
        // Handle the success response here
        $(".add-user-response").text(response.message);
        sendUserEmail(userid, password, email);
      } else {
        // Handle other status codes or errors here
        $(".add-user-response").text(response.message);
      }
    },
    error: function (error) {
      // Handle the error response here
      $(".add-user-response").text(error.responseJSON.message);
    },
  });
}

// TA Register Form
function taRegister(password) {
  // Retrieve the values from the form fields
  var userid = $("#userId").val().trim();
  var email = $("#userEmail").val();
  var fullname = $("#userFullname").val();

  // Send the AJAX request
  $.ajax({
    url: "/register/ta",
    type: "POST",
    data: {
      user_id: userid, //DATA as object-value pair here
      password: password,
      email: email,
      fullname: fullname,
    },
    success: function (response) {
      console.log(response);
      if (response.status == 200) {
        // Handle the success response here
        $(".add-user-response").text(response.message);
        sendUserEmail(userid, password, email);
      } else {
        // Handle other status codes or errors here
        $(".add-user-response").text(response.message);
      }
    },
    error: function (error) {
      // Handle the error response here
      $(".add-user-response").text(error.responseJSON.message);
    },
  });
}

// Coordinator Register Form
function coordinatorRegister(password) {
  // Retrieve the values from the form fields
  var userid = $("#userId").val().trim();
  var email = $("#userEmail").val();
  var fullname = $("#userFullname").val();

  // Send the AJAX request
  $.ajax({
    url: "/register/coordinator",
    type: "POST",
    data: {
      user_id: userid, //DATA as object-value pair here
      password: password,
      email: email,
      fullname: fullname,
    },
    success: function (response) {
      console.log(response);
      if (response.status == 200) {
        // Handle the success response here
        $(".add-user-response").text(response.message);
        sendUserEmail(userid, password, email);
      } else {
        // Handle other status codes or errors here
        $(".add-user-response").text(response.message);
      }
    },
    error: function (error) {
      // Handle the error response here
      $(".add-user-response").text(error.responseJSON.message);
    },
  });
}

// Admin Register Form
function adminRegister(password) {
  // Retrieve the values from the form fields
  var adminId = $("#userId").val().trim();
  var adminPassword = password;

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
