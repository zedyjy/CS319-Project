const studentnavbarTemplate = document.createElement("template");

studentnavbarTemplate.innerHTML = `
  <style>
    @import "/components/Navbar/EvaluatorSidebar.css"
  </style>
  
  <div id="viewport">
  <!-- Sidebar -->
  <div id="sidebar">
  <ul class="nav">
    <li>
      <a href="/student">
        <i class="zmdi zmdi-view-dashboard"></i> Main Menu
      </a>
    </li>
    <li>
      <a href="/course-descriptions"> <i class="zmdi zmdi-link"></i> Course Descriptions </a>
    </li>
    <li>
      <a href="/announcements"> <i class="zmdi zmdi-calendar"></i> Announcements </a>
    </li>
    <li>
      <a href="/summer-training-coordinators">
        <i class="zmdi zmdi-info-outline"></i> Summer Training
        Coordinators
      </a>
    </li>
    <li>
      <a href="/student/upload-report">
        <i class="zmdi zmdi-comment-more"></i> Upload Reports
      </a>
    </li>
    <li>
      <a href="/student/view-report">
        <i class="zmdi zmdi-comment-more"></i> View Reports
      </a>
    </li>
    <li>
      <a href="/student/grades"> <i class="zmdi zmdi-comment-more"></i> Grades </a>
    </li>
    <li>
      <a href="/profile"> <i class="zmdi zmdi-comment-more"></i> Profile </a>
    </li>
    <li>
      <a href="/company"> <i class="zmdi zmdi-settings"></i> Company List </a>
    </li>
    <li>
      <a href="#"> <i class="zmdi zmdi-settings"></i> Other </a>
    </li>
  </ul>
</div>

`;
class StudentSidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowRoot.appendChild(studentnavbarTemplate.content);

    const logoutButton = shadowRoot.querySelector("#logout-button");
    logoutButton.addEventListener("click", this.handleLogout.bind(this));

    const userType = sessionStorage.getItem("userType");
    if (userType === "Student") {
      // Show the student-sidebar-component
      this.style.display = "block"; // Or any other appropriate display value
    } else {
      // Hide the student-sidebar-component
      this.style.display = "none";
    }
  }
  handleLogout() {
    // Handle logout functionality
    // For example, clear session data and redirect to the login page
    sessionStorage.clear();
    window.location.href = "/";
  }
}
customElements.define("student-sidebar-component", StudentSidebar);
