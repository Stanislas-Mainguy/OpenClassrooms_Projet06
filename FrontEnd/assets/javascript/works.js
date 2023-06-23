// Section des variables //
const gallery = document.querySelector(".gallery");
const filtersNav = document.querySelector(".block_filters");
const logout = document.querySelector("#login_logout");
const body = document.querySelector("body");
let dataListForHtml = [];
let dataFilterListForHtml = [];

// Récupération du tableau des images dans l'API //
function getDataForHtml() {
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(picturesData => {
        dataListForHtml.push(...picturesData);
        createCardForHtml();
    });
};

// Récupération du tableau des filtres dans l'API //
function getFilterForHtml() {
    fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(filterData => {
        dataFilterListForHtml.push({id: 0, name: "Tous"}, ...filterData);
        createFilterForHtml();
    });
};

// Création de la balise <ul></ul> dans la balise <nav></nav> //
function createFilterForHtml() {
    const filtersList = document.createElement("ul");
    filtersList.id = "filters";
    filtersNav.appendChild(filtersList);
    
    // Création des balises <li></li> dans la balise <ul></ul> //
    filtersList.innerHTML = "";
    dataFilterListForHtml.forEach(element => {
        let li = document.createElement("li");
        li.classList.add("filter", "button_appearance", "admin");
        li.dataset.categoryId = element.id;
        li.innerHTML = element.name;
        filtersList.appendChild(li);
    });

        // Ajout de l'eventListener sur les filtres //
        document.querySelectorAll(".filter").forEach(element => {
            element.addEventListener('click', function () {
              const categoryId = parseInt(this.dataset.categoryId);
              createCardForHtml(categoryId);
        });
    });
};

// Création de la fonction de filtres et la génération des balises html en conséquence // 
function createCardForHtml(category = 0) {
    gallery.innerHTML = "";
    dataListForHtml.forEach(element => {
        if ( category === 0 || element.categoryId === category) {
            let figure = document.createElement("figure");
            
            let img = document.createElement("img");
            img.src = element.imageUrl;
            img.alt = element.title;

            let figcaption = document.createElement("figcaption");
            figcaption.innerHTML = element.title;

            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        };
    });
};

// Appel des fonctions pour générer les filtres et la galerie des photos actualisés //
getDataForHtml();
getFilterForHtml();



                    // SECTION POUR ALLER SUR LA PAGE DE L'ADMIN //

// Vérification du token dans le localStorage //
document.addEventListener("DOMContentLoaded", function() {
    const token = localStorage.getItem("token");

    // Si présence d'un token, création des éléments et changement de style pour les éléments suivant //
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
        editPictureContainer.classList.add("edit-picture", "modal-opening");

        let spanModifier = document.createElement("span");
        spanModifier.innerText = "modifier";

        let editIntroContainer = document.createElement("div");
        editIntroContainer.classList.add("edit-intro", "modal-opening");

        let editProjectContainer = document.createElement("div");
        editProjectContainer.classList.add("edit-project", "modal-opening");

        // Création des éléments liés à l'ouverture de la modal //
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
});

// Fonction de création d'un block div pour intégration dans les appendChild au dessus //
function createDivContainerWithElements() {
    let divContainer = document.createElement("div");
    divContainer.classList.add("edit-container");
    
    let penIcon = document.createElement("i");
    penIcon.classList.add("fa-regular", "fa-pen-to-square");
    
    let spanModifier = document.createElement("span");
    spanModifier.innerText = "modifier";

    divContainer.appendChild(penIcon);
    divContainer.appendChild(spanModifier);

    return divContainer;
};

// Création de l'eventListener pour le logout //
logout.addEventListener("click", function() {
    localStorage.clear();
    window.location.href = "./index.html";
});