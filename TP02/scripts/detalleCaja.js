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

      // Crear estructura del detalle de la cajas y las skins
      const caseDiv = document.createElement("div");
      caseDiv.classList.add("case");
      const cajaImgHTML = crate.image
        ? `<img src="${crate.image}" alt="${crate.name}" class="crate-image">`
        : '';

      caseDiv.innerHTML = `
        <h1>${crate.name}</h1>
        <div class="crate-info">
            <div class="crate-image-wrapper" data-id="${crate.id}">
                <img src="${crate.image}" alt="${crate.name}" class="crate-image">
                <span class="tooltip">ID: ${crate.id}</span>
            </div>
            <div class="crate-actions">
              <button class="btn-comprar" data-crateid="${crate.id}">comprar caja</button>
            </div>
        </div>
        <h2>Contiene:</h2>
        <div class="skins"></div>
        ${crate.contains_rare && crate.contains_rare.length > 0 ? '<h2>Skins raras:</h2><div class="skins rare"></div>' : ''}
      `;
      //evento para comprar la caja
      const btnComprar= caseDiv.querySelector(".btn-comprar");
      btnComprar.addEventListener("click",() => comprarCaja(crate));
      
      /*function actualizarInventarioUI(){
        const inventario=JSON.parse(localStorage.getItem("inventarioCajas")) ||[];
        const info= document.getElementById("inventario-info");
        if(info){
          info.textContent=`Tenes ${inventario.length} caja(s) en tu inventario.`;
        }
      }*/
      function comprarCaja(crate){
        //busco el inventario actual del almacenamiento local
        //localStorage: es un almacenamiento del navegador,guarda info (txt plano)
        
        //parse conviete de txt JSON en objeto
        const inventario= JSON.parse(localStorage.getItem("inventarioCajas")) ||[];
        //creo un objeto con datos de la caja comprada
        const nuevaCaja ={
          id:crate.id,
          name: crate.name,
          image: crate.image,
          fecha: new Date().toLocaleString()
        };
        //agrego al inventario
        inventario.push(nuevaCaja);
        //guarda el inventario actualizado
        //stringify transforma objeto en texto JSON
        localStorage.setItem("inventarioCajas",JSON.stringify(inventario));
        //muestra confirmacion
        alert(`Has comprado la caja "${crate.name}"`);
        //
        window.location.href="../pages/inventario.html";
      }


      const skinsDiv = caseDiv.querySelector(".skins");
      const rareDiv = caseDiv.querySelector(".skins.rare");
      //comprar caja
  
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