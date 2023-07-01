                            // SECTION POUR ALLER SUR LA PAGE DE L'ADMIN //

// Vérification du token dans le localStorage //
function checkTokenForAdminMode() {
    const token = localStorage.getItem("token");
    const body = document.querySelector("body");

    // S'il y a la présence d'un token, création des éléments et changement de style pour les éléments suivant //
    if (token) {
        // Section des constantes pour le changement de la page admin //
        const editLogin = document.querySelector("#login_logout");
        const editFiltres = document.querySelector(".block_filters");
        const editHeader = document.querySelector("header");
        const editH2Project = document.querySelector(".admin-project-edit");
        const figureEdit = document.querySelector(".figure-edit-element");
        const articleIntroEdit = document.querySelector(".intro");
        const footer = document.querySelector("footer");

        // Section de création des éléments admin //
        let editMode = document.createElement("div");
        editMode.id = "edit-mode";

        let editContainer = document.createElement("div");
        editContainer.classList.add("edit-container", "modal-opening");

        let penIcon = document.createElement("i");
        penIcon.classList.add("fa-regular", "fa-pen-to-square");

        let spanEditMode = document.createElement("span");
        spanEditMode.classList.add("span-edit-mode");
        spanEditMode.innerText = "Mode édition";

        let publishButtonChanges = document.createElement("button");
        publishButtonChanges.id = "publish-changes";
        publishButtonChanges.classList.add("button_appearance");
        publishButtonChanges.type = "button";
        publishButtonChanges.innerText = "Publier les changements";

        let editPictureContainer = document.createElement("div");
        editPictureContainer.classList.add("edit-picture");

        let spanModifier = document.createElement("span");
        spanModifier.innerText = "modifier";

        let editIntroContainer = document.createElement("div");
        editIntroContainer.classList.add("edit-intro");

        let editProjectContainer = document.createElement("div");
        editProjectContainer.classList.add("edit-project");

        let modalElement = document.createElement("aside");
        modalElement.id = "modal";
        modalElement.setAttribute("aria-hidden", "true");

        let overlayElement = document.createElement("div");
        overlayElement.id = "overlay";
        overlayElement.classList.add("close-modal");

        // Rattachement des éléments à leurs parents // 
        editContainer.appendChild(penIcon);
        editContainer.appendChild(spanEditMode);
        editMode.appendChild(editContainer);
        editMode.appendChild(publishButtonChanges);
        body.insertBefore(editMode, body.firstElementChild);
        figureEdit.appendChild(editPictureContainer);
        editPictureContainer.appendChild(createDivContainerWithElements());
        articleIntroEdit.insertBefore(editIntroContainer, articleIntroEdit.firstChild);
        editIntroContainer.appendChild(createDivContainerWithElements());
        editH2Project.appendChild(editProjectContainer);
        editProjectContainer.appendChild(createDivContainerWithElements());
        footer.insertAdjacentElement("afterend", modalElement);
        footer.insertAdjacentElement("afterend", overlayElement);
        
        // Modification de style pour certains éléments //
        editLogin.innerText = "";
        editLogin.textContent = "logout";
        editFiltres.style.display = "none";
        editHeader.style.marginTop = "97px";
        editH2Project.style.marginBottom = "92px";
        editH2Project.style.marginTop = "108px";
    };
};

// Fonction de création d'un block div pour intégration dans les appendChild au dessus //
function createDivContainerWithElements() {
    let divContainer = document.createElement("div");
    divContainer.classList.add("div-edit-size", "modal-opening");
    
    let penIcon = document.createElement("i");
    penIcon.classList.add("fa-regular", "fa-pen-to-square");
    
    let spanModifier = document.createElement("span");
    spanModifier.innerText = "modifier";

    divContainer.appendChild(penIcon);
    divContainer.appendChild(spanModifier);

    return divContainer;
};

                                
                                // SECTION DES EVENTLISTENER //
    
// Ouverture de la modale //
function setupModalOpening() {
    const openModal = document.querySelectorAll(".modal-opening");
    const modalWindow = document.querySelector("#modal");
    const overlay = document.querySelector("#overlay");

    openModal.forEach(function(element) {
        element.addEventListener("click", function() {
            modalWindow.style.display = "block";
            modalWindow.setAttribute("aria-hidden", "false");
            overlay.style.display = "block";
            modal1(modalWindow);
        });
    });
};

