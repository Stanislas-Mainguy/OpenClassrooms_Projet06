// Section des variables //
const modalOpenings = document.querySelectorAll(".modal-opening");

//Création d'un eventListener pour ouvreture de la modal sur chaque bouton de modif //
modalOpenings.forEach((element) => {
    element.addEventListener("click", () => {
        const modal = document.getElementById("modal");
        modal.style.display = "flex";
    });
  });