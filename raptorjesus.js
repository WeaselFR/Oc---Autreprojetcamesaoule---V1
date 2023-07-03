const modal = document.querySelector("#modal");

const gallery = document.querySelector(".gallery");

let data = [];

const getWorks = (id) => {
    fetch("http://localhost:5678/api/works")
      .then(response => response.json())
      .then(dataJson => {
        const dataForGallery = id === 0 ? dataJson : dataJson.filter(item => item.categoryId === id);
        addWorksGallery(dataForGallery);
        const buttons = document.getElementsByClassName("btn");
        Array.from(buttons).forEach(button => {
          const buttonId = parseInt(button.id);
          if (buttonId === id) {
            button.classList.add("button-active");
          } else {
            button.classList.remove("button-active");
          }
        });
        if (modal.style.display === "block") {
          AddWorksGalleryModale(dataJson);
        }
      });
  };

//La première fonction .then est utilisée pour traiter la réponse de la requête et la convertir en JSON.
//La deuxième fonction .then est utilisée pour manipuler les données JSON récupérées.
//Les données JSON converties sont stockées dans une variable dataJson.
//Une autre variable appelée dataForGallery est initialisée comme un tableau vide.
//Si l'id passé en paramètre est égal à 0, alors toutes les données JSON sont ajoutées à dataForGallery. 
//Sinon, la boucle for est utilisée pour parcourir les données JSON et que les œuvres ayant un categoryId égal à l'id passé en paramètre sont ajoutées à dataForGallery.
//La fonction addWorksGallery est appelée avec dataForGallery en argument pour afficher les œuvres dans la galerie.
//Ensuite, une sélection des éléments HTML avec la classe "btn" est effectuée et stockée dans la variable buttons.
//Une boucle forEach est utilisée pour parcourir chaque bouton dans buttons.
//Si l'id du bouton converti en entier est égal à l'id passé en paramètre, alors la classe "button-active" est ajoutée au bouton. Sinon, la classe "button-active" est supprimée du bouton.
//Si la valeur de modal.style.display est "block" (c'est-à-dire si le modal est affiché), alors la fonction AddWorksGalleryModale est appelée avec les données JSON (dataJson) en argument.

// "array" est une structure de données utilisée pour stocker et organiser une collection d'éléments