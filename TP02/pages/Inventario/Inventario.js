//carga las cajas compradas al inventario
const container = document.getElementById("inventario-container");

const inventario = JSON.parse(localStorage.getItem("inventarioCajas")) || [];
container.innerHTML = "";
inventario.forEach(caja => {
  const div = document.createElement("div");
  div.classList.add("caja-item");

  if (inventario.length === 0) {//no hay cajas en el inventario
    container.innerHTML = "<p> inventario vacio</p>";
    return;
  }

  container.innerHTML = inventario.map(caja =>
    `<div class="item-caja">
        <img src="${caja.image}" alt="${caja.name}" class="img-caja">
          <span class="contador">${caja.cantidad}</span>
          <h3>${caja.name}</h3>
          <p>ID: ${caja.id}</p>
          <p>Comprada el ${caja.fecha}</p>
      </div>`
  ).join("");
});