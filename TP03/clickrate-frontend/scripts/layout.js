// Script para layout dinámico (header, footer)
document.addEventListener("DOMContentLoaded", () => {
  // Desde Express, la carpeta frontend es la raíz '/'
  const ROOT_PATH = "";

  // Header
  fetch(ROOT_PATH + "/layout/Header/Header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("header").innerHTML = html;
    });

  // Footer
  fetch(ROOT_PATH + "/layout/Footer/Footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer").innerHTML = html;
    });
});
/*//Script para layout dinámico (header, footer)
document.addEventListener("DOMContentLoaded", () => {
  const ROOT_PATH = "/TP03/clickrate-frontend";
  
  //nos posicionamos en la ruta global 
  fetch(ROOT_PATH + "/layout/Header/Header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("header").innerHTML = html;
    });

  fetch(ROOT_PATH + "/layout/Footer/Footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer").innerHTML = html;
    });
}) este el layout.js que referencia la carpeta layout/header y footer*/