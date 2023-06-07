const gallery = document.querySelector(".gallery");
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