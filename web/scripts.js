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