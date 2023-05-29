$(document).ready(function () {
  getAnnouncements();
});
function addAnnouncement() {
  console.debug("lolo");

  var announcement_message = $("#announcement-message").val();

  $.ajax({
    url: "/add-announcement",
    type: "POST",
    data: {
      announcement_message: announcement_message,
    },
    success: function (response) {
      $(".add-notification-response").text(response.message);
    },
    error: function (error) {
      $(".add-notification-response").text(error);
    },
  });
}
function getAnnouncements() {
  $.ajax({
    url: "/get-all-announcement",
    type: "POST",
    data: "",
    success: function (response) {
      console.log(response);
      response.announcements.forEach((announcement) => {
        return $("#announcement-list").append(`
            <tr scope="row" id="${announcement._id}">
              <td>${announcement.message}</td>
            </tr>
          `);
      });
    },
    error: function (error) {
      console.log(error);
    },
  });
}
