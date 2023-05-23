// Intializing the Component
const studentnavbarTemplate = document.createElement("template");

studentnavbarTemplate.innerHTML = `
  <style>
    @import "/components/Navbar/studentnavbar.css"
  </style>
  <div class="topnav">
    <a class="logo">Student Interface</a>
    <div class="topnav-right">
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

customElements.define("studentnavbar-component", StudentNavbar);
