// Section des variables //
const gallery = document.querySelector(".gallery");
const filtersNav = document.querySelector(".block_filters");
const logout = document.querySelector("#login_logout");
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
    
    // Si présence d'un token, changement de style pour les éléments suivant //
    if (token) {
        const editLogin = document.querySelector("#login_logout");
        const editModeSection = document.querySelector("#edit-mode");
        const editContainer = document.querySelectorAll(".edit-container");
        const editFiltres = document.querySelector(".block_filters")
        const editHeader = document.querySelector("header");
        const editH2Project = document.querySelector(".admin-project-edit");
        
        editLogin.innerText = "",
        editLogin.textContent = "logout";
        editModeSection.style.display = "flex";
        editContainer.forEach((editContainer) => {
            editContainer.style.display = "flex";
        });
        editFiltres.style.display = "none";
        editHeader.style.marginTop = "97px";
        editH2Project.style.marginBottom = "92px";
        editH2Project.style.marginTop = "108px";
    }
});

// Création de l'eventListener pour le logout //
logout.addEventListener("click", function() {
    localStorage.clear();
    window.location.href = "./index.html";
});