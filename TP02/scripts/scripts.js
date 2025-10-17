document.addEventListener("DOMContentLoaded", () => {
  //al hacer click en usuario aparecen las opciones(ingresar/registrarse)
  setTimeout(() => {//despues de 100 mls ejecutar
    const userBtn = document.getElementById("userBtn");
    const dropdown = document.getElementById("dropdownMenu");

    if (userBtn && dropdown) {
      userBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // evita que cierre inmediatamente
        dropdown.style.display =
          dropdown.style.display === "block" ? "none" : "block";
      });

      document.addEventListener("click", (e) => {
        if (!e.target.closest(".user-menu")) {
          dropdown.style.display = "none";
        }
      });
    } else {
      console.warn("elemento del menu usuario no encontrado");
    }
  }, 100);

});