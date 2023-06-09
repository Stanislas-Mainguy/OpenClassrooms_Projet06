// Section des variables //
const gallery = document.querySelector(".gallery");
const filters = document.querySelector("#filters");
const filtersNav = document.querySelector(".block_filters");
gallery.innerHTML = "";
let dataListForHtml = [];
let dataFilterListForHtml = [];
let dataCardListForHtml = [];

// Récupération du tableau des images dans l'api //
function getDataForHtml() {
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(picturesData => {
        dataListForHtml.push(...picturesData);
        createCardForHtml();
    });
};

// Récupération du tableau des filtres dans l'api //
function getFilterForHtml() {
    fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(filterData => {
        dataFilterListForHtml.push({ id: 0, name: "Tous"}, ...filterData);
        createFilterForHtml();
    });
};

// Création de la balise ul dans la balise Nav //
function createFilterForHtml() {
    const filtersList = document.createElement("ul");
    filtersList.id = "filters";
    filtersNav.appendChild(filtersList);
    
    // Création des balises li dans la balise ul //
    filtersList.innerHTML = "";
    dataFilterListForHtml.forEach(element => {
        let li = document.createElement("li");
        li.classList.add("filter");
        li.dataset.categoryId = element.id;
        li.innerHTML = element.name;
        filtersList.appendChild(li);
    });
};

// Création de la fonction de filtre et génération des balises Html en conséquence // 
function createCardForHtml(category = 0) {
    gallery.innerHTML = "";
    dataListForHtml.forEach(element => {
        if ( category == 0 || element.category == category) {
            let figure = document.createElement("figure");
            let img = document.createElement("img");
            let figcaption = document.createElement("figcaption");
            img.src = element.imageUrl;
            img.alt = element.title;
            figcaption.innerHTML = element.title;
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        };
    });
};


// Création de l'eventListener sur les filtres //


getDataForHtml();
getFilterForHtml();