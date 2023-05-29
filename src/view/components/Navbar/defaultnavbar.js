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
            <a href="/notifications">Notifications</a>
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
    const bodyElement = document.querySelector("body");

    // Retrieve the theme preference from localStorage when the component loads
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      myLink.textContent = "Dark"; // Set the text to "Dark"
      bodyElement.classList.add("dark-mode");
    } else {
      myLink.textContent = "Light"; // Set the text to "Light"
      bodyElement.classList.add("light-mode");
    }

    myLink.addEventListener("click", function () {
      if (myLink.textContent === "Light") {
        myLink.textContent = "Dark";
        bodyElement.classList.remove("light-mode");
        bodyElement.classList.add("dark-mode");
        // Store the theme preference in localStorage
        localStorage.setItem("theme", "dark");
      } else {
        myLink.textContent = "Light";
        bodyElement.classList.remove("dark-mode");
        bodyElement.classList.add("light-mode");
        // Store the theme preference in localStorage
        localStorage.setItem("theme", "light");
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
