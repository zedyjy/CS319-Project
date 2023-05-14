<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Student Page</title>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <style>
    <?php include "./StyleStudentHome.css" ?>
    </style>
</head>
<body>
<h1>STUDENT PAGE</h1>
	<p>Today's date is <?php echo date("Y-m-d"); ?></p>
    <h1>TESTING API EXAMPLE</h1>
    <p>Write the student username</p>
    <input placeholder="Username Here" id="username-input" />
    <button id="add-user-button">Click here to add a user to the database with given username above. pay note to the script being used to send the API request</button>
    <p class="result"></p>

    <p style="margin-top:50px;">Delete a user using their username, match this result from the value in your mongodb datbase. (Download MongoDB Atlas for easier GUI for mongodb)</p>
    <input placeholder="Username to delete Here" id="username-todelete-input" />
    <button id="deleete-user-button">Click here to DELETE a user to the database with given username above. pay note to the script being used to send the API request</button>
    <p class="result2"></p>
    <a href="/"> GOto Home </a>
</body>
<script>

$(document).ready(function() {

  $("#add-user-button").click(function() {
    // Your code to handle the button click event goes here
    console.log("Button clicked!");
    let username_input = $("#username-input").val();

    $.ajax({// from jquery, $ = jQuery
  url: "/register/user", //API ENPOINT HERE
  method: "POST",
  data: {
    username: username_input //DATA as object-value pair here
  },
  success: function(response) {
    console.log(response);
    $(".result").text("User Successfully Registered!"); //do stuff with success result
  },
  error: function(xhr, status, error) {
    console.log(error);
    $(".result").text("Error registering user: " + error + " or User Already Exists"); //show error message on fail
  }
});

  });


  $("#deleete-user-button").click(function() {
    // Your code to handle the button click event goes here
    console.log("Button to delete clicked!");
    let username_input2 = $("#username-todelete-input").val();

    $.ajax({// from jquery, $ = jQuery
  url: "/delete/user", //API ENPOINT HERE
  method: "POST",
  data: {
    username: username_input2 //DATA as object-value pair here
  },
  success: function(response) {
    console.log(response);
    $(".result2").text("User Successfully Deleted!"); //do stuff with success result
  },
  error: function(xhr, status, error) {
    console.log(error);
    $(".result2").text("Error deleting user: " + error + " or User Does not Exist"); //show error message on fail
  }
});

  });

});

</script>
</html>