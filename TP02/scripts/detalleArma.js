// Obtener el id desde la URL
const id = new URLSearchParams(window.location.search).get("id");

fetch("../../data/skins.json")
  .then(res => res.json())
  .then(data => {
    const skin = data.find(skin => skin.id === id);
    const detalle = document.getElementById('skin_details');
    
    if (!skin) {
      detalle.innerHTML = "<p>Skin no encontrado.</p>";
      return;
    }

    detalle.innerHTML = `
      <div>
        <h2><span style="color:${skin.rarity.color}">${skin.name}</span></h2>
        <div class="skin_details_img">
          <img src="${skin.image}" alt="${skin.name}" style="max-width:500px;">
        </div>
      </div>
      <div class="skin_details_text">
        <p><b>Arma:</b> ${skin.weapon}</p>
        <p><b>Categoría:</b> ${skin.category}</p>
        <p><b>Rareza:</b> <span style="color:${skin.rarity.color}">${skin.rarity.name}</span></p>
        <p><b>Descripción:</b> ${skin.description}</p>
      </div>
    `;
  })
  .catch(err => {
    detalle.innerHTML = "<p>Error cargando el detalle.</p>";
    console.error(err);
  });