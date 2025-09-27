function cargarTemplate(selector, url) {
  fetch(url)
    .then(res => res.text())
    .then(html => {
      document.querySelector(selector).innerHTML = html;
    })
    .catch(err => console.error("Error cargando template:", err));
}

// cargar header y footer
cargarTemplate("header", "../layout/header.html");
cargarTemplate("footer", "../layout/footer.html");