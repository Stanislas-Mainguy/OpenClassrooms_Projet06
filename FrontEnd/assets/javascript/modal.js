// Section des variables //
const openModal = document.querySelectorAll('.modal-opening');
const modalWindow = document.querySelector("#modal");
const closeModal = document.querySelectorAll(".close-modal");
const arrayElement = document.querySelector("#array-element");
const overlay = document.querySelector("#overlay");
const iconAppearanceModalPictures = document.querySelectorAll(".modal-pictures");
const modalIcon = document.querySelectorAll(".modal-icon");
const addPicture = document.querySelector("#add-element");
const modalContent = document.querySelector(".modal-content");
let arrayPictures = [];

// Section des eventListener //
    
    // Ouverture de la modale //
    openModal.forEach(function(element) {
        element.addEventListener("click", function() {
            modalWindow.style.display = "block";
            overlay.style.display = "block";
            modalWindow.setAttribute("aria-hidden", "false")
            modal1();
        });
    });

    // Fermeture de la modale //
    closeModal.forEach(function(element) {
        element.addEventListener("click", function() {
            modalWindow.style.display = "none";
            overlay.style.display = "none";
            modalWindow.setAttribute("aria-hidden", "true");
        });
    });

    /* Ouverture de la seconde modale //
    addPicture.addEventListener("click", function() {
        modal2();
    });*/

// Fonction d'ouverture de la modale avec création des éléments internes à celle-ci //
function modal1() {
    let blockIcon = document.createElement("div");
    blockIcon.classList.add("block-icon", "close-modal");

    let crossIcon = document.createElement("i")
    crossIcon.classList.add("fa-solid", "fa-xmark");

    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");

    let blockAddingElement = document.createElement("div");
    blockAddingElement.classList.add("block-adding-element");

    let modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title");
    modalTitle.innerHTML = "Galerie photo";

    let arrayElement = document.createElement("div");
    arrayElement.id = "array-element";

    let colorBar = document.createElement("div");
    colorBar.classList.add("color-bar");

    let blockButton = document.createElement("div");
    blockButton.classList.add("block-button");

    let buttonAddElement = document.createElement("button");
    buttonAddElement.id = "add-element";
    buttonAddElement.classList.add("add-button", "button_appearance");
    buttonAddElement.innerHTML = "Ajouter une photo";

    let buttonDeleteAllElement = document.createElement("button");
    buttonDeleteAllElement.id = "delet-all-element";
    buttonDeleteAllElement.classList.add("delete-button");
    buttonDeleteAllElement.innerHTML = "Supprimer la galerie";

    // Rattachement des éléments à leurs parents //
    modalWindow.appendChild(blockIcon);
    modalWindow.appendChild(modalContent);
    blockIcon.appendChild(crossIcon);
    modalContent.appendChild(blockAddingElement);
    blockAddingElement.appendChild(modalTitle);
    blockAddingElement.appendChild(arrayElement);
    blockAddingElement.appendChild(colorBar);
    blockAddingElement.appendChild(blockButton);
    blockButton.appendChild(buttonAddElement);
    blockButton.appendChild(buttonDeleteAllElement);
    
    // Création des éléments pour affichage des photos dans arrayElement //
    fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => {
            elements = data;
            arrayElement.innerHTML = "";
            data.forEach((element) => {
                let figure = document.createElement("figure");
                figure.classList.add("modal-figures");

                let img = document.createElement("img");
                img.classList.add("modal-pictures");
                img.src = element.imageUrl;
                img.alt = element.title;

                let figcaption = document.createElement("figcaption");
                figcaption.innerHTML = "éditer";
                
                let blockIcon1 = document.createElement("div");
                blockIcon1.classList.add("modal-icon", "multi-arrows");

                let arrowIcon = document.createElement("i");
                arrowIcon.classList.add("fa-solid", "fa-up-down-left-right");

                let blockIcon2 = document.createElement("div");
                blockIcon2.classList.add("modal-icon", "trash-icon");
                
                let trashIcon = document.createElement("i");
                trashIcon.classList.add("fa-regular", "fa-trash-can");
                
                // Rattachement des éléments à leurs parents //
                arrayElement.appendChild(figure);
                figure.appendChild(img);
                figure.appendChild(figcaption);
                figure.appendChild(blockIcon1);
                figure.appendChild(blockIcon2);
                blockIcon1.appendChild(arrowIcon);
                blockIcon2.appendChild(trashIcon);     
        });
    });
};

