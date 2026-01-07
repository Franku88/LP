const API_URL = "/api";
const urlParams = new URLSearchParams(window.location.search);
const page = parseInt(urlParams.get("page") || "1");
const perPage = parseInt(urlParams.get("limit") || "15");

fetch(API_URL + `/skins?page=${page}&limit=${perPage}`)
  .then(res => res.json())
  .then(json => {
    const contenedor = document.getElementById("skin-list");
    const paginacion = document.getElementById("pagination");

    // json.data YA es la página correcta
    json.data.forEach(skin => {
      const div = document.createElement("div");
      div.classList.add("skin_card", "container");

      div.innerHTML = `
        <a href="/skin?id=${skin.id}">
          <div class="card_content">
            <div class="card_img">
              <img src="${API_URL + "/skin-img/" + skin.id}" alt="${skin.name}">
            </div>
            <div>
              <h3>${skin.name}</h3>
              <p><b>Arma:</b> ${skin.weapon}</p>
              <p><b>Categoría:</b> ${skin.category}</p>
              <p><b>Rareza:</b> <span>${skin.rarity.name}</span></p>
            </div>
          </div>
        </a>
      `;

      div.style.background = `linear-gradient(15deg, #A38A5F, ${skin.rarity.color})`;
      contenedor.appendChild(div);
    });

    // Crear paginación con totalPages del backend
    for (let i = 1; i <= json.totalPages; i++) {
      const link = document.createElement("a");
      link.href = `?page=${i}`;
      link.textContent = `${i}`;
      if (i === json.page) {
        link.classList.add("page_selected");
      }
      paginacion.appendChild(link);
    }
  })
  .catch(err => console.error("Error cargando skins:", err));