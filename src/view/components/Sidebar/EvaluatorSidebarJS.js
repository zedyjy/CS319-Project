const defaultnavbarTemplate = document.createElement("template");

defaultnavbarTemplate.innerHTML = `
  <style>
    @import "/components/Sidebar/EvaluatorSidebar.css"
  </style>
  
  <div id="viewport">
  <!-- Sidebar -->
  <div id="sidebar">
      <ul class="nav">
          <li>
              <a
                  href="C:\Users\zeyne\WebstormProjects\CS319-Project\src\view\Student\StudentHomePage\StudentHomePage.html">
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
              <a href="/evaluator/student-list">
                  <i class="zmdi zmdi-comment-more"></i> View Students List / <br> /Give Feedback / Grade Student
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
`;
class EvaluatorSidebar extends HTMLElement {
    constructor() {
      super();
    }
    
    connectedCallback() {
      const shadowRoot = this.attachShadow({ mode: "open" });
  
      shadowRoot.appendChild(defaultnavbarTemplate.content);
  
      const logoutButton = shadowRoot.querySelector("#logout-button");
      logoutButton.addEventListener("click", this.handleLogout.bind(this));
    }
    handleLogout() {
      // Handle logout functionality
      // For example, clear session data and redirect to the login page
      sessionStorage.clear();
      window.location.href = "/";
    }
  }
customElements.define("EvaluatorSidebar-component", EvaluatorSidebar);