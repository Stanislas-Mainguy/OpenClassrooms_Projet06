const gallery = document.querySelector(".gallery");
const filterAll = document.querySelector("#all");
const filterObjects = document.querySelector("#objects");
const filterApartments = document.querySelector("#apartments");
const filterHotelsApartments = document.querySelector("#hotels-and-restaurants");
jsonListeGallery = [];

// Récupération de la liste par Postman //
fetch("http://localhost:5678/api/works")
    .then(data => data.json())
    .then(jsonListeGallery => {
        let newFigure = document.createElement("figure");
        gallery.appendChild(newFigure);

        for (let i = 0; i < jsonListeGallery.lenght; i++) {
            let newFigure = document.createElement("figure");
            newFigure.classList.add("pictures_array");
            gallery.appendChild(newFigure);
            document.querySelector("gallery").innerHTML;
        }

        for (let jsonArticle of jsonListeGallery) {
            let imgUrl = new imgUrl(jsonArticle);
            let title = new title(jsonArticle);
            document.querySelectorAll("pictures_array").innerHTML += `<img src="http://localhost:5678/api/works/${imgUrl.png}">
                                                                      <figcaption>${title.text}</figcaption>
            `
        }
});

// Création eventListener boutton "tous" //
filterAll.addEventListener('click', function() {
    if (actualJsonListeGalley === jsonListeGallery) {
        // Ne rien faire //
    } else {
        // CHanger la liste et actualisé la page //
    }
});

// Création  eventListener "objets" //
filterObjects.addEventListener('click', function() {
    if (actualJsonListeGalley === jsonListeGalleryObjects) {
        // Ne rien faire //
    } else {
        // CHanger la liste et actualisé la page //
    }
});

// Création eventListener "appartements" //
filterApartments.addEventListener('click', function() {
    if (actualJsonListeGalley === jsonListeGalleryApartments) {
        // Ne rien faire //
    } else {
        // CHanger la liste et actualisé la page //
    }
});

// Création eventListener "hôtels & restaurants" //
filterHotelsApartments.addEventListener('click', function() {
    if (actualJsonListeGalley === jsonListeGalleryHotelAndApartements) {
        // Ne rien faire //
    } else {
        // CHanger la liste et actualisé la page //
    }
});

// Test création liste "tous" //
function addTous(articleUserId) {
    let listeTous = getTous();
}

function getTous() {
    let listeTous = localStorage.getItem("userId");
    if (listeTous == null) {
        return [];
    } else {
        return JSON.parse(listeTous);
    }
}

// Test création liste "Objets" //
function addObjects(articleCategoryObjects) {
    let listeObjects = getObjects();
}

function getObjects() {
    let listObjects = localStorage.getItem("categoryId") ;
    if (listeObjects == null) {
        return [];
    } else {
        return JSON.parse(listeObjects);
    }
}

// Test création liste "Appatements" //
function addApartments(articleCategoryApartments) {
    let listeApartments = getApartments();
}

function getApartments() {
    let listeApartments = localStorage.getItem("categoryId");
    if (listeApartments == null) {
        return [];
    } else {
        return JSON.parse(listeApartments);
    }
}

// Test création list "Hôtels & restaurants" //
function addHotelsAndRestaurants(articleCategoryHotelsAndRestaurants) {
    let listeHotelsAndRestaurants = getHotelsAndRestaurants();
}

function getHotelsAndRestaurants() {
    let listeHotelsAndRestaurants = localStorage.getItem("categoryId");
    if (listeHotelsAndRestaurants == null) {
        return [];
    } else {
        return JSON.parse(listeHotelsAndRestaurants);
    }
}