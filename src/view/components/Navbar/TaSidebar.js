const tasidebarTemplate = document.createElement("template");

tasidebarTemplate.innerHTML = `
  <style>
    @import "/components/Navbar/TaSidebar.css"
  </style>
  
  <div id="viewport">
  <!-- Sidebar -->
  <div id="sidebar">
      <ul class="nav">
          <li>
              <a
                  href="/ta">
                  <i class="zmdi zmdi-view-dashboard"></i> Main Menu
              </a>
          </li>
          <li>
              <a href="/course-descriptions">
                  <i class="zmdi zmdi-link"></i> Course Descriptions
              </a>
          </li>
          <li>
              <a href="/announcements">
                  <i class="zmdi zmdi-calendar"></i> Announcements
              </a>
          </li>
          <li>
              <a href="/summer-training-coordinators">
                  <i class="zmdi zmdi-info-outline"></i> Summer Training Coordinators
              </a>
          </li>
          <li>
              <a href="/ta/student-list">
                  <i class="zmdi zmdi-comment-more"></i> View Students List / <br> /Give Feedback
              </a>
          </li>
          <li>
              <a href="/profile">
                  <i class="zmdi zmdi-comment-more"></i> Profile
              </a>
          </li>
          <li>
              <a href="/others">
                  <i class="zmdi zmdi-settings"></i> Other
              </a>
          </li>

      </ul>
  </div>
</div>
`;

class TaSidebar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowRoot.appendChild(tasidebarTemplate.content);

    const userType = sessionStorage.getItem("userType");
    if (userType === "TA") {
      // Show the ta-sidebar-component
      this.style.display = "block"; // Or any other appropriate display value
    } else {
      // Hide the ta-sidebar-component
      this.style.display = "none";
    }
  }
}
customElements.define("ta-sidebar-component", TaSidebar);
