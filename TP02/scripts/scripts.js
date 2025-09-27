const urlParams = new URLSearchParams(window.location.search);
const page = parseInt(urlParams.get("page")) || 1; // página actual
const perPage = 20;

fetch("data/skins.json")
  .then(res => res.json())
  .then(data => {


    const contenedor = document.getElementById("skin-list");
    const paginacion = document.getElementById("pagination");

    // Calcular el rango según la página
    const start = (page - 1) * perPage;
    const end = start + perPage;
    const items = data.slice(start, end);

    // Renderizar los skins de la página
    items.forEach(skin => {
      const div = document.createElement("div");
      div.classList.add("skin_list_item");

      // Ahora cada item tiene link a detalle.html pasando el id
      div.innerHTML = `
            <a href="html/pages/skin.html?id=${skin.id}">
              <div class="skin_text">
                <img src="${skin.image}" alt="${skin.name}">
                <h3>${skin.name}</h3>
                <p><b>Arma:</b> ${skin.weapon}</p>
                <p><b>Categoría:</b> ${skin.category}</p>
                <p><b>Rareza:</b> <span style="color:${skin.rarity.color}">${skin.rarity.name}</span></p>
              </div>
            </a> `;
      contenedor.appendChild(div);
    });

    // Crear links de paginación
    const totalPages = Math.ceil(data.length / perPage);
    for (let i = 1; i <= totalPages; i++) {
      const link = document.createElement("a");
      link.href = `?page=${i}`;
      link.textContent = i;
      if (i === page) {        
        link.classList.add("page_selected");
      }
      paginacion.appendChild(link);
    }

  })
  .catch(err => console.error("Error cargando skins:", err));
