const adminnavbarTemplate = document.createElement("template");

adminnavbarTemplate.innerHTML = `
  <style>
    @import "/components/Navbar/adminnavbar.css"
  </style>

  <div id="viewport">
  <!-- Sidebar -->
      <div id="sidebar">
        <ul class="nav">
          <li>
            <a
              href="/admin"
            >
              <i class="zmdi zmdi-view-dashboard"></i> Main Menu
            </a>
          </li>
          <li>
            <a href="#"> <i class="zmdi zmdi-link"></i> Course Descriptions </a>
          </li>
          <li>
            <a href="#"> <i class="zmdi zmdi-calendar"></i> Announcements </a>
          </li>
          <li>
            <a href="/summer-training-coordinators">
              <i class="zmdi zmdi-info-outline"></i> Summer Training
              Cooridnators
            </a>
          </li>
          <li>
            <a href="/admin/view-student-list">
              <i class="zmdi zmdi-comment-more"></i> View Students List
            </a>
          </li>
          <li>
            <a href="/admin/view-evaluator-list">
              <i class="zmdi zmdi-comment-more"></i> View Evaluator List
            </a>
          </li>
          <li>
            <a href="/admin/view-coordinator-list">
              <i class="zmdi zmdi-comment-more"></i> View Coordinator List
            </a>
          </li>
          <li>
            <a href="/admin/view-company-list">
              <i class="zmdi zmdi-comment-more"></i> View Company List
            </a>
          </li>
          <li>
            <a href="/admin/view-tas-list">
              <i class="zmdi zmdi-comment-more"></i> View TA List
            </a>
          </li>
          <li>
            <a href="/admin/assignments">
              <i class="zmdi zmdi-comment-more"></i> Assign Users
            </a>
          </li>
          <li>
            <a href="/admin/add-delete-user"> <i class="zmdi zmdi-settings"></i> Add/Delete User </a>
          </li>
          <li>
            <a href="/others"> <i class="zmdi zmdi-settings"></i> Other </a>
          </li>
        </ul>
      </div>
</div>
`;

class AdminSidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowRoot.appendChild(adminnavbarTemplate.content);

    const logoutButton = shadowRoot.querySelector("#logout-button");
    logoutButton.addEventListener("click", this.handleLogout.bind(this));

    const userType = sessionStorage.getItem("userType");
    if (userType === "Admin") {
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
customElements.define("admin-sidebar-component", AdminSidebar);
