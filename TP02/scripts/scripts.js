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

      div.innerHTML = `
            <img src="${skin.image}" alt="${skin.name}">
            <p>${skin.name}</p>
          `;

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

 function toggleLista(idLista) {
      // Oculta todas las listas
      document.querySelectorAll(".lista").forEach(lista => {
        if (lista.id !== idLista) {
          lista.classList.remove("mostrar");
        }
      });
      
      // Muestra u oculta la seleccionada
      document.getElementById(idLista).classList.toggle("mostrar");
    }

    // Si haces clic fuera, cierra todas las listas
    window.onclick = function(event) {
      if (!event.target.matches('.btn')) {
        document.querySelectorAll(".lista").forEach(lista => {
          lista.classList.remove("mostrar");});
      }
    }
    
    //
    const selectCategoria = document.getElementById('categoria');
    const items = document.querySelectorAll('#menuArmas .item');

    selectCategoria.addEventListener('change', () => {
    const categoria = selectCategoria.value;

    items.forEach(item => {
        if (categoria === 'todo' || item.dataset.categoria === categoria) {
        item.style.display = 'flex'; // se muestra
        } else {
        item.style.display = 'none'; // se oculta
        }
    });
    });