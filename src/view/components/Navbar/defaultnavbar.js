//Intializing the Component
const defaultnavbarTemplate = document.createElement("template");

defaultnavbarTemplate.innerHTML = `
  <style>
    @import "/components/Navbar/defaultnavbar.css"
  </style>
  <div class="topnav">
        <a class="logo">Bilkent Internship System</a>
        <div class="topnav-right">
            <a href="/">Home</a>
            <a href="#Announcement">Announcement</a>
            <a href="#Contact">Contact</a>
            <a href="#Language">Language</a>
            <button id="logout-button" class="form-button">Logout</button>

        </div>
    </div>
`;

class DefaultNavbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowRoot.appendChild(defaultnavbarTemplate.content);

    const logoutButton = shadowRoot.querySelector("#logout-button");
    logoutButton.addEventListener("click", this.handleLogout.bind(this));
    const userType = sessionStorage.getItem("userType");
    if (!userType) {
      logoutButton.style.display = "none";
    }
  }
  handleLogout() {
    // Handle logout functionality
    // For example, clear session data and redirect to the login page
    sessionStorage.clear();
    window.location.href = "/";
  }
}

customElements.define("defaultnavbar-component", DefaultNavbar);
