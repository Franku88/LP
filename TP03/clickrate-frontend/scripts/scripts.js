//Scripts para todas las pages
document.addEventListener("DOMContentLoaded", () => {

  if (!localStorage.getItem("inventarioCajas")) {
    // Si no existe, lo creamos
    localStorage.setItem("inventarioCajas", JSON.stringify([]));
  }

  //Dropdown de user menu
  setTimeout(() => {
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
      console.warn("Elemento del menu usuario no encontrado");
    }
  }, 100);

});