// Fermeture de la modale //
function setupModalClosing() {
    const closeModal = document.querySelectorAll(".close-modal");
    const modalWindow = document.querySelector("#modal");
    const overlay = document.querySelector("#overlay");

    closeModal.forEach(function(element) {
        element.addEventListener("click", function() {
            modalWindow.style.display = "none";
            overlay.style.display = "none";
            modalWindow.setAttribute("aria-hidden", "true");
        });
    });
};

// Changement de la modal1 en modal2 //
function changeToModal2() {
    const addElementButton = document.querySelector("#add-element");
    const modalWindow = document.querySelector("#modal");
    
    addElementButton.addEventListener("click", function() {
        modal2(modalWindow);
    });
};

// Retour de la modal2 à la modal1 //
function returnOnModal1() {
    const blockArrowLeftIcon = document.querySelector(".return-modal1");
    const modalWindow = document.querySelector("#modal");

    blockArrowLeftIcon.addEventListener("click", function() {
        modal1(modalWindow);
    });
};

// Création de l'eventListener pour le logout //
function setupLogout() {
    const logout = document.querySelector("#login_logout");

    logout.addEventListener("click", function() {
        localStorage.clear();
        window.location.href = "./index.html";
    });
};

// Ajout photo sur modal2 //
function addPictureFromModal2() {
    const addPictureButton = document.querySelector(".add-new-picture");

    addPictureButton.addEventListener("click", function() {

    });
};



                            // SECTION DE STRUCTURATION DES MODALES //

// Fonction d'ouverture de la modale avec création des éléments internes à celle-ci //
function modal1(modalWindow) {
    const addElementButton = document.querySelector("#add-element");
    modalWindow.innerHTML = "";
    
    // Création des éléments liés à l'ouverture de la modale //
    let blockIcon = document.createElement("div");
    blockIcon.classList.add("block-icon");

    let blockCrossIcon = document.createElement("div");
    blockCrossIcon.classList.add("block-cross-icon-and-arrow", "close-modal");

    let crossIcon = document.createElement("i")
    crossIcon.classList.add("fa-solid", "fa-xmark");

    let modalContent = document.createElement("div");
    modalContent.id = "modal-content";

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
    blockIcon.appendChild(blockCrossIcon);
    blockCrossIcon.appendChild(crossIcon);
    modalContent.appendChild(blockAddingElement);
    blockAddingElement.appendChild(modalTitle);
    blockAddingElement.appendChild(arrayElement);
    blockAddingElement.appendChild(colorBar);
    blockAddingElement.appendChild(blockButton);
    blockButton.appendChild(buttonAddElement);
    blockButton.appendChild(buttonDeleteAllElement);

    // Changement de taille pour la modale //
    modalWindow.style.height = "731px";
    
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
    setupModalClosing();
    changeToModal2();
};

