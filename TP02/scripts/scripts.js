//
document.addEventListener("DOMContentLoaded", ()=>{
  // Detectar si estamos en la carpeta pages
  const estaEnPages = window.location.pathname.includes("/pages/");
  const prefix = estaEnPages ? "../" : "./";

  // Array de imágenes genérico
  const imagenes = [
    `${prefix}assets/background/dust2_back_plat_s2.png`,
    `${prefix}assets/background/dust2_blue_s2.png`,
    `${prefix}assets/background/dust2_double_doors_s2.png`,
    `${prefix}assets/background/nuke_ramp_s2.jpg`,
    `${prefix}assets/background/overpass_van_vista_s2.jpg`,
    `${prefix}assets/background/nuke_t_s2.jpg`
  ];

  console.log("Imágenes cargadas:", imagenes);
 
  //rotacion de fondos
  const fondo= document.querySelector(".fondo");
  let index = 0;
  fondo.style.backgroundImage= `url(${imagenes[index]})`;
  setInterval(()=> {
      fondo.style.opacity=0;
      setTimeout(()=> {
        index= (index +1)% imagenes.length;
        fondo.style.backgroundImage =`url(${imagenes[index]})`;
        fondo.style.opacity=1;//
      },2000);//coincide con la transicion
  },7000);//cambia cada 7 seg
  
  //al hacer click en usuario aparecen las opciones(ingresar/registrarse)
  setTimeout(() => {//despues de 100 mls ejecutar
    const userBtn=document.getElementById("userBtn");
    const dropdown= document.getElementById("dropdownMenu");

    if (userBtn && dropdown) { 
        userBtn.addEventListener("click", (e) => {
          e.stopPropagation(); // evita que cierre inmediatamente
          dropdown.style.display = 
            dropdown.style.display === "block" ? "none" : "block";
        });

        document.addEventListener("click", (e) => {
          if (!e.target.closest(".user-menu")) {
            dropdown.style.display = "none";
          }
        });
      }else{
        console.warn("elemento del menu usuario no encontrado");
      }
  },100);
  
  //cargar skins desde el JSON 
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
              <a href="/TP02/pages/skin.html?id=${skin.id}">
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
});