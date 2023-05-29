$(document).ready(function () {
    // Function to fetch and display announcements
    function fetchAnnouncements() {
        $.ajax({
            url: 'get-announcements',
            method: 'GET',
            dataType: 'json',
            success: function (response) {
                // Clear existing announcements
                $('.descriptonInfo').empty();

                // Iterate over the received announcements and add them to the page
                response.forEach(function (announcement) {
                    var title = announcement.title;
                    var content = announcement.content;

                    // Create HTML elements for the announcement
                    var announcementTitle = $('<h1>').text(title);
                    var announcementContent = $('<p>').text(content);
                    var deleteButton = $('<button>').text('Delete').addClass('delete-btn');
                    var announcementDiv = $('<div>').append(announcementTitle, announcementContent, deleteButton);

                    // Append the announcement to the container
                    $('.descriptonInfo').append(announcementDiv);

                    // Attach event listener to the delete button
                    deleteButton.on('click', function () {
                        deleteAnnouncement(announcement._id);
                    });
                });
            },
            error: function (error) {
                console.error('Error fetching announcements:', error);
            }
        });
    }

    // Function to delete an announcement
    function deleteAnnouncement(announcementId) {
        $.ajax({
            url: '/delete-announcement' + announcementId,
            method: 'DELETE',
            success: function (response) {
                fetchAnnouncements(); // Refresh the announcements after deletion
            },
            error: function (error) {
                console.error('Error deleting announcement:', error);
            }
        });
    }

    // Attach event listener to the "Add New Announcement" button
    $('#add-announcement-btn').on('click', function () {
        // Get the input values for the new announcement
        var title = $('#announcement-title').val();
        var content = $('#announcement-content').val();

        // Perform the necessary logic to add new announcements
        $.ajax({
            url: '/add-announcement',
            method: 'POST',
            data: {
                title: title,
                content: content
            },
            success: function (response) {
                // Clear the input fields
                $('#announcement-title').val('');
                $('#announcement-content').val('');

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
