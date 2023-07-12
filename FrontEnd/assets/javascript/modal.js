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



                                    // SECTION DES FONCTIONS //

// Fonction de création de liste catégories pour la balise <select></select> de la modal2 //                                    
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

// Fonction qui insère l'image sélectionnée pour avoir un visuel //
function showNewPicture() {
    const blockPictureAndButton = document.querySelector(".block-picture-and-button");
    const fileInput = document.querySelector(".input-add-element");
    const messageForModal2 = document.querySelector(".message-modal2");
    const titleInput = document.querySelector(".add-title");
    const categorySelect = document.querySelector(".add-categories");
    let optionNullCategories = document.querySelector("option");

    fileInput.addEventListener("change", function (event) {
        if (event.target.files.length > 0) {
            blockPictureAndButton.innerHTML = "";
            const selectedFile = event.target.files[0];

            const divPictureNewAdd = document.createElement("div");
            divPictureNewAdd.classList.add("block-new-element-picture");

            const imgElement = document.createElement("img");
            imgElement.classList.add("add-new-picture-element-selected");

            const fileURL = URL.createObjectURL(selectedFile);
            imgElement.src = fileURL;

            blockPictureAndButton.appendChild(divPictureNewAdd);
            divPictureNewAdd.appendChild(imgElement);

            selectedImg = selectedFile;

            messageForModal2.innerHTML = "Veuillez maintenant choisir un titre et une catégorie.";
            titleInput.disabled = false;
            titleInput.placeholder = "";
            titleInput.style.cursor = "text";
            categorySelect.disabled = false;
            categorySelect.style.cursor = "pointer";
            optionNullCategories.text = "";

            createPostRequest();
        };
    });
};

// Fonction de validation d'état pour les input du modal2 //
function checkValidity() {
    const validatePicture = document.querySelector("#validate-picture");
    const messageForModal2 = document.querySelector(".message-modal2");
    const titleInput = document.querySelector(".add-title");
    const categorySelect = document.querySelector(".add-categories");
    if (selectedImg && titleInput.value.trim() !== "" && categorySelect.value !== "") {
      validatePicture.disabled = false;
      validatePicture.style.backgroundColor = "#1D6154";
      validatePicture.style.color = "#FFFFFF";
      validatePicture.style.cursor = "pointer";
      messageForModal2.innerHTML = "Veuillez maintenant valider votre requête.";
    } else {
      validatePicture.disabled = true;
      validatePicture.style.backgroundColor = "";
      validatePicture.style.color = "";
      validatePicture.style.cursor = "";
    };
};

// Fonction pour l'envoi du fichier image //
function createPostRequest() {
    const validatePicture = document.querySelector("#validate-picture");
    const titleInput = document.querySelector(".add-title");
    const categorySelect = document.querySelector(".add-categories");
    const messageForModal2 = document.querySelector(".message-modal2");
    const gallery = document.querySelector(".gallery");
    
    titleInput.addEventListener("keyup", checkValidity);
    categorySelect.addEventListener("change", checkValidity);

  
    validatePicture.addEventListener("click", function (e) {
        e.preventDefault();
        const formData = new FormData();
        let myHeaders = new Headers();
  
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
        formData.append("image", selectedImg);
        formData.append("title", titleInput.value.trim());
        formData.append("category", parseInt(categorySelect.value));
    
        fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: myHeaders,
            body: formData,
        })
            .then((response) => {
            if (response.status === 201) {
                console.log("Création réussie !");

                let figure = document.createElement("figure");
                let img = document.createElement("img");
                img.src = URL.createObjectURL(selectedImg);
                img.title = formData.append("title", titleInput.value.trim());

                gallery.appendChild(figure);
                figure.appendChild(img);
            } else if (response.status === 400) {
                console.log("Requête incorrecte. Veuillez vérifier les données envoyées.");
                messageForModal2.innerHTML = "Requête incorrecte. Veuillez vérifier les données envoyées.";
                messageForModal2.style.color = "red";
                throw new Error("Requête incorrecte");
            } else if (response.status === 401) {
                console.log("Non autorisé. Veuillez vous connecter.");
                messageForModal2.innerHTML = "Non autorisé. Veuillez vous connecter.";
                messageForModal2.style.color = "red";
                throw new Error("Non autorisé");
            } else if (response.status === 500) {
                console.log("Erreur interne du serveur. Veuillez réessayer ultérieurement.");
                messageForModal2.innerHTML = "Erreur interne du serveur. Veuillez réessayer ultérieurement.";
                messageForModal2.style.color = "red";
                throw new Error("Erreur interne du serveur");
            } else {
                console.log("Erreur inattendue :", response.status);
                messageForModal2.innerHTML = "Erreur inattendue !";
                messageForModal2.style.color = "red";
                throw new Error("Erreur inattendue");
            }
            })
            .catch((error) => {
                console.error("Une erreur s'est produite lors de la requête POST :", error);
            });
    });
};
  
  

// Fonction qui désactive le bouton "entrer" //
function enterButtonDisable() {
    const modal = document.querySelector("#modal");

    modal.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        };
    });
};
  


                            // SECTION DE STRUCTURATION DES MODALES //

