const API_URL = "/api";

if (!window.__crateViewerLoaded) {
  window.__crateViewerLoaded = true;

  async function mostrarCaja(crateId) {
    try {
      const container = document.getElementById("case-container");
      if (!container) {
        console.error("No se encontró #case-container");
        return;
      }
      container.innerHTML = ""; // Limpia anterior

      // Pedir solo la caja necesaria
      const crate = await fetch(`${API_URL}/crates/${crateId}`).then(r => r.json());
      console.log(crate);

      if (!crate || crate.error) {
        container.innerHTML = `<p>No se encontró la caja con id: ${crateId}</p>`;
        return;
      }

      // Cargar listado de skins
      const allSkins = await fetch(`${API_URL}/crates/${crateId}/skins`).then(r => r.json());

      console.log(allSkins);
      // Crear estructura
      const caseDiv = document.createElement("div");
      caseDiv.innerHTML = `
        <h1>${crate.name}</h1>
        <div class="crate-info">
          <div class="crate-image-wrapper container_selected" data-id="${crate.id}">
            <img src="${API_URL + "/crate-img/" + crate.id}" alt="${crate.name}">
            <span class="tooltip">ID: ${crate.id}</span>
          </div>
          <div class="crate-actions">
            <button class="btn-comprar" data-crateid="${crate.id}">Comprar</button>
          </div>
        </div>
        <h2>Contiene:</h2>
        <div class="skins"></div>
        ${crate.contains_rare && crate.contains_rare.length > 0
          ? '<h2>Skins raras:</h2><div class="rare_skins"></div>'
          : ''
        }
      `;

      // Comprar caja: sin cambios
      const btnComprar = caseDiv.querySelector(".btn-comprar");
      btnComprar.addEventListener("click", () => comprarCaja(crate));

      function comprarCaja(crate) {
        const invKey = "inventarioCajas";
        const inventario = JSON.parse(localStorage.getItem(invKey)) || [];
        const existente = inventario.find(c => c.id === crate.id);

        if (existente) {
          existente.cantidad = (existente.cantidad || 1) + 1;
        } else {
          inventario.push({
            id: crate.id,
            name: crate.name,
            image: API_URL + "/crate-img/" + crate.id,
            cantidad: 1
          });
        }
        localStorage.setItem(invKey, JSON.stringify(inventario));
        alert(`Has comprado la caja "${crate.name}"`);
      }

      const skinsDiv = caseDiv.querySelector(".skins");
      const rareDiv = caseDiv.querySelector(".rare_skins");

      // Skins normales
      crate.contains.forEach(item => {
        const skinData = allSkins.find(s => s.id === item.id);
        if (!skinData) return;

        const skinDiv = document.createElement("div");
        skinDiv.classList.add("skin", "container");
        skinDiv.innerHTML = `
          <a href="/skin?id=${skinData.id}">
            <img src="${API_URL + "/skin-img/" + skinData.id}" alt="${skinData.name}">
            <h3>${skinData.name}</h3>
          </a>
        `;
        skinDiv.style.background = `linear-gradient(145deg, #A38A5F, ${skinData.rarity.color})`;
        skinsDiv.appendChild(skinDiv);
      });

      // Skins raras
      if (crate.contains_rare && rareDiv) {
        crate.contains_rare.forEach(item => {
          const skinData = allSkins.find(s => s.id === item.id);
          if (!skinData) return;

          const skinDiv = document.createElement("div");
          skinDiv.classList.add("skin", "container");
          skinDiv.innerHTML = `
            <a href="/skin?id=${skinData.id}">
              <img src="${API_URL + "/skin-img/" + skinData.id}" alt="${skinData.name}">
              <h3>${skinData.name}</h3>
            </a>
          `;
          skinDiv.style.background = `linear-gradient(145deg, #A38A5F, ${skinData.rarity.color})`;
          rareDiv.appendChild(skinDiv);
        });
      }

      container.appendChild(caseDiv);

    } catch (err) {
      console.error("Error al cargar crate:", err);
    }
  }

  // Obtener ID desde la URL
  const params = new URLSearchParams(window.location.search);
  const crateIdFromUrl = params.get("crate") || params.get("id");

  if (crateIdFromUrl) {
    mostrarCaja(crateIdFromUrl);
  } else {
    console.error("No se especificó crateId en la URL");
  }
}
