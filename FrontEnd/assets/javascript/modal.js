// Section des variables //
const modalOpeningElements = document.querySelectorAll(".modal-opening");
const modal = document.getElementById("modal");

// Section des fonctions //

    // Fonction d'ouverture du modal //
    function openModal() {
    modal.style.display = "flex";
    };

// Section des eventListener //

    // Ouverture du modal //
    modalOpeningElements.forEach((element) => {
    element.addEventListener("click", openModal);
    });