// Fonction d'ouverture de la modale avec création des éléments internes à celle-ci //
function modal1(modalWindow) {
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
    modalWindow.style.height = "auto";
    
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

                // Création d'un eventListener pour tous les éléments trashIcon //
                blockIcon2.addEventListener("click", function(e) {
                    e.preventDefault();
                    let myHeaders = new Headers();
                    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));
                    
                    // Appel de la méthode DELETE pour l'API //
                    fetch("http://localhost:5678/api/works/" + element.id, {
                        method: "DELETE",
                        headers: myHeaders,
                    })
                    .then(response => {
                        if (response.status === 200 || response.status === 204) {
                            console.log("Suppression réussie !");
                        } else if (response.status === 401) {
                            console.log("Non autorisé. Veuillez vous connecter.");
                            throw new Error("Non autorisé");
                        } else if (response.status === 500) {
                            console.log("Erreur interne du serveur. Veuillez réessayer ultérieurement.");
                            throw new Error("Erreur interne du serveur");
                        } else {
                            console.log("Erreur inattendue :", response.status);
                            throw new Error("Erreur inattendue : " + response.status);
                        }
                    })
                    .catch(error => {
                        console.error("Une erreur s'est produite lors de la requête DELETE :", error);
                    });
                });
                
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
    enterButtonDisable();
};

// Changement de la modal1 au clique sur le bouton d'ajout pour passer à l'interface de la modal2 //
function modal2() {
    const modalWindow = document.querySelector("#modal");
    const modalContent = document.querySelector("#modal-content");
    const blockIcon = document.querySelector(".block-icon");
    modalContent.innerHTML = "";

    // Création des éléments liés à l'ouverture de la modale //
    let blockArrowLeftIcon = document.createElement("div");
    blockArrowLeftIcon.classList.add("block-cross-icon-and-arrow", "return-modal1");

    let arrowLeft = document.createElement("i");
    arrowLeft.classList.add("fa-solid", "fa-arrow-left-long");

    let blockAddElementModal2 = document.createElement("div");
    blockAddElementModal2.classList.add("block-add-element-modal2");

    let modalTitle = document.createElement("h2");
    modalTitle.classList.add("modal-title");
    modalTitle.innerHTML = "Ajout photo";

    let colorBar = document.createElement("div");
    colorBar.classList.add("color-bar", "bar-modal2");

    let formAddPicture = document.createElement("form");
    formAddPicture.classList.add("form-add-picture");
    formAddPicture.method = "post";
    formAddPicture.action = "#";
    formAddPicture.enctype = "multipart/form-data";

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

    let labelAddTitle = document.createElement("label");
    labelAddTitle.classList.add("label-add-title");
    labelAddTitle.for = "title";
    labelAddTitle.innerHTML = "Titre";

    let inputAddTitle = document.createElement("input");
    inputAddTitle.classList.add("form-style", "add-title");
    inputAddTitle.type = "text";
    inputAddTitle.name = "titre";
    inputAddTitle.placeholder = "Veuillez d'abord choisir une image.";
    inputAddTitle.maxLength = 30;
    inputAddTitle.minLength = 10;
    inputAddTitle.autocomplete = "off";
    inputAddTitle.disabled = true;

    let labelSelectCategorie = document.createElement("label");
    labelSelectCategorie.classList.add("label-add-title", "title-form2");
    labelSelectCategorie.for = "categories";
    labelSelectCategorie.innerHTML = "Catégorie"

    let selectCategorie = document.createElement("select");
    selectCategorie.classList.add("form-style", "add-categories");
    selectCategorie.type = "categories";
    selectCategorie.name = "categories";
    selectCategorie.disabled = true;

    let optionNullCategories = document.createElement("option");
    optionNullCategories.value = "";
    optionNullCategories.text = "Veuillez d'abord choisir une image.";

    let messageForModal2 = document.createElement("div");
    messageForModal2.classList.add("message-modal2");
    messageForModal2.innerHTML = "Veuillez sélectionner une image."

    let validAddElement = document.createElement("input");
    validAddElement.classList.add("button_appearance");
    validAddElement.id = "validate-picture";
    validAddElement.type = "submit";
    validAddElement.value = "Valider";
    validAddElement.disabled = true;

    // Rattachement des éléments à leurs parents //
    blockIcon.insertBefore(blockArrowLeftIcon, blockIcon.firstChild);
    blockArrowLeftIcon.appendChild(arrowLeft);
    modalContent.appendChild(blockAddElementModal2); 
    blockAddElementModal2.appendChild(modalTitle);
    blockAddElementModal2.appendChild(formAddPicture);
    blockAddElementModal2.appendChild(colorBar);
    blockAddElementModal2.appendChild(messageForModal2);
    formAddPicture.appendChild(blockPictureAndButton);
    formAddPicture.appendChild(labelAddTitle);
    formAddPicture.appendChild(inputAddTitle);
    formAddPicture.appendChild(labelSelectCategorie);
    formAddPicture.appendChild(selectCategorie);
    formAddPicture.appendChild(validAddElement);
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
    showNewPicture();
};

checkTokenForAdminMode();
setupLogout();
setupModalOpening();

if (performance.navigation.type === 1) {
    console.log("La page a été rechargée");
  } else {
    console.log("La page n'a pas été rechargée");
}