                                    // SECTION DES VARIABLES //

let dataListForHtml = [];
let dataFilterListForHtml = [];


                                    // SECTION DES APPELS FETCH//

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


                            // SECTION DES FONCTIONS QUI GÉNÈRE LE CONTENU //

// Création de la balise <ul></ul> dans la balise <nav></nav> //
function createFilterForHtml() {
    const filtersNav = document.querySelector(".block_filters");
    const filtersList = document.createElement("ul");
    filtersList.id = "filters";
    filtersNav.appendChild(filtersList);
    
    // Création des balises <li></li> dans la balise <ul></ul> //
    filtersList.innerHTML = "";
    dataFilterListForHtml.forEach(element => {
        let li = document.createElement("li");
        li.classList.add("filter", "button_appearance");
        li.dataset.categoryId = element.id;
        li.innerHTML = element.name;
        filtersList.appendChild(li);
    

        // Ajout de l'eventListener sur les filtres pour activation //
        li.addEventListener("click", function () {
            const filters = document.querySelectorAll(".filter");
            filters.forEach(filter => {
                filter.classList.remove("active");
            });

            this.classList.add("active");

            const categoryId = parseInt(this.dataset.categoryId);
            createCardForHtml(categoryId);
        });
    });
};

// Création de la fonction de filtres et la génération des balises html en conséquence // 
function createCardForHtml(category = 0) {
    const gallery = document.querySelector(".gallery");

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

// Fonction qui désactive le bouton "entrer" sur le formulaire //
function enterButtonDisableForBasePage() {
    const contactElement = document.querySelector("#contact");

    contactElement.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    });
};

getDataForHtml();
getFilterForHtml();
enterButtonDisableForBasePage();