// Section des variables //
const modalOpeningElements = document.querySelectorAll(".modal-opening");
const modal = document.querySelector("#modal");
const closeModal = document.querySelectorAll(".close-modal");
const arrayElement = document.querySelector("#array-element");
const overlay = document.querySelector("#overlay");
const closeModalIcons = document.querySelectorAll(".close-modal-icon");
let arrayPictures = [];

// Section des eventListener //

    // Ouverture du modal //
    modalOpeningElements.forEach((element) => {
        element.addEventListener("click", () => {
            modal.style.display = "flex";
            document.body.classList.add("close-modal");
            overlay.style.display = "block";
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
            overlay.style.display = "none";
        }
    });

    closeModalIcons.forEach((icon) => {
        icon.addEventListener("click", () => {
            modal.style.display = "none";
            document.body.classList.remove("close-modal-icon");
            overlay.style.display = "none";
        });
    });

// Appel à L'API pour affichage des photos et créations des balises <img></img> //
fetch("http://localhost:5678/api/works")
    .then((response) => response.json())
    .then((data) => {
        elements = data;
        data.forEach((element) => {
            let figure = document.createElement("figure");
            let img = document.createElement("img");
            let figcaption = document.createElement("figcaption");
            figure.classList.add("modal-figures");
            img.classList.add("modal-pictures");
            img.src = element.imageUrl;
            img.alt = element.title;
            figcaption.innerHTML = "éditer";
            figure.appendChild(img);
            figure.appendChild(figcaption);
            arrayElement.appendChild(figure);      
    });
});