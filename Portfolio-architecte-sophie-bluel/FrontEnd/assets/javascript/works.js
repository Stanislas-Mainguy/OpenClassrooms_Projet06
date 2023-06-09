// Section des variables //
const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");
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
        dataFilterListForHtml.push(...filterData);
        createFilterForHtml();
    });
};

// Création des balises de filtre html //
function createFilterForHtml() {
    filters.innerHTML = "";
    dataFilterListForHtml.forEach(element => {
        let li = document.createElement("li");
        li.classList.add("filter");
        li.dataset.categoryId = element.id;
        li.innerHTML = element.name;
        filters.appendChild(li);
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
document.querySelectorAll(".filter").forEach(element => {
    element.addEventListener('click', function () {
        createHtml(this.dataset.categoryId);
    });
});

getDataForHtml();
getFilterForHtml();