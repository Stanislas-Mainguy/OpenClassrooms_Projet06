                            // SECTION POUR ALLER SUR LA PAGE DE L'ADMIN //

// Fonction de création d'élément //                            
function createElement(element, attributes = {}) {
    let newElement = document.createElement(element);
    if (attributes.id) {
        newElement.id = attributes.id;
    }
    if (attributes.class && Array.isArray(attributes.class)) {
        attributes.class.forEach(function(classList) {
            newElement.classList.add(classList);
    });
    } else if (attributes.class) {
        newElement.classList.add(attributes.class);
    }
    if (attributes.type) {
        newElement.type = attributes.type;
    }
    if (attributes.text) {
        newElement.innerText = attributes.text;
    }
    if (attributes.attribute) {
        newElement.setAttribute(attributes.attribute[0], attributes.attribute[1]);
    }
    if (attributes.src) {
        newElement.src = attributes.src;
    }
    if (attributes.alt) {
        newElement.alt = attributes.alt;
    }
    return newElement;
};

// Fonction d'ajout pour les childs //
function addChild(parent, ...children) {
    children.forEach(function(child) {
        parent.appendChild(child);
    });
};

// Vérification du token dans le localStorage //
function checkTokenForAdminMode() {
    const token = localStorage.getItem("token");
    const body = document.querySelector("body");

    // S'il y a la présence d'un token, création des éléments et changement de style pour les éléments suivant //
    if (token) {
        // Section des constantes pour le changement de la page admin //
        const editH2Project = document.querySelector(".admin-project-edit");
        const articleIntroEdit = document.querySelector(".intro");
        const footer = document.querySelector("footer");

        // Section de création des éléments admin //
        let editMode = createElement("div",{ id: "edit-mode"});
        let editContainer = createElement("div", {class: ["edit-container", "modal-opening"]});
        let penIcon = createElement("i", { class: ["fa-regular", "fa-pen-to-square"]});
        let spanEditMode = createElement("span", {class: "span-edit-mode", text: "Mode édition"});
        let publishButtonChanges = createElement("button", {id: "publish-changes", class: "button_appearance", type: "button", text: "Publier les changements"});
        let editPictureContainer = createElement("div", {class: "edit-picture"});
        let editIntroContainer = createElement("div",{class:"edit-intro"});
        let editProjectContainer = createElement("div", {class : "edit-project"});
        let modalElement = createElement("aside", {id: "modal", attribute: ["aria-hidden","true"]});
        let overlayElement = createElement("div",{id : "overlay", class:"close-modal"});

        // Rattachement des éléments à leurs parents //
        addChild(editContainer, penIcon, spanEditMode); 
        addChild(editMode, editContainer, publishButtonChanges);
        body.insertBefore(editMode, body.firstElementChild);
        addChild(document.querySelector(".figure-edit-element"), editPictureContainer);
        addChild(editPictureContainer, createDivContainerWithElements());
        articleIntroEdit.insertBefore(editIntroContainer, articleIntroEdit.firstChild);
        addChild(editIntroContainer, createDivContainerWithElements());
        addChild(editH2Project, editProjectContainer);
        addChild(editProjectContainer, createDivContainerWithElements());
        footer.insertAdjacentElement("afterend", modalElement);
        footer.insertAdjacentElement("afterend", overlayElement);
        
        // Modification de style pour certains éléments //
        document.querySelector("#login_logout").textContent = "logout";
        document.querySelector(".block_filters").style.display = "none";
        document.querySelector("header").style.marginTop = "97px";
        editH2Project.style.marginBottom = "92px";
        editH2Project.style.marginTop = "108px";
    };
};

// Fonction de création d'un block div pour intégration dans les appendChild au dessus //
function createDivContainerWithElements() {
    let divContainer = createElement("div", {class: ["div-edit-size", "modal-opening"]});
    let penIcon = createElement("i", {class: ["fa-regular", "fa-pen-to-square"]});
    let spanModifier = createElement("span", {text: "modifier"});

    addChild(divContainer, penIcon, spanModifier);
    
    return divContainer;
};

                                
                                // SECTION DES EVENTLISTENER //
    
// Ouverture de la modale  et fermeture //
function setupModal(opening = true) {
    let classModal = ".modal-opening";
    let display = "block";
    if(!opening) {
        classModal = ".close-modal";
        display = "none";
    }
    const modalWindow = document.querySelector("#modal");
    document.querySelectorAll(classModal).forEach(function(element) {
        element.addEventListener("click", function() {
            modalWindow.style.display = display;
            modalWindow.setAttribute("aria-hidden", !opening);
            document.querySelector("#overlay").style.display = display;
            if (opening) {
                modal1(modalWindow);
            };
        });
    });
};

