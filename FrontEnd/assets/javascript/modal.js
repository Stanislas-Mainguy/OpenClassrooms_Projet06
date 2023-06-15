// Section des variables //
const modalOpeningElements = document.querySelectorAll(".modal-opening");
const modal = document.querySelector("#modal");
const closeModal = document.querySelectorAll(".close-modal");
const arrayElement = document.querySelector("#array-element");
let arrayPictures = [];

// Section des eventListener //

    // Ouverture du modal //
    modalOpeningElements.forEach((element) => {
        element.addEventListener("click", () => {
            modal.style.display = "flex";
            document.body.classList.add("close-modal");
        });
    });

    // Fermeture du modal //
    document.addEventListener("click", (event) => {
        let clickedOutsideModal = true;
        
        modalOpeningElements.forEach((element) => {
            if (element.contains(event.target)) {
            clickedOutsideModal = false;
            }
        });

        if (clickedOutsideModal && !modal.contains(event.target)) {
            modal.style.display = "none";
            document.body.classList.remove("close-modal");
        }
    });

// Appel à L'API pour affichage des photos et créations des balises <img></img> //
fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        elements = data;
        data.forEach((element) => {
            const img = document.createElement("img");
            img.src = element.imageUrl;
            arrayElement.appendChild(img);
    });
});