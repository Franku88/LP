// Obtener el id desde la URL
const id = new URLSearchParams(window.location.search).get("id");

fetch("/TP02/data/skins.json")
  .then(res => res.json())
  .then(data => {
    const skin = data.find(skin => skin.id === id);
    const detalle = document.getElementById('skin_details');
    
    if (!skin) {
      detalle.innerHTML = "<p>Skin no encontrado.</p>";
      return;
    }

    const name = document.createElement("div");
    name.innerHTML = `
      <h2><span>${skin.name}</span></h2>`;
    
    const imagen = document.createElement("div");
    imagen.innerHTML = `
      <img src="${skin.image}" alt="${skin.name}">`
    imagen.style.background = `linear-gradient(15deg, #A38A5F, ${skin.rarity.color})`;
    imagen.classList.add("container_selected");

    const head = document.createElement("div");
    head.appendChild(name);
    head.appendChild(imagen);
    
    const body = document.createElement("div");
    body.innerHTML = `
        <p><b>Arma:</b> ${skin.weapon}</p>
        <p><b>Categoría:</b> ${skin.category}</p>
        <p><b>Rareza:</b> <span style="color:${skin.rarity.color}">${skin.rarity.name}</span></p>
        <p class="descripcion"><b>Descripción:</b> ${skin.description}</p>
    `
    body.classList.add("skin_details_text");
    
    detalle.appendChild(head);
    detalle.appendChild(body);
  })
  .catch(err => {
    detalle.innerHTML = "<p>Error cargando el detalle.</p>";
    console.error(err);
  });
