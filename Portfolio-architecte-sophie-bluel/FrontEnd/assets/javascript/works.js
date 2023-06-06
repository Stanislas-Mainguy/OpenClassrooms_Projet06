// Récupération de la liste par Postman //
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch("http://localhost:5678/api/works", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));

    const gallery = document.querySelector(".gallery");

// Création de figure //
let newFigure = document.createElement("figure");
gallery.appendChild(newFigure);

for (let i = 0; i < liste.lenght; i++) {
    let newFigure = document.createElement("figure");
    gallery.appendChild(newFigure);
}
// Création d'image avec le tableau //
// Création de figcaption avec le tableau //