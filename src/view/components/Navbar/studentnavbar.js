//Intializing the Component
const studentnavbarTemplate = document.createElement("template");

studentnavbarTemplate.innerHTML = `
  <style>
    @import "/components/Navbar/studentnavbar.css"
  </style>
  <div class="topnav">
        <a class="logo">Student Interface</a>
        <div class="topnav-right">
            <a href="/">Upload Report</a>
            <a href="#Announcement">My Reports</a>
            <a href="#Contact">My Courses</a>
            <a href="#Language">Profile</a>
        </div>
    </div>
`;

class StudentNavbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowRoot.appendChild(studentnavbarTemplate.content);
  }
}

customElements.define("studentnavbar-component", StudentNavbar);
