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
            <a href="/contact">Contact</a>
            <a id="myLink">Light</a>
            <a href="/frequently-asked-questions">FAQ</a>
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

    const myLink = shadowRoot.querySelector("#myLink");
    myLink.addEventListener("click", function() {
      var element = document.body;
      if (myLink.textContent === "Light") {
        myLink.textContent = "Dark";
        element.classList.remove("light-mode");
        element.classList.add("dark-mode");
      } else {
        myLink.textContent = "Light";
        element.classList.remove("dark-mode");
        element.classList.add("light-mode");
      }
    });

  }

  handleLogout() {
    // Handle logout functionality
    // For example, clear session data and redirect to the login page
    sessionStorage.clear();
    window.location.href = "/";
  }
}

customElements.define("defaultnavbar-component", DefaultNavbar);
