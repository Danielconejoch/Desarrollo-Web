class MiTarjeta extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });

    const foto = this.getAttribute('foto');
    const nombre = this.getAttribute('nombre');
    const descripcion = this.getAttribute('descripcion');

    const container = document.createElement("div");
    container.classList.add("container");

    container.innerHTML = `
    <link rel="stylesheet" href="style.css" />
      <div class="container">
        <div class="card">
          <div class="background">
            <img src="${foto}" alt="background" />
          </div>
          <div class="content">
            <h2>${nombre}</h2>
            <p>
              ${descripcion}
            </p>
            <ul class="social-icons">
              <li>
                <a href="https://x.com/danicone9402" title="Twitter">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-twitter"
                  >
                    <path
                      d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 
                                              10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5
                                              4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"
                    ></path>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/danicone94/" title="Instagram">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path
                      d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                    ></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/daniel-conejo-3a9502249/" title="Linkedin">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    class="feather feather-linkedin"
                  >
                    <path
                      d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"
                    />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    `;

    shadow.appendChild(container);
  }
}

customElements.define('mi-tarjeta', MiTarjeta);
