const evaluatornavbarTemplate = document.createElement("template");

evaluatornavbarTemplate.innerHTML = `
  <style>
    @import "/components/Navbar/EvaluatorSidebar.css"
  </style>
  
  <div id="viewport">
  <!-- Sidebar -->
  <div id="sidebar">
      <ul class="nav">
          <li>
              <a
                  href="/evaluator">
                  <i class="zmdi zmdi-view-dashboard"></i> Main Menu
              </a>
          </li>
          <li>
              <a href="/course-descriptions">
                  <i class="zmdi zmdi-link"></i> Course Descriptions
              </a>
          </li>
          <li>
              <a href="#">
                  <i class="zmdi zmdi-widgets"></i> Courses
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
              <a href="/evaluator/student-list">
                  <i class="zmdi zmdi-comment-more"></i> View Students List / <br> /Give Feedback / Grade Student
              </a>
          </li>
          <li>
              <a href="/profile">
                  <i class="zmdi zmdi-comment-more"></i> Profile
              </a>
          </li>
          <li>
            <a href="/company"> <i class="zmdi zmdi-settings"></i> Company List </a>
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

    shadowRoot.appendChild(evaluatornavbarTemplate.content);
  }
}
customElements.define("evaluator-sidebar-component", EvaluatorSidebar);
