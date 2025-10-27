//Script para layout dinámico (header, footer)
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
})