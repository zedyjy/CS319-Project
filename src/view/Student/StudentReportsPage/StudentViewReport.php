<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>View Reports</title>
    <link rel="stylesheet" href="StyleStudentViewReport.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css"
          integrity="sha512-s1y7J05cB0Npr7VxTJ0ZmxYzZMvq3f+V8HDXDyJ7mE1v2AsmHtP+Gg6c0Z/5/5RbUB5A5/aZeNbjFy+mB0pJNw=="
          crossorigin="anonymous" referrerpolicy="no-referrer"/>
    <!-- Bootstrap CSS -->
    <?php include "./StyleStudentViewReport.css" ?>
    <?php include "./bootstrap.min.css.css" ?>


</head>
<body>

<!-- NAVIGATION MENUS -->
<div class="topnav">
    <a class="logo">Bilkent Internship System</a>
    <div class="topnav-right">
        <!--TODO-->
        <a href="C:\Users\zeyne\WebstormProjects\CS319-Project\src\view\homePages\Home.html">Home</a>
        <a href="#Announcement">Announcement</a>
        <a href="#Contact">Contact</a>
        <a href="#Language">Language</a>
    </div>
</div>


<div id="viewport">
    <!-- Sidebar -->
    <div id="sidebar">
        <ul class="nav">
            <li>
                <a href="C:\Users\zeyne\WebstormProjects\CS319-Project\src\view\Student\StudentHomePage\StudentHomePage.html">
                    <i class="zmdi zmdi-view-dashboard"></i> Main Menu
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="zmdi zmdi-link"></i> Course Descriptions
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="zmdi zmdi-widgets"></i> Courses
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="zmdi zmdi-calendar"></i> Announcements
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="zmdi zmdi-info-outline"></i> Summer Training Cooridnators
                </a>
            </li>
            <li>
                <a href="C:\Users\zeyne\WebstormProjects\CS319-Project\src\view\Student\StudentReportsPage\StudentUploadReport.html">
                    <i class="zmdi zmdi-comment-more"></i> Upload Reports
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="zmdi zmdi-comment-more"></i> View Reports
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="zmdi zmdi-comment-more"></i> Grades
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="zmdi zmdi-comment-more"></i> Profile
                </a>
            </li>
            <li>
                <a href="#">
                    <i class="zmdi zmdi-settings"></i> Other
                </a>
            </li>

        </ul>
    </div>
</div>
<!-- Content -->
    <div class="container">
        <h2 class="mb-5">My Reports</h2>
        <div class="table-responsive">

            <table class="table table-striped custom-table">
                <thead>
                <tr>

                    <th scope="col">Student ID</th>
                    <th scope="col">Course Name</th>
                    <th scope="col">Report Submission Date</th>
                    <th scope="col">Report</th>
                    <th scope="col">Feedback Status</th>
                    <th scope="col">Iteration #</th>
                    <th scope="col">Grade</th>
                </tr>
                </thead>
                <tbody>
                <tr scope="row">
                    <td>
                        <?php echo $data['studentID']??''; ?>
                    </td>
                    <td>
                        <?php echo $data['courseID']??''; ?>
                    </td>
                    <td>
                        <?php echo $data['uploadDate']??''; ?>
                    </td>
                    <td><?php echo $data['report']??''; ?></td>
                    <td><?php echo $data['feedbackStatus']??''; ?></td>
                    <td><?php echo $data['iterationCount']??''; ?></td>
                    <td><?php echo $data['grade']??''; ?></td>

                </tr>
                <?php
      $sn++;}}else{ ?>
                <tr>
                    <td colspan="8">
                        <?php echo $fetchData; ?>
                    </td>
                <tr>

                </tbody>
            </table>
        </div>
    </div>
</div>


</body>
</html>