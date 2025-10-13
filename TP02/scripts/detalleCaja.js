if (!window.__crateViewerLoaded) {
  window.__crateViewerLoaded = true;

  async function mostrarCaja(crateId) {
    try {
      const container = document.getElementById("case-container");
      if (!container) {
        console.error("No se encontró #case-container");
        return;
      }
      container.innerHTML = ""; // limpia contenido anterior

      // Cargar los JSON
      const [crates, allSkins] = await Promise.all([
        fetch("../data/crates.json").then(res => res.json()),
        fetch("../data/skins.json").then(res => res.json())
      ]);

      // Asegurar que crates sea un array
      const cratesArr = Array.isArray(crates) ? crates : [crates];

      // Buscar la caja seleccionada (id caja)
      const crate = cratesArr.find(c => c.id === crateId);

      if (!crate) {
        container.innerHTML = `<p>No se encontró la caja con id: ${crateId}</p>`;
        return;
      }

      if (!crate.contains) {
        throw new Error(`La caja "${crate.name}" no tiene la propiedad "contains"`);
      }

      // Crear estructura del detalle de la caja
      const caseDiv = document.createElement("div");
      caseDiv.classList.add("case");
      caseDiv.innerHTML = `
        <h1>${crate.name}</h1>
        <div class="crate-info">
          <div class="crate-image-wrapper" data-id="${crate.id}">
            <img src="${crate.image || ''}" alt="${crate.name}" class="crate-image">
            <span class="tooltip">ID: ${crate.id}</span>
          </div>
          <div class="crate-actions">
            <button class="btn-comprar" data-crateid="${crate.id}">comprar caja</button>
          </div>
        </div>
        <h2>Contiene:</h2>
        <div class="skins"></div>
        ${crate.contains_rare && crate.contains_rare.length > 0 ? 
          '<h2>Skins raras:</h2><div class="skins rare"></div>' 
          : ''
        }
      `;

      // Botón de compra dea caja
      const btnComprar = caseDiv.querySelector(".btn-comprar");
      btnComprar.addEventListener("click", () => comprarCaja(crate));

      function comprarCaja(crate) {
        //conseguimos el invetario actual del localStorage
        const inventario = JSON.parse(localStorage.getItem("inventarioCajas")) || [];
        //buscamos si ya existe la caja en el inventario
        const existe= inventario.find(c => c.id  === crate.id);
        
        if(existe){//si ya existe, incremento el contador de la caja
           existe.cantidad= (existe.cantidad || 1)+1;
        }else{//si no existe esa caja en el inventario creamos un nuevo registro
          const nuevaCaja = {
          id: crate.id,
          name: crate.name,
          image: crate.image,
          cantidad: 1,
          fecha: new Date().toLocaleString()
          };
          inventario.push(nuevaCaja);
          
        }
        //inventario actualizado
        localStorage.setItem("inventarioCajas", JSON.stringify(inventario));
        alert(`Has comprado la caja "${crate.name}"`);//msj por pantalla
        window.location.href = "../pages/inventario.html";//direccion
      }

      const skinsDiv = caseDiv.querySelector(".skins");
      const rareDiv = caseDiv.querySelector(".skins.rare");

      // Skins normales
      crate.contains.forEach(item => {
        const skinData = allSkins.find(s => s.id === item.id);
        if (skinData) {
          const skinDiv = document.createElement("div");
          skinDiv.classList.add("skin");
          skinDiv.innerHTML = `
            <img src="${skinData.image}" alt="${skinData.name}">
            <h3>${skinData.name}</h3>
          `;
          skinsDiv.appendChild(skinDiv);
        }
      });

      // Skins raras
      if (crate.contains_rare && rareDiv) {
        crate.contains_rare.forEach(item => {
          const skinData = allSkins.find(s => s.id === item.id);
          if (skinData) {
            const skinDiv = document.createElement("div");
            skinDiv.classList.add("skin");
            skinDiv.innerHTML = `
              <img src="${skinData.image}" alt="${skinData.name}">
              <h3>${skinData.name}</h3>
            `;
            rareDiv.appendChild(skinDiv);
          }
        });
      }

      container.appendChild(caseDiv);

    } catch (err) {
      console.error("Error al cargar JSON:", err);
    }
  }

  // Obtener el ID de la caja desde la URL
  const params = new URLSearchParams(window.location.search);
  const crateIdFromUrl = params.get("crate") || params.get("id");

  if (crateIdFromUrl) {
    mostrarCaja(crateIdFromUrl);
  } else {
    console.error("No se especificó crateId en la URL");
  }
}