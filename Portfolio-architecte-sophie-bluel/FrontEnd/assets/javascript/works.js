const gallery = document.querySelector(".gallery");
const filterAll = document.querySelector("#all");
const filterObjects = document.querySelector("#objects");
const filterApartments = document.querySelector("#apartments");
const filterHotelsApartments = document.querySelector("#hotels-and-restaurants");

// Récupération de la liste par Postman //
fetch("http://localhost:5678/api/works")
    .then(data => data.json())
    .then(jsonListeGallery => {
        let newFigure = document.createElement("figure");
        gallery.appendChild(newFigure);

        for (let i = 0; i < jsonListeGallery.lenght; i++) {
            let newFigure = document.createElement("figure");
            gallery.appendChild(newFigure);
        }

        for (let jsonArticle of jsonListeGallery) {
            let imgUrl = new imgUrl(jsonArticle);
            let title = new title(jsonArticle);
            document.querySelector("figure").innerHTML += `<img src="http://localhost:5678/api/works/${imgUrl.png}">
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

// Test création liste "Objets" //

// Test création liste "Appatements" //

// Test création list "Hôtels & restaurants" //