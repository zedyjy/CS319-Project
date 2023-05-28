const coordinatornavbarTemplate = document.createElement("template");

coordinatornavbarTemplate.innerHTML = `
  <style>
    @import "/components/Navbar/coordinatornavbar.css"
  </style>

  <div id="viewport">
  <!-- Sidebar -->
      <div id="sidebar">
        <ul class="nav">
          <li>
            <a
              href="/coordinator"
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
            <a href="/coordinator/view-student-list">
              <i class="zmdi zmdi-comment-more"></i> View Students List
            </a>
          </li>
          <li>
            <a href="/coordinator/view-evaluator-list">
              <i class="zmdi zmdi-comment-more"></i> View Evaluator List
            </a>
          </li>
          <li>
            <a href="/evaluator/student-list">
              <i class="zmdi zmdi-comment-more"></i> View Coordinator List
            </a>
          </li>
          <li>
            <a href="/coordinator/company-list">
              <i class="zmdi zmdi-comment-more"></i> View Company List
            </a>
          </li>
          <li>
            <a href="/evaluator/student-list">
              <i class="zmdi zmdi-comment-more"></i> View TA List
            </a>
          </li>
          <li>
            <a href="/coordinator/assignments">
              <i class="zmdi zmdi-comment-more"></i> Assign Students to Evaluators
            </a>
          </li>
          <li>
            <a href="/coordinator/add-delete-user"> <i class="zmdi zmdi-settings"></i> Add/Delete User </a>
          </li>
          <li>
            <a href="/coordinator/add-delete-user"> <i class="zmdi zmdi-settings"></i> Add/Delete/Approve Company </a>
          </li>
          <li>
            <a href="#"> <i class="zmdi zmdi-comment-more"></i> Profile </a>
          </li>
          <li>
            <a href="#"> <i class="zmdi zmdi-settings"></i> Other </a>
          </li>
        </ul>
      </div>
</div>
`;

class coordinatorSidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowRoot.appendChild(coordinatornavbarTemplate.content);

    const logoutButton = shadowRoot.querySelector("#logout-button");
    logoutButton.addEventListener("click", this.handleLogout.bind(this));

    const userType = sessionStorage.getItem("userType");
    if (userType === "coordinator") {
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
customElements.define("coordinator-sidebar-component", coordinatorSidebar);
