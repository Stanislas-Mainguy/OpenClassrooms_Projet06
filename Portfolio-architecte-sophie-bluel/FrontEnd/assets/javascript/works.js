const gallery = document.querySelector(".gallery");
gallery.innerHTML = "";
let dataListForHtml = [];
let dataCardListForHtml = [];
let dataFilterListForHtml = [];

function getDataForHtml() {
    fetch("http://localhost:5678/api/works")
    .then(response => response.json())
    .then(data => {
        dataListForHtml = data;
    });
};
function getFilterForHtml() {
    fetch("http://localhost:5678/api/categories")
    .then(response => response.json())
    .then(filterData => {
        dataFilterListForHtml = filterData;
    });
};
getFilterForHtml();
getDataForHtml();

function createCardHtml(category = 0) {
    gallery.innerHTML = "";
    dataListForHtml.forEach(element => {
        if ( category == 0 || element.category == category) {
            let figure = document.createElement("figure");
            let img = document.createElement("img");
            let figcaption = document.createElement("figcaption");
            img.src = element.img;
            img.alt = element.title;
            figcaption.innerHTML = element.title;
            figure.appendChild(img);
            figure.appendChild(figcaption);
            gallery.appendChild(figure);
        };
    });
};

createCardHtml();

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

document.querySelectorAll(".filter").forEach(element => {
    element.addEventListener('click', function () {
        createHtml(this.dataset.categoryId);
    });
});