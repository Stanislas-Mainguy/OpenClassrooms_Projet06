// Section des variables
const loginButton = document.querySelector("#login_button");
const emailInput = document.querySelector("#email");
const passwordInput = document.querySelector("#password");
const emailError = document.querySelector("#email-error");
const passwordError = document.querySelector("#password-error");
const loginError = document.querySelector("#login-error");

// Création de l'eventListener avec ses sous-sections //
loginButton.addEventListener("click", function () {
  const email = emailInput.value;
  const password = passwordInput.value;
  
  // Conditions pour les messages d'erreur //
  emailError.textContent = "";
  passwordError.textContent = "";
  loginError.textContent = "";
  const isEmailValid = validateEmailFormat(email);
  const isPasswordValid = validatePasswordFormat(password);

  if (!isEmailValid && !isPasswordValid) {
    loginError.textContent = "L'e-mail et le mot de passe ne sont pas valides.";
    return;
  }
  if (!isEmailValid) {
    emailError.textContent = "L'e-mail n'est pas valide.";
    return;
  }
  if (!isPasswordValid) {
    passwordError.textContent = "Le mot de passe n'est pas valide.";
    return;
  }

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
      } else if (response.status === 401) {
        throw new Error("Le mot de passe est incorret.");
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
      passwordError.textContent = error.message;
      emailError.textContent = error.message;
    });
});