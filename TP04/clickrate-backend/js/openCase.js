document.addEventListener("DOMContentLoaded", () => {
    
    console.log(" Frontend cargado: solicitando cajas...");
    const carousel = document.getElementById("carrusel");
    const result = document.getElementById("result");
    const openBtn = document.getElementById("openBtn");
    
    openBtn.addEventListener("click", async () => {
    result.textContent = "";
    carousel.innerHTML = "";

    console.log("Solicitando a /api/open-case");
    // Pedimos al servidor que abra una caja (elige la ganadora)
    const res = await fetch("/api/open-case");
    const { skins, winningSkin } = await res.json();
    // Armamos una "piscina" de skins repetidas para el efecto de giro
    const pool = [];
    for (let i = 0; i < 20; i++) pool.push(...skins);

    pool.forEach(skin => {
        const div = document.createElement("div");
        div.className = "item";

        const img = document.createElement("img");
        img.src = `/api/skin-img/${skin.id}`;
        img.alt = skin.name;
        img.loading = "lazy"; // mejora rendimiento
        div.appendChild(img);

        carousel.appendChild(div);
    });

    // Calculamos posición final (centrar la skin ganadora)
    const itemWidth = 150; // igual que CSS
    const gap = 15;         // igual que CSS

    // Calculamos el offset máximo permitido
    const totalWidth = pool.length * (itemWidth + gap);
    const containerWidth = carouselContainer.offsetWidth;

    // Centrar la skin ganadora
    const finalIndex = totalItems - 10 + winningIndex;
    let offset = -(finalIndex * (itemWidth + gap) - (containerWidth / 2) + (itemWidth / 2));

    // Limitar que el offset no haga que el carrusel se pase del principio o final
    const maxOffset = 0;
    const minOffset = containerWidth - totalWidth;
    if (offset > maxOffset) offset = maxOffset;
    if (offset < minOffset) offset = minOffset;

    carousel.style.transition = "transform 8s cubic-bezier(0.25, 0.1, 0.25, 1)";
    carousel.style.transform = `translateX(${offset}px)`;

        //  Mostrar resultado cuando termina la animación
        setTimeout(() => {
            result.textContent = ` Ganaste: ${winningSkin.name}!`;
        }, 3000);
    });
});