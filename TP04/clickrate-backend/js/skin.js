const API_URL = "/api";
const id = new URLSearchParams(window.location.search).get("id");

fetch(API_URL + "/skins/" + id)
  .then(res => res.json())
  .then(skin => {
    const detalle = document.getElementById("skin-details");

    if (!skin || skin.error) {
      detalle.innerHTML = "<p>Skin no encontrada.</p>";
      return;
    }

    const name = document.createElement("div");
    name.innerHTML = `
      <h2><span>${skin.name}</span></h2>
    `;

    const imagen = document.createElement("div");
    imagen.innerHTML = `
      <img src="${API_URL + "/skin-img/" + skin.id}" alt="${skin.name}">
    `;
    imagen.style.background = `linear-gradient(15deg, #A38A5F, ${skin.rarity.color})`;
    imagen.classList.add("container_selected", "skin_details_img");

    const head = document.createElement("div");
    head.appendChild(name);
    head.appendChild(imagen);
    head.classList.add("skin_details_head");

    const body = document.createElement("div");
    body.innerHTML = `
      <p><b>Arma:</b> ${skin.weapon}</p>
      <p><b>Categoría:</b> ${skin.category}</p>
      <p><b>Rareza:</b> <span style="color:${skin.rarity.color}">${skin.rarity.name}</span></p>
      <p class="descripcion"><b>Descripción:</b> ${skin.description}</p>
    `;
    body.classList.add("skin_details_text");

    detalle.appendChild(head);
    detalle.appendChild(body);
  })
  .catch(err => {
    const detalle = document.getElementById("skin-details");
    detalle.innerHTML = "<p>Error cargando el detalle.</p>";
    console.error(err);
  });