// Changement de la modal1 en modal2 //
function changeToModal2() {
    document.querySelector("#add-element").addEventListener("click", function() {
        modal2();
    });
};

// Retour de la modal2 à la modal1 //
function returnOnModal1() {
    document.querySelector(".return-modal1").addEventListener("click", function() {
        modal1(document.querySelector("#modal"));
    });
};

// Création de l'eventListener pour le logout //
function setupLogout() {
    document.querySelector("#login_logout").addEventListener("click", function() {
        localStorage.clear();
        window.location.href = "./index.html";
    });
};



                                    // SECTION DES FONCTIONS //

// Fonction de création de liste catégories pour la balise <select></select> de la modal2 //                                    
function addListCategoriesInsideForm() {
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
            
            addChild(document.querySelector("select"), option);
            });
        })
        .catch(error => {
        console.error(error);
    });
};

// Fonction qui insère l'image sélectionnée pour avoir un visuel //
function showNewPicture() {
    const blockPictureAndButton = document.querySelector(".block-picture-and-button");
    const titleInput = document.querySelector(".add-title");
    const categorySelect = document.querySelector(".add-categories");

    document.querySelector(".input-add-element").addEventListener("change", function (event) {
        if (event.target.files.length > 0) {
            blockPictureAndButton.innerHTML = "";

            const imgElement = createElement("img", {class: "add-new-picture-element-selected", src: URL.createObjectURL(event.target.files[0])});
            const divPictureNewAdd = createElement("div", {class: "block-new-element-picture"});
            
            addChild(blockPictureAndButton, divPictureNewAdd);
            addChild(divPictureNewAdd, imgElement);

            document.querySelector(".message-modal2").innerHTML = "Veuillez maintenant choisir un titre et une catégorie.";
            titleInput.disabled = false;
            titleInput.placeholder = "";
            titleInput.style.cursor = "text";
            categorySelect.disabled = false;
            categorySelect.style.cursor = "pointer";
            document.querySelector("option").text = "";

            createPostRequest();
        };
    });
};

// Fonction de validation d'état pour les input du modal2 //
function checkValidity() {
    const validatePicture = document.querySelector("#validate-picture");
    if (document.querySelector(".input-add-element").files.length === 1 &&
        document.querySelector(".add-title").value.trim() !== "" &&
        document.querySelector(".add-categories").value !== "") {
        validatePicture.disabled = false;
        validatePicture.style.backgroundColor = "#1D6154";
        validatePicture.style.color = "#FFFFFF";
        validatePicture.style.cursor = "pointer";
        document.querySelector(".message-modal2").innerHTML = "Veuillez maintenant valider votre requête.";
    } else {
        validatePicture.disabled = true;
        validatePicture.style.backgroundColor = "";
        validatePicture.style.color = "";
        validatePicture.style.cursor = "";
    };
};

// Fonction pour l'envoi du fichier image //
function createPostRequest() {
    const titleInput = document.querySelector(".add-title");
    const categorySelect = document.querySelector(".add-categories");
    const messageForModal2 = document.querySelector(".message-modal2");
    const modalWindow = document.querySelector("#modal");
    
    titleInput.addEventListener("keyup", checkValidity);
    categorySelect.addEventListener("change", checkValidity);
  
    document.querySelector("#validate-picture").addEventListener("click", function (e) {
        e.preventDefault();
        const selectedImg = document.querySelector(".input-add-element").files[0];
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

                let figure = createElement("figure");
                let img = createElement("img", {src: selectedImg});
                let figcaption = createElement("figcaption", {text: titleInput.value.trim()});
                
                modalWindow.style.display = "none";
                document.querySelector("#overlay").style.display = "none";
                modalWindow.setAttribute("aria-hidden", "true");

                addChild(document.querySelector(".gallery"), figure);
                addChild(figure, img, figcaption);
            } else {
                let message = "";
                let messageThrow = "";
                switch (response.status) {
                    case 400:
                        message ="Requête incorrecte. Veuillez vérifier les données envoyées.";
                        messageThrow= "Requête incorrecte";
                        break;
                    case 401:
                        message ="Non autorisé. Veuillez vous connecter.";
                        messageThrow ="Non autorisé";
                        break;
                    case 500:
                        message ="Erreur interne du serveur. Veuillez réessayer ultérieurement.";
                        messageThrow = "Erreur interne du serveur";
                        break;
                    default:
                        message ="Erreur inattendue !";
                        messageThrow="Erreur inattendue !";
                        break;
                }
                console.log(message);
                messageForModal2.innerHTML = message;
                messageForModal2.style.color = "red";
                throw new Error(messageThrow);
            }
            })
            .catch((error) => {
                console.error("Une erreur s'est produite lors de la requête POST :", error);
            });
    });
};
  
