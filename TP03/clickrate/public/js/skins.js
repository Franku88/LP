const API_URL = "/api";
const urlParams = new URLSearchParams(window.location.search);
const param = urlParams.get("page") || "1";
const page = parseInt(param); // página actual
const perPage = 15;

fetch(API_URL+"/skins")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.getElementById("skin-list");
    const paginacion = document.getElementById("pagination");
    // Calcular el rango según la página
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const items = data.slice(start, end);
    // Renderizar los skins de la página
    items.forEach((skin) => {
      const div = document.createElement("div");
      div.classList.add("skin_card");
      div.classList.add("container");
      // Ahora cada item tiene link a detalle.html pasando el id
      div.innerHTML = `
        <a href="/skin?id=${skin.id}">
          <div class="card_content">
            <div class="card_img">
              <img src="${API_URL+"/skin-img/"+skin.id}" alt="${skin.name}">
            </div>
            <div>
              <h3>${skin.name}</h3>
              <p><b>Arma:</b> ${skin.weapon}</p>
              <p><b>Categoría:</b> ${skin.category}</p>
              <p><b>Rareza:</b> <span>${skin.rarity.name}</span></p>
            </div>
          </div>
        </a> `;
      div.style.background = `linear-gradient(15deg, #A38A5F, ${skin.rarity.color})`;
      contenedor?.appendChild(div);
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
      paginacion?.appendChild(link);
    }
  }).catch(err => console.error("Error cargando skins:", err));