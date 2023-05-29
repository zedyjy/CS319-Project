$(document).ready(function () {
    for (let i = 0; i < sessionStorage.length; i++) {
        const key = sessionStorage.key(i);
        const value = sessionStorage.getItem(key);
        console.log(key, value);
    }
    const relatedUserID = sessionStorage.getItem("user_id");
    // Function to fetch and display notifications
    function fetchNotifications() {
        $.ajax({
            url: '/get-notifications',
            method: 'POST',
            data: { relatedUserID: relatedUserID },
            success: function (response) {

                $('.notification-list').empty();

                // Check if there are notifications
                if (response.length === 0) {
                    // Show the "no notifications" message
                    var message = $('<h2>').text("No notifications to show.");
                    $('.notification-list').append(message);
                } else {
                    // Iterate over the received notifications and add them to the page
                    response.forEach(function (notification) {
                        var date = notification.date;
                        var message = notification.message;

                        var dateString = date;

                        var lastReportDateF = new Date(dateString);
                        var formattedDate = `${lastReportDateF.getFullYear()}-${(lastReportDateF.getMonth() + 1)
                            .toString()
                            .padStart(2, "0")}-${lastReportDateF
                                .getDate()
                                .toString()
                                .padStart(2, "0")}`;


                        // Create HTML elements for the notification
                        var notificationTitle = $('<h2>').text(formattedDate);
                        var notificationContent = $('<p>').text(message);
                        var deleteButton = $('<button>').text('Remove').addClass('delete-btn');
                        var notificationDiv = $('<div>').addClass('notification').append(notificationTitle, notificationContent, deleteButton);

                        // Attach event listener to the delete button
                        deleteButton.on('click', function () {
                            deleteNotification(relatedUserID, message);
                        });

                        // Append the notification to the list
                        $('.notification-list').append(notificationDiv);
                    });
                }
            },
            error: function (error) {
                console.error('Error fetching notifications:', error);
            }
        });
    }

    // Function to delete an notification
    function deleteNotification(relatedUserID, message) {
        $.ajax({
            url: '/delete-notification',
            type: 'POST',
            data: {
                relatedUserID: relatedUserID,
                message: message,
            },
            success: function (response) {
                fetchNotifications(); // Refresh the notifications after deletion
            },
            error: function (error) {
                console.error('Error deleting notification:', error);
            }
        });
    }
    // Call the fetchNotifications function on page load
    fetchNotifications();
});
