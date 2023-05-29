$(document).ready(function () {
    // Function to fetch and display announcements
    function fetchAnnouncements() {
        $.ajax({
            url: 'get-announcements',
            method: 'GET',
            dataType: 'json',
            success: function (response) {

                $('.announcement-list').empty();

                // Iterate over the received announcements and add them to the page
                response.forEach(function (announcement) {
                    var title = announcement.title;
                    var content = announcement.content;

                    // Create HTML elements for the announcement
                    var announcementTitle = $('<h1>').text(title);
                    var announcementContent = $('<p>').text(content);
                    var deleteButton = $('<button>').text('Delete').addClass('delete-btn');
                    var announcementDiv = $('<div>').addClass('announcement').append(announcementTitle, announcementContent, deleteButton);

                    // Attach event listener to the delete button
                    deleteButton.on('click', function () {
                        deleteAnnouncement(title, content);
                    });

                    // Append the announcement to the list
                    $('.announcement-list').append(announcementDiv);
                });

                // Create the Add button
                var addButton = $('<button>').text('Add Announcement').attr('id', 'add-announcement-btn');
                $('.announcement-list').append(addButton);

                // Attach event listener to the "Add Announcement" button
                addButton.on('click', function () {
                    // Show the input fields for the new announcement
                    $('.add-announcement-form').toggle();
                });
            },
            error: function (error) {
                console.error('Error fetching announcements:', error);
            }
        });
    }

    // Function to delete an announcement
    function deleteAnnouncement(title, content) {
        var title_s = title;
        var content_s = content;
        $.ajax({
            url: '/delete-announcement',
            type: 'POST',
            data: {
                title_d: title_s,
                content_d: content_s,
            },
            success: function (response) {
                fetchAnnouncements(); // Refresh the announcements after deletion
            },
            error: function (error) {
                console.error('Error deleting announcement:', error);
            }
        });
    }

    // Attach event listener to the "Add New Announcement" form
    $('.add-announcement-form').submit(function (event) {
        event.preventDefault();

        // Get the input values for the new announcement
        var title = $('#announcement-title').val();
        var content = $('#announcement-content').val();

        $.ajax({
            url: "/add-announcement",
            type: "POST",
            data: {
                title_d: title,
                content_d: content,
            },
            success: function (response) {
                // Clear the input fields
                $('#announcement-title').val('');
                $('#announcement-content').val('');
                sendNotifications("A new announcement was made." + "Title of the announcement: " + title);

                fetchAnnouncements(); // Refresh the announcements after adding a new announcement
            },
            error: function (error) {
                console.error('Error adding announcement:', error);
            }
        });
    });

    // Call the fetchAnnouncements function on page load
    fetchAnnouncements();
});

function sendNotifications(message) {
    // Create a JSON payload with the relatedUserID and message
    const payload = {
        relatedUserID: "Everyone",
        message: message
    };

    // Send a POST request to the server to add the notification
    $.ajax({
        url: '/add-notification',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function (savedNotification) {
            console.log('Notification added:', savedNotification);
            // Perform any necessary actions or update UI with the savedNotification data
        },
        error: function (error) {
            console.error('Error adding notification:', error);
            // Handle the error gracefully and show an error message
        }
    });

}
