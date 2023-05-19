//Intializing the Component
const footerTemplate = document.createElement("template");

footerTemplate.innerHTML = `
  <style>
    @import "/components/Footer/footer.css"
  </style>
  <footer>
  <p> Bilkent Internship System. All rights reserved.</p>
  </footer>
`;

class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: "open" });
    shadowRoot.appendChild(footerTemplate.content);
  }
}

customElements.define("footer-component", Footer);
