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
  }
}

customElements.define("defaultnavbar-component", DefaultNavbar);
