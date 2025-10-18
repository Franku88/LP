//cargar cajas desde el JSON
const urlParamsCaja = new URLSearchParams(window.location.search);
const param = urlParamsCaja.get("page") || "1";
const page = parseInt(param); // página actual
const perPageCajas = 20;

fetch("/TP02/data/crates.json")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById("cajas_list");
    const paginacion = document.getElementById("pagination");
    // Calcular el rango según la página
    const start = (page - 1) * perPageCajas;
    const end = start + perPageCajas;
    const items = data.slice(start, end);
    // Renderizar los cajas de la página
    items.forEach(caja => {
      const div = document.createElement("div");
      div.classList.add("case_card");
      div.classList.add("container");
      // Ahora cada item tiene link a tienda.html pasando el id
      div.innerHTML = `
        <a href="/TP02/pages/Case/Case.html?id=${caja.id}">
          <div class="card_content">
            <img src="${caja.image}" alt="${caja.name}" class="img-caja">
            <h3>${caja.name}</h3>
          </div>
        </a>`;
      contenedor.appendChild(div);
    });

    // Crear links de paginación
    const totalPages = Math.ceil(data.length / perPage);
    for (let i = 1; i <= totalPages; i++) {
      const link = document.createElement("a");
      link.href = `?page=${i}`;
      link.textContent = `${i}`;
      if (i === page) {
        link.classList.add("page_selected");
      }
      paginacion.appendChild(link);
    }
  }).catch(err => console.error("Error cargando cajas:", err));