// Changement de la modal1 au clique sur le bouton d'ajout pour passer à l'interface de la modal2 //
function modal2() {
    modalContent.innerHTML = "";

    // Création des éléments liés à l'ouverture de la modal //
    let arrowLeft = document.createElement("i");
    arrowLeft.classList.add("fa-solid", "fa-arrow-left-long");
    
    let addBlock = document.createElement("div");
    addBlock.classList.add("add-block");

    let modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title");
    modalTitle.innerHTML = "Ajout photo";

    let blockPictureAndButton = document.createElement("div");
    blockPictureAndButton.classList.add("block-picture-and-button");
    
    let blockAddIcon = document.createElement("div");
    blockAddIcon.classList.add("block-add-icon");
    
    let addPictureIcon = document.createElement("i");
    addPictureIcon.classList.add("fa-regular", "fa-image");

    let addPictureButton = document.createElement("button");
    addPictureButton.classList.add("button_appearance", "add-new-picture");
    addPictureButton.innerHTML = "+ Ajouter photo";

    let infoAddButton = document.createElement("p");
    infoAddButton.innerHTML = "jpg, png : 4mo max";

    let formAddPicture = document.createElement("form");
    formAddPicture.classList.add("form-add-picture");
    formAddPicture.action = "#";
    formAddPicture.methode = "post";

    let labelAddTitle = document.createElement("label");
    labelAddTitle.classList.add("label-add-title");
    labelAddTitle.for = "title";
    labelAddTitle.innerHTML = "Titre";

    let inputAddTitle = document.createElement("input");
    inputAddTitle.classList.add("input-add-title");
    inputAddTitle.type = "text";
    inputAddTitle.name = "titre";
    inputAddTitle.id = "title";

    let labelAddCategorie = document.createElement("label");
    labelAddCategorie.classList.add("label-add-categorie");
    labelAddCategorie.for = "categories";
    labelAddCategorie.innerHTML = "Catégorie"

    let inputAddCategorie = document.createElement("input");
    inputAddCategorie.classList.add("input-add-categorie");
    inputAddCategorie.type = "categories";
    inputAddCategorie.name = "categories";
    inputAddCategorie.id = "add-categories";

    let colorBar = document.createElement("div");
    colorBar.classList.add("color-bar");

    let validAddElement = document.createElement("button");
    validAddElement.classList.add("button_appearance", "validate-picture");
    validAddElement.innerHTML = "Valider";

    // Rattachement des éléments à leurs parents //
    modalWindow.appendChild(arrowLeft);
    modalWindow.appendChild(addBlock);
    addBlock.appendChild(modalTitle);
    addBlock.appendChild(blockPictureAndButton);
    addBlock.appendChild(formAddPicture);
    addBlock.appendChild(colorBar);
    addBlock.appendChild(validAddElement);
    formAddPicture.appendChild(labelAddTitle);
    formAddPicture.appendChild(inputAddTitle);
    formAddPicture.appendChild(labelAddCategorie);
    formAddPicture.appendChild(inputAddCategorie);
    blockPictureAndButton.appendChild(blockAddIcon);
    blockPictureAndButton.appendChild(addPictureButton);
    blockPictureAndButton.appendChild(infoAddButton);
    blockAddIcon.appendChild(addPictureIcon);
};