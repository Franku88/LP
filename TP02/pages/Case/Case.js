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
        fetch("/TP02/data/crates.json").then(res => res.json()),
        fetch("/TP02/data/skins.json").then(res => res.json())
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
      caseDiv.innerHTML = `
        <h1>${crate.name}</h1>
        <div class="crate-info">
          <div class="crate-image-wrapper container_selected" data-id="${crate.id}">
            <img src="${crate.image || ''}" alt="${crate.name}">
            <span class="tooltip">ID: ${crate.id}</span>
          </div>
          <div class="crate-actions">
            <button class="btn-comprar" data-crateid="${crate.id}">Comprar</button>
          </div>
        </div>
        <h2>Contiene:</h2>
        <div class="skins"></div>
        ${crate.contains_rare && crate.contains_rare.length > 0 ?
          '<h2>Skins raras:</h2><div class="rare_skins"></div>'
          : ''
        }
      `;

      // Botón de compra dea caja
      const btnComprar = caseDiv.querySelector(".btn-comprar");
      btnComprar.addEventListener("click", () => comprarCaja(crate));

      function comprarCaja(crate) {
        const invKey = "inventarioCajas";
        //conseguimos el invetario actual del localStorage
        const inventario = JSON.parse(localStorage.getItem(invKey));        
        //buscamos si ya existe la caja en el inventario
        const existe = inventario.find(c => c.id === crate.id);

        if (existe) {//si ya existe, incremento el contador de la caja
          existe.cantidad = (existe.cantidad || 1) + 1;
        } else {//si no existe esa caja en el inventario creamos un nuevo registro
          const nuevaCaja = {
            id: crate.id,
            name: crate.name,
            image: crate.image,
            cantidad: 1,
          };
          inventario.push(nuevaCaja);

        }
        //inventario actualizado
        localStorage.setItem(invKey, JSON.stringify(inventario));
        alert(`Has comprado la caja "${crate.name}"`);//msj por pantalla
      }

      const skinsDiv = caseDiv.querySelector(".skins");
      const rareDiv = caseDiv.querySelector(".rare_skins");

      // Skins normales
      crate.contains.forEach(item => {
        const skinData = allSkins.find(s => s.id === item.id);
        if (skinData) {
          const skinDiv = document.createElement("div");
          skinDiv.classList.add("skin");
          skinDiv.classList.add("container");
          skinDiv.innerHTML = `
            <img src="${skinData.image}" alt="${skinData.name}">
            <h3>${skinData.name}</h3>
          `;
          skinDiv.style.background = `linear-gradient(145deg, #A38A5F, ${skinData.rarity.color})`;
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
            skinDiv.classList.add("container");
            skinDiv.innerHTML = `
              <img src="${skinData.image}" alt="${skinData.name}">
              <h3>${skinData.name}</h3>
            `;
            skinDiv.style.background = `linear-gradient(145deg, #A38A5F, ${skinData.rarity.color})`;
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