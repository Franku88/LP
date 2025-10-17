document.addEventListener("DOMContentLoaded", () => {
  // Detectar si estamos en la carpeta pages
  const estaEnPages = window.location.pathname.includes("/pages/");
  const prefix = estaEnPages ? "../" : "./";

  // Array de imágenes genérico
  const imagenes = [
    `/TP02/assets/background/dust2_back_plat_s2.png`,
    `/TP02/assets/background/dust2_blue_s2.png`,
    `/TP02/assets/background/dust2_double_doors_s2.png`,
    `/TP02/assets/background/nuke_ramp_s2.jpg`,
    `/TP02/assets/background/overpass_van_vista_s2.jpg`,
    `/TP02/assets/background/nuke_t_s2.jpg`
  ];

  //rotacion de fondos
  const fondo = document.querySelector(".fondo");
  let index = 0;
  fondo.style.backgroundImage = `url(${imagenes[index]})`;
  setInterval(() => {
    fondo.style.opacity = 0;
    setTimeout(() => {
      index = (index + 1) % imagenes.length;
      fondo.style.backgroundImage = `url(${imagenes[index]})`;
      fondo.style.opacity = 1;//
    }, 1500); //coincide con la transicion
  }, 10000); //cambia cada 7 seg
});
