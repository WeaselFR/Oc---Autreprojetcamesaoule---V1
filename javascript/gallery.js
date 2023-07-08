const gallery = document.querySelector(".gallery");
const dataStorage = localStorage.getItem("token");
const unlog = document.querySelector(".logout");
const buttonFiltres = document.querySelector(".filters");
const divModifier = document.querySelectorAll("button.modifier");
const divEdition = document.querySelector(".editionMode");

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
      const modal = document.querySelector(".modal"); 
      if (modal.style.display === "block") {
        AddWorksGalleryModale(dataJson);
      }
    });
};

getWorks(0);

function addWorksGallery(data) {
  let child = gallery.lastElementChild;
  while (child) {
    gallery.removeChild(child);
    child = gallery.lastElementChild;
  }

  data.forEach((element) => {
    const figure = `<figure id=${element.id}Gallery>
      <img src=${element.imageUrl} alt=${element.title}>
      <figcaption>${element.title}</figcaption>
    </figure>`;
    gallery.innerHTML += figure;
  });
}

let saveCategori = [];

const allButton = document.querySelector(".filters");

const getCategories = () => {
  fetch("http://localhost:5678/api/categories")
    .then(function (response) {
      return response.json();
    })
    .then(function (dataCategories) {
      for (let i = 0; i < dataCategories.length; i++) {
        if (dataCategories[i].id > 0) {
          saveCategori.push(dataCategories[i]);
        }
      }

      addButton(dataCategories);
    })
    .catch(() => {
      console.log("Erreur lors de la récupération des catégories");
    });

  function addButton(categories) {
    categories.push({ id: 0, name: "Tous" });

    categories.sort((a, b) => a.id - b.id);

    categories.forEach((categorie) => {
      const button = document.createElement("button");

      if (categorie.id === 0) {
        button.className = "button-active btn";
      } else {
        button.className = "btn";
      }

      button.id = categorie.id;

      button.innerHTML = categorie.name;

      button.addEventListener("click", () => filtres(categorie.id));

      allButton.appendChild(button);
    });
  }
};

getCategories();

function filtres(id) {
  getWorks(id);
}

if (dataStorage) {
  unlog.textContent = "logout";

  buttonFiltres.style.display = "none";

  gallery.style = "margin-top: 90px;";

  divEdition.style.display = "flex";

  divModifier.forEach((div) => {
    div.style.display = "flex";
  });

  unlog.addEventListener("click", () => {
    localStorage.removeItem("token");
    unlog.href = "index.html";
  });

  const modal = document.querySelector(".modal");
  modal.style.display = "none";
}
