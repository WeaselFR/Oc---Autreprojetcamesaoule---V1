// Déjà, on vérifie si un jeton d'accès est présent dans le stockage local.
const token = localStorage.getItem("token");
if (token) {
  // Si le token est là, on redirige l'utilisateur vers la page index.html s'il a déjà un jeton d'accès.
  window.location.href = "index.html";
}

// On utilise une constante, on va sélectionner l'élément du formulaire HTML, ayant l'ID "formLogin".
const formLogin = document.querySelector("#formLogin");

// Ajoute un écouteur d'événements sur "formLogin " pour le formulaire lorsqu'il est soumis.
formLogin.addEventListener("submit", (event) => {
  event.preventDefault();
  // Avec les constantes, on récupère la valeur de l'email et du mot de passe saisis dans le formulaire.
  const email = formLogin.email.value;
  const password = formLogin.password.value;

  // Effectue une requête POST à l'API pour se connecter, en spécifiant l'URL de l'API et les options de la requête.

  // La fonction Fetch est utilisée en JavaScript pour effectuer des requêtes HTTP vers des API. 
  // Elle permet d'envoyer des requêtes HTTP (comme GET, POST, PUT, DELETE) depuis le navigateur et de récupérer les données renvoyées par le serveur.

  // La méthode "POST" est l'une des méthodes les plus couramment utilisées dans les API (Interfaces de Programmation d'Application) 
  // pour envoyer des données à un serveur. Elle est utilisée pour créer de nouvelles ressources ou pour effectuer des opérations qui modifient 
  // l'état d'une ressource existante. Lorsqu'une requête est effectuée avec la méthode "POST", les données sont incluses dans le corps (payload) de la requête HTTP, 
  // généralement au format JSON ou XML. Ces données peuvent représenter un nouvel objet ou une nouvelle entité qui sera ajoutée au serveur.


  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    //le type de contenu (Content-Type) de la requête comme étant "application/json". 
    // Cela indique au serveur que les données envoyées dans le corps de la requête sont au format JSON.
    // L'utilisation de l'en-tête "Content-Type" est courante lors de l'envoi de données via une requête POST, PUT ou PATCH, 
    // car elle indique au serveur comment interpréter les données du corps de la requête.
    headers: {
      "Content-Type": "application/json",
    },
    // Convertit l'email et le mot de passe en JSON et les inclut dans le corps de la requête.
    body: JSON.stringify({ email, password }),
  })
    // Convertit la réponse HTTP en objet JSON pour une manipulation plus facile.
    .then((response) => response.json())
    .then((data) => {
      // Vérifie si la réponse de l'API contient un jeton d'accès.
      if (data.token) {
        // Enregistre le jeton d'accès dans le stockage local du navigateur.
        localStorage.setItem("token", data.token);
        // Redirige l'utilisateur vers la page index.html.
        window.location.href = "index.html";
      } else {
        // Affiche une alerte en cas d'erreur d'identification.
        alert("Erreur dans l'identifiant ou le mot de passe");
      }
    });
});

// Le but de ce code est de gérer le processus de connexion d'un utilisateur à un système en utilisant un formulaire de connexion.
// Vérifier si un jeton d'accès est présent dans le stockage local (localStorage).
// Si un jeton est présent, rediriger l'utilisateur vers la page "index.html", indiquant qu'il est déjà connecté.
// Ajouter un écouteur d'événements sur le formulaire de connexion (formLogin) pour écouter l'événement de soumission du formulaire.
// Lorsque le formulaire est soumis, empêcher le comportement par défaut (rechargement de la page).
// Récupérer les valeurs de l'email et du mot de passe saisis par l'utilisateur dans le formulaire.
// Effectuer une requête POST à une API spécifique pour se connecter. L'URL de l'API utilisée est "http://localhost:5678/api/users/login".
// La requête POST envoie les données au format JSON dans le corps de la requête, contenant l'email et le mot de passe saisis.
// Attendre la réponse de l'API et convertir la réponse en objet JSON.
// Vérifier si la réponse de l'API contient un jeton d'accès.
// Si un jeton est présent, enregistrer le jeton dans le stockage local du navigateur (localStorage) et rediriger l'utilisateur vers la page "index.html".
// Si aucun jeton n'est présent dans la réponse de l'API, afficher une alerte indiquant une erreur d'identification.