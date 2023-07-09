// Sélectionne l'élément modal ayant l'ID "modal".
const modal = document.querySelector("#modal");

// Sélectionne l'élément ayant la classe "gallery".
const gallery = document.querySelector(".gallery");

// Déclare une variable data comme un tableau vide.
let data = [];

// Fonction pour obtenir les œuvres en fonction d'une catégorie donnée.
const getWorks = (id) => {
  // Effectue une requête GET à l'API pour obtenir les données des travaux.
  fetch("http://localhost:5678/api/works")
    .then(function (response) {
      return response.json();
    })
    .then(function (dataJson) {
      // Stocke les données des œuvres dans la variable data.
      data = dataJson;

      // Crée un tableau dataForGallery pour stocker les œuvres filtrées.
      let dataForGallery = [];

      // Si l'ID est égal à 0, récupère toutes les œuvres.
      // Sinon, filtre les œuvres en fonction de l'ID de la catégorie.
      if (id === 0) {
        dataForGallery = dataJson;
      } else {
        for (let i = 0; i < dataJson.length; i++) {
          if (id === dataJson[i].categoryId) {
            dataForGallery.push(dataJson[i]);
          }
        }
      }

      // Ajoute les œuvres à la galerie.
      addWorksGallery(dataForGallery);

      // Sélectionne tous les boutons ayant la classe "btn".
      const buttons = document.getElementsByClassName("btn");

      // Parcourt tous les boutons.
      for (let i = 0; i < buttons.length; i++) {
        // Si l'ID du bouton correspond à l'ID de la catégorie, ajoute la classe "button-active".
        // Sinon, supprime la classe "button-active".
        if (parseInt(buttons[i].id) === id) {
          buttons[i].classList.add("button-active");
        } else {
          buttons[i].classList.remove("button-active");
        }
      }

      // Met à jour les œuvres dans la modal seulement si elle est ouverte.
      if (modal.style.display === "block") {
        AddWorksGalleryModale(data);
      }
    })
    .catch(() => {
      console.log("Une erreur s'est produite lors de la récupération des données");
    });
};

// Appelle la fonction getWorks avec l'ID initial 0 pour obtenir toutes les œuvres.
getWorks(0);

// Fonction pour ajouter les œuvres à la galerie.
function addWorksGallery(data) {
  // Supprime tous les éléments enfants de la galerie.
  let child = gallery.lastElementChild;
  while (child) {
    gallery.removeChild(child);
    child = gallery.lastElementChild;
  }

  // Ajoute les nouvelles données d'œuvres à la galerie.
  data.forEach((element) => {
    const figure = `<figure id=${element.id}Gallery>
      <img src=${element.imageUrl} alt=${element.title}>
      <figcaption>${element.title}</figcaption>
    </figure>`;
    gallery.innerHTML += figure;
  });
}

// Déclare un tableau saveCategori.
let saveCategori = [];

// Sélectionne l'élément ayant la classe "filters".
const allButton = document.querySelector(".filters");

