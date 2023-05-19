//Intializing the Component
const navbarTemplate = document.createElement("template");

navbarTemplate.innerHTML = `
  <style>
    @import "/components/Navbar/navbar.css"
  </style>
  <div class="topnav">
        <a class="logo">Bilkent Internship System</a>
        <div class="topnav-right">
            <a href="#Home">Home</a>
            <a href="#Announcement">Announcement</a>
            <a href="#Contact">Contact</a>
            <a href="#Language">Language</a>
            <a href="/student">Student</a>
        </div>
    </div>
`;

class Navbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });

    shadowRoot.appendChild(navbarTemplate.content);
  }
}

customElements.define("navbar-component", Navbar);
