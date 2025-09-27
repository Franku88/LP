//nos posicionamos en la ruta global 
fetch("/TP02/html/structure/header.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("header").innerHTML = html;
    });

fetch("/TP02/html/structure/footer.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("footer").innerHTML = html;
    });