// Fonction qui désactive le bouton "entrer" //
function enterButtonDisable() {
    document.querySelector("#modal").addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        };
    });
};

// Fonction pour créer la modal //
function modal1(modalWindow) {
    modalWindow.innerHTML = "";

    // Création des éléments liés à l'ouverture de la modale //
    let blockIcon = createElement("div", {class: "block-icon"});
    let blockCrossIcon = createElement("div", {class: ["block-cross-icon-and-arrow", "close-modal"]});
    let crossIcon = createElement("i", {class: ["fa-solid", "fa-xmark"]});
    let modalContent = createElement("div", {id: "modal-content"});
    let blockAddingElement = createElement("div", {class: "block-adding-element"});
    let modalTitle = createElement("h2", {class: "modal-title", text: "Galerie photo"});
    let arrayElement = createElement("div", {id: "array-element"});
    let colorBar = createElement("div", {class: "color-bar"});
    let blockButton = createElement("div", {class: "block-button"});
    let messageForModal1 = createElement("div", {class: "message-modal1"});
    let buttonAddElement = createElement("button", {id: "add-element", class: ["add-button", "button_appearance"], text: "Ajouter une photo"});
    let buttonDeleteAllElement = createElement("button", {id: "delet-all-element", class: "delete-button", text: "Supprimer la galerie"});

    // Rattachement des éléments à leurs parents //
    addChild(modalWindow, blockIcon, modalContent);
    addChild(blockIcon, blockCrossIcon);
    addChild(blockCrossIcon, crossIcon);
    addChild(modalContent, blockAddingElement);
    addChild(blockAddingElement, modalTitle, arrayElement, colorBar, blockButton);
    addChild(blockButton, messageForModal1, buttonAddElement, buttonDeleteAllElement);

    // Changement de taille pour la modale //
    modalWindow.style.height = "auto";

    // Appel de la fonction pour afficher les éléments dans le tableau //
    displayElementsInArray(arrayElement);

    // Autres fonctions et configurations pour la modal //
    setupModal(false);
    changeToModal2();
    enterButtonDisable();
};

// Fonction pour afficher les éléments dans le tableau //
function displayElementsInArray(arrayElement) {
    fetch("http://localhost:5678/api/works")
        .then((response) => response.json())
        .then((data) => {
            arrayElement.innerHTML = "";
            data.forEach((element) => {
                let figure = createElement("figure", {class: "modal-figures"});
                let img = createElement("img", {class: "modal-pictures", src: element.imageUrl, alt: element.title});
                let figcaption = createElement("figcaption", {text: "éditer"});
                let blockIcon1 = createElement("div", {class: ["modal-icon", "multi-arrows"]});
                let arrowIcon = createElement("i", {class: ["fa-solid", "fa-up-down-left-right"]});
                let blockIcon2 = createElement("div", {class: ["modal-icon", "trash-icon"]});
                let trashIcon = createElement("i", {class: ["fa-regular", "fa-trash-can"]});
                
                // Rattachement des éléments à leurs parents //
                addChild(figure, img, figcaption, blockIcon1, blockIcon2);
                addChild(blockIcon1, arrowIcon);
                addChild(blockIcon2, trashIcon);
                addChild(arrayElement, figure);

                // Ajout de l'eventListener sur l'icône de suppression //
                blockIcon2.addEventListener("click", function (e) {
                    e.preventDefault();
                    deleteElement(element.id, arrayElement);
                });
            });
        });
};

// Fonction pour supprimer un élément //
function deleteElement(elementId, arrayElement) {
    const messageForModal1 = document.querySelector(".message-modal1");

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token"));

    // Appel de la méthode DELETE pour l'API //
    fetch("http://localhost:5678/api/works/" + elementId, {
        method: "DELETE",
        headers: myHeaders,
    })
        .then((response) => {
            if (response.status === 200 || response.status === 204) {
                console.log("Suppression réussie !");
                messageForModal1.innerHTML = "Suppression réussie !";
                messageForModal1.style.color = "green";
                fetchGalleryElements();
                displayElementsInArray(arrayElement);
            } else {
                let message = "";
                let messageThrow = "";
                switch (response.status) {
                    case 401:
                        message = "Non autorisé. Veuillez vous connecter.";
                        messageThrow = "Non autorisé";
                        break;
                    case 500:
                        message = "Erreur interne du serveur. Veuillez réessayer ultérieurement.";
                        messageThrow = "Erreur interne du serveur";
                        break;
                    default:
                        message = ("Erreur inattendue :", response.status);
                        messageThrow = ("Erreur inattendue : " + response.status);
                }    
                console.log(message);
                messageForModal1.innerHTML = message;
                messageForModal1.style.color = "red";
                throw new Error(messageThrow);
            }
        })
        .catch((error) => {
            console.error("Une erreur s'est produite lors de la requête DELETE :", error);
        });
};

