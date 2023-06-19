// Section des variables //
const modalOpeningElements = document.querySelectorAll(".modal-opening");
const modal = document.querySelector("#modal");
const closeModal = document.querySelectorAll(".close-modal");
const arrayElement = document.querySelector("#array-element");
const overlay = document.querySelector("#overlay");
let arrayPictures = [];

// Section des eventListener //

    // Ouverture du modal //
    modalOpeningElements.forEach(function(element) {
        element.addEventListener("click", function() {
            modal.style.display = "block";
            overlay.style.display = "block";
        });
    });

    // Fermeture du modal //
    closeModal.forEach(function(element) {
        element.addEventListener("click", function() {
            modal.style.display = "none";
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