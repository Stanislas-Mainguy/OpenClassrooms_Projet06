// Section des variables //
const openModal = document.querySelectorAll(".modal-opening");
const modalWindow = document.querySelector("#modal");
const closeModal = document.querySelectorAll(".close-modal");
const arrayElement = document.querySelector("#array-element");
const overlay = document.querySelector("#overlay");
const iconAppearanceModalPictures = document.querySelectorAll(".modal-pictures");
let modalIcon = document.querySelectorAll(".modal-icon1");
let arrayPictures = [];

// Section des eventListener //

    // Ouverture du modal //
    openModal.forEach(function(element) {
        element.addEventListener("click", function() {
            modalWindow.style.display = "block";
            overlay.style.display = "block";
        });
    });

    // Fermeture du modal //
    closeModal.forEach(function(element) {
        element.addEventListener("click", function() {
            modalWindow.style.display = "none";
            overlay.style.display = "none";
        });
    });
    
// Appel à L'API pour affichage dans le modal des photos et créations des balises <img></img> //
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
            let blockIcon1 = document.createElement("div");
            let blockIcon2 = document.createElement("div");
            let arrowIcon = document.createElement("i");
            let trashIcon = document.createElement("i");
            arrowIcon.classList.add("fa-solid", "fa-up-down-left-right");
            trashIcon.classList.add("fa-regular", "fa-trash-can");
            blockIcon1.classList.add("modal-icon1", "multi-arrows");
            blockIcon2.classList.add("modal-icon2", "trash-icon");
            figure.appendChild(img);
            figure.appendChild(figcaption);
            arrayElement.appendChild(figure);
            figure.appendChild(blockIcon1);
            figure.appendChild(blockIcon2);
            blockIcon1.appendChild(arrowIcon);
            blockIcon2.appendChild(trashIcon);     
    });
});