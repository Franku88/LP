const API_URL = "/api";
const urlParams = new URLSearchParams(window.location.search);
const page = parseInt(urlParams.get("page")) || 1;
const limit = 20;

fetch(`${API_URL}/crates?page=${page}&limit=${limit}`)
  .then(res => res.json())
  .then(response => {
    const contenedor = document.getElementById("cajas_list");
    const paginacion = document.getElementById("pagination");

    const items = response.data;

    // Render de cada crate
    items.forEach(caja => {
      const div = document.createElement("div");
      div.classList.add("case_card", "container");
      
      div.innerHTML = `
        <a href="/case?id=${caja.id}">
          <div class="card_content">
            <img src="${API_URL + "/crate-img/" + caja.id}" alt="${caja.name}" class="img-caja">
            <h3>${caja.name}</h3>
          </div>
        </a>`;
      
      contenedor.appendChild(div);
    });

    // Paginación
    for (let i = 1; i <= response.totalPages; i++) {
      const link = document.createElement("a");
      link.href = `?page=${i}`;
      link.textContent = i;

      if (i === response.page) {
        link.classList.add("page_selected");
      }

      paginacion.appendChild(link);
    }
  })
  .catch(err => console.error("Error cargando cajas:", err));