// Fonction pour obtenir les catégories.
const getCategories = () => {
  // Effectue une requête GET à l'API pour obtenir les données des catégories.
  fetch("http://localhost:5678/api/categories")
    .then(function (response) {
      return response.json();
    })
    .then(function (dataCategories) {
      // Parcourt les données des catégories.
      for (let i = 0; i < dataCategories.length; i++) {
        // Si l'ID de la catégorie est supérieur à 0, ajoute la catégorie à saveCategori.
        if (dataCategories[i].id > 0) {
          saveCategori.push(dataCategories[i]);
        }
      }

      // Appelle la fonction addButton avec les données des catégories.
      addButton(dataCategories);
    })
    .catch(() => {
      console.log("Erreur lors de la récupération des catégories");
    });

  // Fonction pour ajouter les boutons de filtre.
  function addButton(categories) {
    // Ajoute un bouton "Tous" à la liste des catégories.
    categories.push({ id: 0, name: "Tous" });

    // Trie les catégories par ordre croissant d'ID.
    categories.sort((a, b) => a.id - b.id);

    // Parcourt toutes les catégories.
    categories.forEach((categorie) => {
      // Crée un bouton pour chaque catégorie.
      const button = document.createElement("button");

      // Ajoute la classe "button-active" au bouton correspondant à la catégorie "Tous".
      // Sinon, ajoute la classe "btn".
      if (categorie.id === 0) {
        button.className = "button-active btn";
      } else {
        button.className = "btn";
      }

      // Attribue l'ID de la catégorie au bouton.
      button.id = categorie.id;

      // Ajoute le nom de la catégorie comme contenu du bouton.
      button.innerHTML = categorie.name;

      // Ajoute un écouteur d'événements au bouton pour filtrer les œuvres.
      button.addEventListener("click", () => filtres(categorie.id));

      // Ajoute le bouton à l'élément ayant la classe "filters".
      allButton.appendChild(button);
    });
  }
};

// Appelle la fonction getCategories pour obtenir les catégories.
getCategories();

// Fonction pour filtrer les œuvres en fonction de l'ID de la catégorie.
function filtres(id) {
  getWorks(id);
}

// Sélectionne l'élément de stockage de données.
const dataStorage = localStorage.getItem("token");

// Sélectionne l'élément ayant la classe "logout".
const logOut = document.querySelector(".logout");

// Sélectionne l'élément ayant la classe "filters".
const buttonFiltres = document.querySelector(".filters");

// Sélectionne tous les éléments ayant la classe "modifier".
const divModifier = document.querySelectorAll("button.modifier");

// Sélectionne l'élément ayant la classe "editionMode".
const divEdition = document.querySelector(".editionMode");

// Masque la modal.
modal.style.display = "none";

// Vérifie si des données sont présentes dans le stockage.
if (dataStorage) {
  // Modifie le texte de l'élément ayant la classe "logout" en "logout".
  logOut.textContent = "logout";

  // Masque les boutons de filtre.
  buttonFiltres.style.display = "none";

  // Décale la galerie de 90px 
  gallery.style = "margin-top: 90px;";

  // Affiche la div "mode edition" en haut.
  divEdition.style.display = "flex";

  // Affiche les div ayant la classe "modifier".
  divModifier.forEach((div) => {
    div.style.display = "flex";
  });

  // Ajoute un écouteur d'événements au bouton "logout" pour supprimer les données du stockage.
  // et rediriger vers la page "index.html".
  logOut.addEventListener("click", () => {
    localStorage.removeItem("token");
    logOut.href = "index.html";
  });
}



















/**********************  Modal 1 & 2  *********************************/



const buttonModifier = document.querySelector("#button-modifier");
const modal2 = document.querySelector(".divModal2");

