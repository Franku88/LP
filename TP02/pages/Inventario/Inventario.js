//Muestra cajas compradas en el inventario
const inventario = JSON.parse(localStorage.getItem("inventarioCajas"));

//Obtiene div a rellenar
const container = document.getElementById("inventario-container");

if (inventario.length === 0) {//no hay cajas en el inventario
  container.innerHTML = "<h3>Sin elementos en el inventario</h3>";
} else {
  inventario.forEach(caja => {
    const div = document.createElement("div");    
    container.innerHTML = inventario.map(caja =>
      `<a href="#" class="case_card container">
        <img src="${caja.image}" alt="${caja.name}" class="case_card_img">
        <span class="contador">${caja.cantidad}</span>
        <h3>${caja.name}</h3>
      </a>`
    ).join("");
  });
}