// Appel à l'API pour refresh la galerie principal //
function fetchGalleryElements() {
    const gallery = document.querySelector(".gallery");
  
    fetch("http://localhost:5678/api/works")
        .then((response) => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erreur de récupération des éléments de la galerie");
            }
        })
        .then((data) => {
            gallery.innerHTML = "";
            data.forEach((element) => {
            let figure = createElement("figure");
            let img = createElement("img", {src: element.imageUrl, alt: element.title});
            let figcaption = createElement("figcaption", {text: element.title});
            
            addChild(figure, img, figcaption);
            addChild(gallery, figure);
            });
        })
        .catch((error) => {
            console.error("Une erreur s'est produite lors de la récupération des éléments de la galerie :", error);
        });
};


// Changement de la modal1 au clique sur le bouton d'ajout pour passer à l'interface de la modal2 //
function modal2() {
    const modalContent = document.querySelector("#modal-content");
    const blockIcon = document.querySelector(".block-icon");
    modalContent.innerHTML = "";

    // Création des éléments liés à l'ouverture de la modale //
    let blockArrowLeftIcon = createElement("div", {class: ["block-cross-icon-and-arrow", "return-modal1"]});
    let arrowLeft = createElement("i", {class: ["fa-solid", "fa-arrow-left-long"]});
    let blockAddElementModal2 = createElement("div", {class: "block-add-element-modal2"});
    let modalTitle = createElement("h2", {class: "modal-title", text: "Ajout photo"});
    let colorBar = createElement("div", {class: ["color-bar", "bar-modal2"]});

    let formAddPicture = document.createElement("form");
    formAddPicture.classList.add("form-add-picture");
    formAddPicture.method = "post";
    formAddPicture.action = "#";
    formAddPicture.enctype = "multipart/form-data";

    let blockPictureAndButton = createElement("div", {class: "block-picture-and-button"});
    let blockAddIcon = createElement("div", {class: "block-add-icon"});
    let addPictureIcon = createElement("i", {class: ["fa-regular", "fa-image"]});
    let styleInputAddElement = createElement("div", {class: ["button_appearance", "add-new-picture"], text: "+ Ajout photo"});
    
    let addPictureInput = document.createElement("input");
    addPictureInput.classList.add("input-add-element");
    addPictureInput.type = "file";
    addPictureInput.accept = ".jpg, .jpeg, .png";
    addPictureInput.maxSize = 4 * 1024 * 1024; // 4 Mo
    addPictureInput.placeholder = "+ Ajout photo";

    let infoAddInput = createElement("p", {text: "jpg, png : 4mo max"});

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

    let messageForModal2 = createElement("div", {class: "message-modal2", text: "Veuillez sélectionner une image."}); 

    let validAddElement = document.createElement("input");
    validAddElement.classList.add("button_appearance");
    validAddElement.id = "validate-picture";
    validAddElement.type = "submit";
    validAddElement.value = "Valider";
    validAddElement.disabled = true;

    // Rattachement des éléments à leurs parents //
    blockIcon.insertBefore(blockArrowLeftIcon, blockIcon.firstChild);
    addChild(blockArrowLeftIcon, arrowLeft);
    addChild(modalContent, blockAddElementModal2);
    addChild(blockAddElementModal2, modalTitle, formAddPicture, colorBar, messageForModal2); 
    addChild(formAddPicture, blockPictureAndButton, labelAddTitle, inputAddTitle, labelSelectCategorie, selectCategorie, validAddElement);
    addChild(selectCategorie, optionNullCategories);
    addChild(blockPictureAndButton, blockAddIcon, addPictureInput, styleInputAddElement, infoAddInput);
    addChild(blockAddIcon, addPictureIcon);

    // Changement de style pour des éléments de la modal2 //
    document.querySelector("#modal").style.height = "670px";
    blockIcon.style.justifyContent = "space-between";

    addListCategoriesInsideForm();
    returnOnModal1();
    showNewPicture();
};

checkTokenForAdminMode();
setupLogout();
setupModal(true);