// Fonction pour afficher la première modal
const showModalOne = () => { 
  // Affiche la modal principale
  modal.style.display = "block"; 
  
  // Sélectionne l'élément ayant la classe "modalContainer"
  const modalContainer = document.querySelector(".modalContainer")

  // Crée un div pour la première modal
  const divModal = document.createElement("div");
  divModal.id = "divModal";
  modalContainer.appendChild(divModal);

  // Crée un bouton pour fermer la modal
  const closeModal = document.createElement("p");
  closeModal.innerHTML = "x";
  closeModal.className = "close-modal";
  divModal.appendChild(closeModal);

  // Crée un titre pour la modal
  const titleModal = document.createElement("p");
  titleModal.innerHTML = "Galerie Photo";
  titleModal.className = "title-modal";
  divModal.appendChild(titleModal);

  // Crée une div pour la galerie de la modal
  const modalGallery = document.createElement("div");
  modalGallery.className ="modal-gallery";
  divModal.appendChild(modalGallery);

  // Crée un conteneur pour le trait
  const traitContainer = document.createElement("div");
  traitContainer.className = "trait-container";
  divModal.appendChild(traitContainer);
  
  // Crée un trait
  const trait = document.createElement("div")
  trait.className = "trait";
  traitContainer.appendChild(trait);

  // Crée un bouton pour ajouter une photo
  const buttonAddPic = document.createElement("button");
  buttonAddPic.className = "button-addpicture";
  buttonAddPic.innerHTML = "Ajouter une photo";
  divModal.appendChild(buttonAddPic);

  // Crée un paragraphe pour supprimer la galerie
  const deleteGallery = document.createElement("p");
  deleteGallery.innerHTML = "Supprimer la galerie";
  deleteGallery.className = "delete-gallery";
  divModal.appendChild(deleteGallery);

  // Ajoute les projets à la galerie de la modal
  AddWorksGalleryModale(data)

  // Clique sur la croix pour fermer la modal et supprimer son contenu
  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    var child = modalContainer.lastElementChild;
    while (child) {
      modalContainer.removeChild(child);
      child = modalContainer.lastElementChild;
    }
  });

  // Clique en dehors de la modal pour la fermer et supprimer son contenu
  modal.addEventListener('click', (event) => {
    if (event.target.className === "modalContainer") {
      modal.style.display = "none"
      let child = modalContainer.lastElementChild;
      while (child) {
        modalContainer.removeChild(child);
        child = modalContainer.lastElementChild;
      }             
    }
  });

  // Clique sur "Ajouter une photo" pour supprimer la première modal et afficher la deuxième modal
  const openModal2 = document.querySelector(".button-addpicture");
  openModal2.addEventListener("click", () => {
    showModalTwo();
  });
}

// Ajoute un écouteur d'événements au bouton "Modifier" pour afficher la première modal
buttonModifier.addEventListener("click", showModalOne);

