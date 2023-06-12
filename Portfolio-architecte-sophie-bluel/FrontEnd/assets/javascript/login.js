// Section des variables
const loginButton = document.querySelector("#login_button");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector("#error-message");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");

// Création de l'eventListener avec ses sous-sections //
loginButton.addEventListener("click", function () {
  const email = emailInput.value;
  const password = passwordInput.value;
  emailError.textContent = "";
  passwordError.textContent = "";
  emailInput.classList.remove("error");
  passwordInput.classList.remove("error");

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
      } else {
        throw new Error("Les informations d'identification sont incorrectes.");
      }
    })
    // Stockage du token et redirection vers la page d'accueil //
    .then((data) => {
      localStorage.setItem("token", data.token);
      window.location.href = "./index.html";
    })
    .catch((error) => {
      errorMessage.textContent = error.message;
    });
});