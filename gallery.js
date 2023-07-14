const getWorks = (id) => {
  fetch("http://localhost:5678/api/works")
    .then(function (response) {
      return response.json();
    })
    .then(function (dataJson) {
      console.log(dataJson);
      data = dataJson;
      let dataForGallery = [];
      if (id === 0) {
        dataForGallery = dataJson;
      } else {
        for (let i = 0; i < dataJson.length; i++) {
          if (id === dataJson[i].categoryId) {
            dataForGallery.push(dataJson[i]);
          }
        }
      }

      addWorksGallery(dataForGallery);

      const buttons = document.getElementsByClassName("btn");
      for (let i = 0; i < buttons.length; i++) {
        if (parseInt(buttons[i].id) === id) {
          buttons[i].classList.add("button-active");
        } else {
          buttons[i].classList.remove("button-active");
        }
      }

      if (modal.style.display === "block") {
        addWorksGalleryModal(data);
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
    const figure = `<figure id="${element.id}Gallery">
      <img src="${element.imageUrl}" alt="${element.title}">
      <figcaption>${element.title}</figcaption>
    </figure>`;
    gallery.innerHTML += figure;
  });
}

let saveCategories = [];
const allButton = document.querySelector(".filters");

const getCategories = () => {
  fetch("http://localhost:5678/api/categories")
    .then(function (response) {
      return response.json();
    })
    .then(function (dataCategories) {
      for (let i = 0; i < dataCategories.length; i++) {
        if (dataCategories[i].id > 0) {
          saveCategories.push(dataCategories[i]);
        }
      }

      addButton(dataCategories);
    });
};

function addButton(categories) {
  categories.push({ id: 0, name: "Tous" });

  categories.sort((a, b) => a.id - b.id);

  categories.forEach((category) => {
    const button = document.createElement("button");

    if (category.id === 0) {
      button.className = "button-active btn";
    } else {
      button.className = "btn";
    }
    button.id = category.id;
    button.innerHTML = category.name;

    button.addEventListener("click", () => filterWorks(category.id));
    allButton.appendChild(button);
  });
}

getCategories();

function filterWorks(id) {
  getWorks(id);
}

const dataStorage = localStorage.getItem("token");
const logOut = document.querySelector(".logout");
const buttonFilters = document.querySelector(".filters");
const buttonModifier = document.querySelector("#button-modifier");
const modal = document.querySelector("#modal");
const gallery = document.querySelector(".gallery");

modal.style.display = "none";

if (dataStorage) {
  logOut.textContent = "logout";

  buttonFilters.style.display = "none";
  gallery.style.marginTop = "90px";

  buttonModifier.style.display = "flex";

  logOut.addEventListener("click", () => {
    localStorage.removeItem("token");
    logOut.href = "index.html";
  });
}

buttonModifier.addEventListener("click", showModalOne);

function showModalOne() {
  modal.style.display = "block";

  const modalContainer = document.querySelector(".modalContainer");

  const divModal = document.createElement("div");
  divModal.id = "divModal";
  modalContainer.appendChild(divModal);

  const closeModal = document.createElement("p");
  closeModal.innerHTML = "x";
  closeModal.className = "close-modal";
  divModal.appendChild(closeModal);

  const titleModal = document.createElement("p");
  titleModal.innerHTML = "Galerie Photo";
  titleModal.className = "title-modal";
  divModal.appendChild(titleModal);

  const modalGallery = document.createElement("div");
  modalGallery.className = "modal-gallery";
  divModal.appendChild(modalGallery);

  const traitContainer = document.createElement("div");
  traitContainer.className = "trait-container";
  divModal.appendChild(traitContainer);

  const trait = document.createElement("div");
  trait.className = "trait";
  traitContainer.appendChild(trait);

  const buttonAddPic = document.createElement("button");
  buttonAddPic.className = "button-addpicture";
  buttonAddPic.innerHTML = "Ajouter une photo";
  divModal.appendChild(buttonAddPic);

  const deleteGallery = document.createElement("p");
  deleteGallery.innerHTML = "Supprimer la galerie";
  deleteGallery.className = "delete-gallery";
  divModal.appendChild(deleteGallery);

  addWorksGalleryModal(data);

  closeModal.addEventListener("click", () => {
    modal.style.display = "none";
    var child = modalContainer.lastElementChild;
    while (child) {
      modalContainer.removeChild(child);
      child = modalContainer.lastElementChild;
    }
  });

  modal.addEventListener("click", (event) => {
    if (event.target.className === "modalContainer") {
      modal.style.display = "none";
      let child = modalContainer.lastElementChild;
      while (child) {
        modalContainer.removeChild(child);
        child = modalContainer.lastElementChild;
      }
    }
  });

  const openModal2 = document.querySelector(".button-addpicture");
  openModal2.addEventListener("click", () => {
    showModalTwo();
  });
}

function showModalTwo() {
  const modalContainer = document.querySelector(".modalContainer");
  const divModal2 = `<div class="divModal2">
    <button class="arrowback"> <img class="arrowback" src="./assets/icons/Arrow_Back.svg" alt="cross">
    </button>
    <p class="close-modal">x</p>
    <p class="title-modal">Ajout photo</p>

    <div class="form-container">
      <form class="form-modal2" method="post">
        <div class="ajout-picture">
          <div class="preview-image"><img alt="image user" src="" class="import-pictures"></div>
          <img class="icon-picture" src="./assets/icons/picture.svg" alt="picture">
          <label class="label-addpic" id="buttonAddPic" for="addPic">+ Ajouter photo</label>
          <input type="file" class="input-addpic" id="addPic" name="addPic" accept="image/png , image/jpeg, image/jpg">
          <p>jpg, png : 4mo max</p>
        </div>
        <label for="title">Titre</label>
        <input class="title" id="title" type="text">
        <label for="category">Catégorie</label>
        <select class="category" id="category" name="category">
          <option value="" disabled selected>veuillez selectionner une catégorie</option>
          ${saveCategories.map((category) => `<option id="${category.id}" class="selectcategory">${category.name}</option>`)}
        </select>
        <div class="trait-container">
          <div class="trait"></div>
        </div>
        <button type="submit" class="valider">Valider</button>
      </form>
    </div>
  </div>`;

  modalContainer.innerHTML = divModal2;

  const closeModal2 = document.querySelector(".close-modal");
  closeModal2.addEventListener("click", () => {
    modal.style.display = "none";
    let child = modalContainer.lastElementChild;
    while (child) {
      modalContainer.removeChild(child);
      child = modalContainer.lastElementChild;
    }
  });

  const arrowBack = document.querySelector(".arrowback");
  arrowBack.addEventListener("click", () => {
    var child = modalContainer.lastElementChild;
    while (child) {
      modalContainer.removeChild(child);
      child = modalContainer.lastElementChild;
    }
    showModalOne();
  });

  const addImageModal = document.querySelector(".input-addpic");
  const previewImage = document.querySelector(".import-pictures");
  const addTitle = document.querySelector(".title");
  const addCategory = document.querySelector(".category");
  const buttonSubmit = document.querySelector(".valider");
  const form = document.querySelector(".form-modal2");
  let sourcePicture = "";

  addWork();

  function addWork() {
    addImageModal.addEventListener("input", (e) => {
      const buttonAddPic = document.querySelector("#buttonAddPic");

      sourcePicture = URL.createObjectURL(e.target.files[0]);
      previewImage.src = sourcePicture;
      previewImage.style.setProperty("visibility", "visible");
      buttonAddPic.style.display = "none";
    });

    form.addEventListener("change", () => {
      if (sourcePicture !== "" && addTitle.value !== "" && addCategory.value !== "") {
        buttonSubmit.style.background = "#1D6154";
        buttonSubmit.style.cursor = "pointer";
      } else {
        buttonSubmit.style.backgroundColor = "";
      }
    });

    buttonSubmit.addEventListener("click", (e) => {
      e.preventDefault();

      if (sourcePicture && addTitle.value !== "" && addCategory.value !== "") {
        const formData = new FormData();
        formData.append("image", addImageModal.files[0]);
        formData.append("title", addTitle.value);
        formData.append("category", addCategory.selectedIndex);

        fetchAddWork();

        function fetchAddWork() {
          fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.token}`,
            },
            body: formData,
          }).then(() => {
            buttonSubmit.style.background = "#1D6154";
            gallery.innerHTML = "";
            getWorks(0);
          });
        }

        const modalContainer = document.querySelector(".modalContainer");
        let child = modalContainer.lastElementChild;
        while (child) {
          modalContainer.removeChild(child);
          child = modalContainer.lastElementChild;
        }
        modal.style.display = "none";
      }
    });
  }
}

function addWorksGalleryModal(data) {
  const modalGallery = document.querySelector(".modal-gallery");
  let child = modalGallery.lastElementChild;
  while (child) {
    modalGallery.removeChild(child);
    child = modalGallery.lastElementChild;
  }

  data.forEach((element) => {
    const figure = `<figure id="${element.id}Modal" class="figure-modal">
      <img class="trash-icon" id="${element.id}" src="./assets/icons/trash-icon.svg" alt="">
      <img class="img-modal" src="${element.imageUrl}" alt="${element.title}">
      <figcaption class="figcaption-modal">éditer</figcaption>
    </figure>`;
    modalGallery.innerHTML += figure;
  });

  const trashWorks = document.querySelectorAll(".trash-icon");
  const token = localStorage.token;

  trashWorks.forEach((element) => {
    element.addEventListener("click", () => {
      fetch(`http://localhost:5678/api/works/${element.id}`, {
        method: "DELETE",
        headers: {
          accept: "*/*",
          Authorization: `Bearer ${token}`,
        },
      });
    });
  });
}