// Fonction pour afficher la deuxième modal
function showModalTwo() {
  // Sélectionne l'élément ayant la classe "modalContainer"
  const modalContainer = document.querySelector(".modalContainer");

  // Définir le contenu HTML de la deuxième modal
  const divModal2 = `
    <div class="divModal2">
      <button class="arrowback">
        <img class="arrowback" src="./assets/icons/Arrow_Back.svg" alt="cross">
      </button>
      <p class="close-modal">x</p>
      <p class="title-modal">Ajout photo</p>
      
      <div class="form-container">
        <form class="form-modal2" method="post">
          <div class="ajout-picture">
            <div class="preview-image">
              <img alt="image user" src="" class="import-pictures">
            </div>
            <img class="icon-picture" src="./assets/icons/picture.svg" alt="picture">
            <label class="label-addpic" id="buttonAddPic" for="addPic">+ Ajouter photo</label>
            <input type="file" class="input-addpic" id="addPic" name="addPic" accept="image/png, image/jpeg, image/jpg">
            <p>jpg, png: 4mo max</p>
          </div>
          <label for="title">Titre</label>
          <input class="title" id="title" type="text">
          <label for="category">Catégorie</label>
          <select class="category" id="category" name="category">
            <option value="" disabled selected>Veuillez sélectionner une catégorie</option>
            ${saveCategori.map(item => (`<option id=${item.id} class="selectcategory">${item.name}</option>`))}
          </select>
          <div class="trait-container">
            <div class="trait"></div>
          </div>
          <button type="submit" class="valider">Valider</button>
        </form>
      </div>
      <p class="msg-error"></p>
    </div>`;

  // Ajoute le contenu HTML à la modalContainer
  modalContainer.innerHTML = divModal2;

  // Clique sur la croix pour fermer la modal et supprimer son contenu
const closeModal2 = document.querySelector(".close-modal");
closeModal2.addEventListener("click", () => {
  // Masque la modal en définissant sa propriété "display" sur "none"
  modal.style.display = "none";

  // Supprime tous les derniers éléments enfants de modalContainer
  let child = modalContainer.lastElementChild;
  while (child) {
    modalContainer.removeChild(child);
    child = modalContainer.lastElementChild;
  }
});

// Clique sur le bouton de retour pour supprimer la deuxième modal et afficher la première modal
const arrowBack = document.querySelector(".arrowback");
arrowBack.addEventListener("click", () => {
  // Supprime tous les derniers éléments enfants de modalContainer
  var child = modalContainer.lastElementChild;
  while (child) {
    modalContainer.removeChild(child);
    child = modalContainer.lastElementChild;
  }

  // Affiche à nouveau la première modal en appelant la fonction showModalOne()
  showModalOne();
});

// Récupération des éléments HTML nécessaires
const addImageModal = document.querySelector(".input-addpic");
const previewImage = document.querySelector(".import-pictures");
const addTitle = document.querySelector(".title");
const addCategory = document.querySelector(".category");
const buttonSubmit = document.querySelector(".valider");
const msgError = document.querySelector(".msg-error");
const form = document.querySelector(".form-modal2");
let sourcePicture = "";

// Appel de la fonction addWork() pour ajouter les gestionnaires d'événements et les fonctionnalités liées à l'ajout d'une nouvelle œuvre
addWork();

function addWork() {
  // Récupération de l'image
  addImageModal.addEventListener("input", (e) => {
    // Crée une URL d'objet pour l'image sélectionnée et l'affiche dans l'aperçu
    sourcePicture = URL.createObjectURL(e.target.files[0]);
    previewImage.src = sourcePicture;
    previewImage.style.setProperty("visibility", "visible");
    buttonAddPic.style.display = "none";
  });

  // Vérification si les champs sont remplis pour activer le bouton de validation
  form.addEventListener("change", () => {
    if (sourcePicture !== "" && addTitle.value !== "" && addCategory.value !== "") {
      // Change la couleur du bouton de validation et active le curseur
      buttonSubmit.style.background = "#1D6154";
      buttonSubmit.style.cursor = "pointer";
      msgError.innerText = "";
    } else {
      // Réinitialise la couleur du bouton de validation
      buttonSubmit.style.backgroundColor = "";
    }
  });

  // Quand on clique sur le bouton de validation
  buttonSubmit.addEventListener("click", (e) => {
    e.preventDefault();

    if (sourcePicture && addTitle.value !== "" && addCategory.value !== "") {
      // Crée un objet FormData et y ajoute les données du formulaire
      const formData = new FormData();
      formData.append("image", addImageModal.files[0]);
      formData.append("title", addTitle.value);
      formData.append("category", addCategory.selectedIndex);

      // Effectue une requête POST pour ajouter l'œuvre via l'API
      fetchAddWork();

      function fetchAddWork() {
        fetch("http://localhost:5678/api/works", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.token}`,
          },
          body: formData,
        })
          .then(() => {
            // Après avoir ajouté l'œuvre avec succès, change la couleur du bouton de validation
            buttonSubmit.style.background = "#1D6154";

            // Supprime le contenu de la galerie pour mettre à jour l'affichage
            gallery.innerHTML = "";
            getWorks(0);
          })
          .catch((error) => {
            console.log("Il y a eu une erreur sur le Fetch: " + error);
          });
      }

      // Supprime le contenu de modalContainer et masque la modal
      const modalContainer = document.querySelector(".modalContainer");
      let child = modalContainer.lastElementChild;
      while (child) {
        modalContainer.removeChild(child);
        child = modalContainer.lastElementChild;
      }
      modal.style.display = "none";
    } else {
      // Affiche un message d'erreur si les champs ne sont pas remplis ou si le format de l'image est incorrect
      msgError.innerText = "Veuillez remplir tous les champs et/ou respectez le format d'image (jpg ou png)";
      console.log("Erreur lors de l'ajout d'un projet");
    }
  });
}
}