// Changement de la modal1 au clique sur le bouton d'ajout pour passer à l'interface de la modal2 //
function modal2() {
    const modalWindow = document.querySelector("#modal");
    const modalContent = document.querySelector("#modal-content");
    const blockIcon = document.querySelector(".block-icon");
    modalContent.innerHTML = "";

    // Création des éléments liés à l'ouverture de la modal //
    let blockArrowLeftIcon = document.createElement("div");
    blockArrowLeftIcon.classList.add("block-cross-icon-and-arrow", "return-modal1");

    let arrowLeft = document.createElement("i");
    arrowLeft.classList.add("fa-solid", "fa-arrow-left-long");

    let blockAddElementModal2 = document.createElement("div");
    blockAddElementModal2.classList.add("block-add-element-modal2");

    let modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title");
    modalTitle.innerHTML = "Ajout photo";

    let blockPictureAndButton = document.createElement("div");
    blockPictureAndButton.classList.add("block-picture-and-button");
    
    let blockAddIcon = document.createElement("div");
    blockAddIcon.classList.add("block-add-icon");
    
    let addPictureIcon = document.createElement("i");
    addPictureIcon.classList.add("fa-regular", "fa-image");

    let styleInputAddElement = document.createElement("div");
    styleInputAddElement.classList.add("button_appearance", "add-new-picture");
    styleInputAddElement.innerHTML = "+ Ajout photo";

    let addPictureInput = document.createElement("input");
    addPictureInput.classList.add("input-add-element");
    addPictureInput.type = "file";
    addPictureInput.accept = ".jpg, .jpeg, .png";
    addPictureInput.maxSize = 4 * 1024 * 1024; // 4 Mo
    addPictureInput.placeholder = "+ Ajout photo";

    let infoAddInput = document.createElement("p");
    infoAddInput.innerHTML = "jpg, png : 4mo max";

    let formAddPicture = document.createElement("form");
    formAddPicture.classList.add("form-add-picture");
    formAddPicture.action = "#";
    formAddPicture.methode = "post";

    let labelAddTitle = document.createElement("label");
    labelAddTitle.classList.add("label-add-title");
    labelAddTitle.for = "title";
    labelAddTitle.innerHTML = "Titre";

    let inputAddTitle = document.createElement("input");
    inputAddTitle.classList.add("form-style", "add-title");
    inputAddTitle.type = "text";
    inputAddTitle.name = "titre";
    inputAddTitle.maxLength = 30;
    inputAddTitle.minLength = 10;
    inputAddTitle.autocomplete = "off";

    let labelSelectCategorie = document.createElement("label");
    labelSelectCategorie.classList.add("label-add-title", "title-form2");
    labelSelectCategorie.for = "categories";
    labelSelectCategorie.innerHTML = "Catégorie"

    let selectCategorie = document.createElement("select");
    selectCategorie.classList.add("form-style", "add-categories");
    selectCategorie.type = "categories";
    selectCategorie.name = "categories";

    let optionNullCategories = document.createElement("option");
    optionNullCategories.value = "vide";
    optionNullCategories.innerText = "";

    let colorBar = document.createElement("div");
    colorBar.classList.add("color-bar");

    let validAddElement = document.createElement("button");
    validAddElement.classList.add("button_appearance", "validate-picture");
    validAddElement.innerHTML = "Valider";

    // Rattachement des éléments à leurs parents //
    blockIcon.insertBefore(blockArrowLeftIcon, blockIcon.firstChild);
    blockArrowLeftIcon.appendChild(arrowLeft);
    modalContent.appendChild(blockAddElementModal2); 
    blockAddElementModal2.appendChild(modalTitle);
    blockAddElementModal2.appendChild(blockPictureAndButton);
    blockAddElementModal2.appendChild(formAddPicture);
    blockAddElementModal2.appendChild(colorBar);
    blockAddElementModal2.appendChild(validAddElement);
    formAddPicture.appendChild(labelAddTitle);
    formAddPicture.appendChild(inputAddTitle);
    formAddPicture.appendChild(labelSelectCategorie);
    formAddPicture.appendChild(selectCategorie);
    selectCategorie.appendChild(optionNullCategories);
    blockPictureAndButton.appendChild(blockAddIcon);
    blockPictureAndButton.appendChild(addPictureInput);
    blockPictureAndButton.appendChild(styleInputAddElement);
    blockPictureAndButton.appendChild(infoAddInput);
    blockAddIcon.appendChild(addPictureIcon);

    // Changement de style pour des éléments de la modal2 //
    modalWindow.style.height = "670px";
    blockIcon.style.justifyContent = "space-between";

    addListCategoriesInsideForm();
    returnOnModal1();
};

checkTokenForAdminMode();
setupLogout();
setupModalOpening();

function addListCategoriesInsideForm() {
    let selectElementCategoriesList = document.querySelector("select");

    fetch("http://localhost:5678/api/categories")
        .then(response => {
            if (response.status === 200) {
                console.log("Requête réussie : Code 200");
                return response.json();
            } else {
                throw new Error(`Erreur de récupération des catégories : Code ${response.status}`);
            }
        })
        .then(data => {
        data.forEach(category => {
            let option = document.createElement("option");
            option.value = category.id;
            option.text = category.name;
  
            selectElementCategoriesList.appendChild(option);
        });
        })
        .catch(error => {
        console.error(error);
    });
};