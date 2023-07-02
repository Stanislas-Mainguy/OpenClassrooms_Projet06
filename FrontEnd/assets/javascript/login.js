// Section des variables //
const loginButton = document.querySelector("#login_button");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const loginError = document.querySelector("#login-error");

// Création de l'eventListener avec ses sous-sections //
loginButton.addEventListener("click", function (event) {
  event.preventDefault();
  const email = emailInput.value;
  const password = passwordInput.value;
  loginError.textContent = "";

  // Envoie de la requête de connection à L'API //
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: email, password: password }),
  })
    // Récupération du token depuis l'API //
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else if (response.status === 401 || response.status === 404) {
        throw new Error("Erreur d'e-mail et/ou de mot de passe.");
      }
    })
    // Stockage du token et redirection vers la page d'accueil //
    .then((data) => {
      localStorage.setItem("token", data.token);
      window.location.href = "./index.html";
    })
    // Affichage du message d'erreur //
    .catch((error) => {
      loginError.textContent = error.message;
    });
});

// Fonction pour gérer l'événement "Entrée" //
function handleEnterKey(event) {
  if (event.key === "Enter") {
      event.preventDefault();
      loginButton.click();
  };
};

document.addEventListener("keydown", handleEnterKey);