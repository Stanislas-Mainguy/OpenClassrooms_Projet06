const gallery = document.querySelector(".gallery");
gallery.innerHTML = "";
let dataListForHtml = [];

function GetDataForHtml() {
    fetch("http://localhost:5678/api/works")
    .then(data => data.json())
    .then(DataJson => {
        dataListForHtml = DataJson;
    })
}

GetDataForHtml();
console.log(dataListForHtml);

function createHtml() {
    dataListForHtml.forEach(element => {
        let figure = document.createElement("figure");
        let img = document.createElement("img");
        let title = document.createElement("figcaption");
        img.src = element.img;
        img.alt = element.title;
        figcaption.innerHTML = element.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

createHtml();