//nos posicionamos en la ruta global 
fetch("/TP02/layout/Header/Header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("header").innerHTML = html;
    });

fetch("/TP02/layout/Footer/Footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer").innerHTML = html;
    });