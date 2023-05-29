$(document).ready(function () {
    // Function to fetch and display announcements
    function fetchAnnouncements() {
        $.ajax({
            url: '/get-announcements', // Replace with the actual server endpoint for fetching announcements
            method: 'GET',
            success: function (response) {

                // Iterate over the received announcements and add them to the page
                response.forEach(function (announcement) {
                    var title = announcement.title;
                    var content = announcement.content;

                    // Create HTML elements for the announcement
                    var announcementTitle = $('<h1>').text(title);
                    var announcementContent = $('<p>').text(content);
                    var announcementDiv = $('<div>').append(announcementTitle, announcementContent);

                    // Append the announcement to the container
                    $('.announcement-list').append(announcementDiv);
                });
            },
            error: function (error) {
                console.error('Error fetching announcements:', error);
            }
        });
    }

    // Call the fetchAnnouncements function on page load
    fetchAnnouncements();
});
