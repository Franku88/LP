if (!window.__crateViewerLoaded) {
  window.__crateViewerLoaded = true;

  async function mostrarCaja(crateId = "crate-7003") {
    try {
      const container = document.getElementById("case-container");
      container.innerHTML = ""; // limpia contenido anterior

      // Cargar los JSON
      const [crates, allSkins] = await Promise.all([
        fetch("../data/crates.json").then(res => res.json()),
        fetch("../data/skins.json").then(res => res.json())
      ]);

      // Buscar la caja por su ID
      const crate = crates.find(c => c.id === crateId);
      if (!crate) {
        throw new Error(`No se encontró la caja con id: ${crateId}`);
      }

      if (!crate.contains) {
        throw new Error(`La caja "${crate.name}" no tiene la propiedad "contains"`);
      }

      // Crear estructura del detalle
      const caseDiv = document.createElement("div");
      caseDiv.classList.add("case");
      const cajaImgHTML = crate.image
        ? `<img src="${crate.image}" alt="${crate.name}" class="crate-image">`
        : '';

      caseDiv.innerHTML = `
        <h1>${crate.name}</h1>
        ${cajaImgHTML}
        <p><strong>ID:</strong> ${crate.id}</p>
        <p><strong>Primera venta:</strong> ${crate.first_sale_date || "Desconocida"}</p>
        <h2>Contiene:</h2>
        <div class="skins"></div>
        ${crate.contains_rare && crate.contains_rare.length > 0 ? '<h2>Skins raras:</h2><div class="skins rare"></div>' : ''}
      `;

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
            <p><strong>ID:</strong> ${skinData.id}</p>
            <p><strong>Rareza:</strong> ${skinData.rarity || "Desconocida"}</p>
          `;
          skinsDiv.appendChild(skinDiv);
        }
      });

      // Skins raras (si existen)
      if (crate.contains_rare && rareDiv) {
        crate.contains_rare.forEach(item => {
          const skinData = allSkins.find(s => s.id === item.id);
          if (skinData) {
            const skinDiv = document.createElement("div");
            skinDiv.classList.add("skin");
            skinDiv.innerHTML = `
              <img src="${skinData.image}" alt="${skinData.name}">
              <h3>${skinData.name}</h3>
              <p><strong>ID:</strong> ${skinData.id}</p>
              <p><strong>Rareza:</strong> ${skinData.rarity || "Desconocida"}</p>
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

  // Llamada inicial (por defecto)
  mostrarCaja();

  // Si tenés botones o links con data-crate, los conecta
  document.querySelectorAll("[data-crate]").forEach(btn => {
    btn.addEventListener("click", e => {
      const crateId = e.currentTarget.dataset.crate;
      mostrarCaja(crateId);
    });
  });
}