const modal = document.querySelector("#modal");

const gallery = document.querySelector(".gallery");

let data =[];

const getWorks = (id) => {
  fetch("http://localhost:5678/api/works")
  .then(function (response) {
    return response.json();
  })
  .then(function (dataJson) {  console.log(dataJson);
    data = dataJson;
    let dataForGallery = [];
    if (id === 0){dataForGallery = dataJson}
    else { 
      for (let i=0 ; i<dataJson.length ; i++){
        if ( id === dataJson[i].categoryId){ 
          dataForGallery.push(dataJson[i])
        }
      }
    } 

    addWorksGallery(dataForGallery);

    const buttons = document.getElementsByClassName("btn");
    for ( let i = 0 ; i<buttons.length ; i++) {
      if( parseInt(buttons[i].id )=== id) {
        buttons[i].classList.add("button-active")
      }
      else {
        buttons[i].classList.remove("button-active")
        }
    }
   if(modal.style.display == "block"){
        AddWorksGalleryModale(data);   }
    
  })
  .catch (()=>{console.log("Une erreur s'est produite lors de la recuperation des données")});
}
getWorks(0); 


function addWorksGallery (data) {
 
  let child = gallery.lastElementChild;
  while (child) {
    gallery.removeChild(child);
    child = gallery.lastElementChild;
  }
  data.forEach(element => {
    const figure = `<figure id=${element.id}Gallery>
    <img src=${element.imageUrl} alt=${element.title}>
    <figcaption>${element.title}</figcaption>
  </figure>`
    gallery.innerHTML += figure
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
    
    for (let i = 0 ; i < dataCategories.length ; i++){
      
      if (dataCategories[i].id > 0){
        saveCategori.push(dataCategories[i])
      }
    }
    
    addButton(dataCategories)
  })
  .catch(()=>{console.log("erreur lors de la recuperation des categories ")});

function addButton(categories) {

  categories.push({id:0 , name: "Tous"});

  categories.sort((a,b) => a.id - b.id);
  
    categories.forEach((categorie) => {
      const button = document.createElement("button");
     
      if ( categorie.id === 0) {
        button.className = "button-active btn";
       }
       else {
        button.className = "btn";
       }
      button.id=categorie.id;
      button.innerHTML = categorie.name
    
      button.addEventListener( "click" , () =>filtres(categorie.id))
      allButton.appendChild(button);
  
    });
  }
}
  
getCategories();

function filtres (id){
  getWorks(id)
}

const dataStorage = localStorage.getItem("token");
const logOut = document.querySelector(".logout");
const buttonFiltres = document.querySelector(".filters")
const divModifier = document.querySelectorAll("button.modifier");
const divEdition = document.querySelector(".editionMode");
modal.style.display ="none"

if (dataStorage) { 

  logOut.textContent = "logout";

  buttonFiltres.style.display = "none";

  gallery.style = "margin-top: 90px;"
  
  divEdition.style.display ="flex";
  
  divModifier.forEach ((div) => { 
  
  div.style.display ="flex";});

  logOut.addEventListener("click", ()=>
    {
    localStorage.removeItem("token");
    logOut.href = "index.html" 
    })
}

const buttonModifier = document.querySelector("#button-modifier");
const modal2 = document.querySelector(".divModal2");

const showModalOne = () => { 
  
  modal.style.display = "block"; 
  
  const modalContainer = document.querySelector(".modalContainer")

  const divModal = document.createElement("div");
  divModal.id = "divModal";
  modalContainer.appendChild(divModal);

  const closeModal = document.createElement("p");
  closeModal.innerHTML ="x";
  closeModal.className = "close-modal";
  divModal.appendChild(closeModal);

  const titleModal = document.createElement("p");
  titleModal.innerHTML = "Galerie Photo";
  titleModal.className = "title-modal";
  divModal.appendChild(titleModal);

  const modalGallery = document.createElement("div");
  modalGallery.className ="modal-gallery";
  divModal.appendChild(modalGallery);

  const traitContainer = document.createElement("div");
  traitContainer.className = "trait-container";
  divModal.appendChild(traitContainer);
  
  const trait = document.createElement("div")
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

  AddWorksGalleryModale(data)

  closeModal.addEventListener ( "click" , ()=>{
      modal.style.display ="none";
      var child = modalContainer.lastElementChild;
      while (child) {
        modalContainer.removeChild(child);
        child = modalContainer.lastElementChild;
      }
     }
    )

  modal.addEventListener('click', (event) => {
      if (event.target.className === "modalContainer" ) {
        modal.style.display="none"
        let child = modalContainer.lastElementChild;
        while (child) {
          modalContainer.removeChild(child); 
          child = modalContainer.lastElementChild;
        }             
      }
    });

  const openModal2 = document.querySelector(".button-addpicture");
  openModal2.addEventListener("click", () =>{
    showModalTwo();
  });  
}


buttonModifier.addEventListener("click", showModalOne );

function showModalTwo (){
  
  const modalContainer = document.querySelector(".modalContainer")
  const divModal2 = `<div class="divModal2">
  <button class="arrowback"> <img class="arrowback" src="./assets/icons/Arrow_Back.svg" alt="cross">
  </button>
  <p class="close-modal ">x</p>
  <p class="title-modal">Ajout photo</p>
  
  <div class="form-container">
  <form class="form-modal2" method="post">
    <div class="ajout-picture ">
        <div class="preview-image"><img alt="image user" src="" class="import-pictures"></div>
        <img class="icon-picture" src="./assets/icons/picture.svg" alt="picture">
        <label class="label-addpic" id="buttonAddPic" for="addPic">+ Ajouter photo</label>
        <input type="file" class="input-addpic" id="addPic" name="addPic" accept="image/png , image/jpeg, image/jpg">
        <p>jpg, png : 4mo max</p>
    </div>
      <label for="title">Titre</label>
      <input class="title" id="title" type="text" >
      <label for="category">Catégorie</label>
      <select class="category" id="category" name="category" >
      <option value="" disabled selected>veuillez selectionner une catégorie</option>
        ${saveCategori.map(item => ( `<option id=${item.id} class="selectcategory">${item.name}</option> `))}
      </select>
      <div class="trait-container">
        <div class="trait"></div>
      </div>
      <button type="submit" class="valider">Valider</button>
    </form>
    </div>
    <p class="msg-error"></p>
  </div>`;

  modalContainer.innerHTML = divModal2;

  const closeModal2 = document.querySelector(".close-modal")
  closeModal2.addEventListener ( "click" , ()=>{
      modal.style.display ="none";
      let child = modalContainer.lastElementChild;
      while (child) {
      modalContainer.removeChild(child);
      child = modalContainer.lastElementChild;
      }
  })
  const arrowBack = document.querySelector(".arrowback");
  arrowBack.addEventListener("click", () => {
    var child = modalContainer.lastElementChild;
    while (child) {
      modalContainer.removeChild(child);
      child = modalContainer.lastElementChild;
    }
    showModalOne();
  })


  const addImageModal = document.querySelector(".input-addpic")
  const previewImage = document.querySelector(".import-pictures")
  const addTitle = document.querySelector(".title")
  const addCategory = document.querySelector(".category")
  const buttonSubmit = document.querySelector(".valider")
  const msgError = document.querySelector(".msg-error")
  const form = document.querySelector(".form-modal2")
  let sourcePicture = "";

  addWork();

  function addWork() {
    addImageModal.addEventListener("input", (e) => {
        const buttonAddPic =document.querySelector("#buttonAddPic")
        
        sourcePicture = URL.createObjectURL(e.target.files[0]);
        previewImage.src = sourcePicture;
        previewImage.style.setProperty("visibility", "visible");
        buttonAddPic.style.display = "none"
    });
     
    form.addEventListener("change", () => {
        if ( sourcePicture !== "" &&
             addTitle.value !== "" && addCategory.value !== "") {
            buttonSubmit.style.background = "#1D6154";
            buttonSubmit.style.cursor = "pointer";
            msgError.innerText = "";
            
        }
       else { 
            buttonSubmit.style.backgroundColor = ''; 
            
        }
    });
    buttonSubmit.addEventListener("click", (e) => {
        e.preventDefault();
       
        if (sourcePicture && addTitle.value !== "" && addCategory.value !== "") {
            
            const formData = new FormData();
            formData.append("image", addImageModal.files[0]);
            formData.append("title", addTitle.value);
            formData.append("category", addCategory.selectedIndex);

            fetchAddWork()
           function fetchAddWork() {    
                  fetch("http://localhost:5678/api/works", {
                        method: "POST",
                        headers: {
                            Authorization: `Bearer ${localStorage.token}`,
                        },
                        body: formData,
                    })
                  .then( ()=>  {
                    buttonSubmit.style.background = "#1D6154"

                    gallery.innerHTML = "";
                    
                    getWorks(0); 
                  })
                .catch ((error)=> {
                    
                    console.log("Il y a eu une erreur sur le Fetch: " + error)
                });
            }
            const modalContainer = document.querySelector(".modalContainer")
            let child = modalContainer.lastElementChild;
            while (child) {
                modalContainer.removeChild(child);
                child = modalContainer.lastElementChild;
            }
            modal.style.display ="none";
           

        } else {
            msgError.innerText = "Veuillez remplir tous les champs et/ou respectez le format image jpg ou png";
            console.log("erreur lors de l'ajout d'un projet");
        }
        
    });
}
}

function AddWorksGalleryModale(data) {
  const modalGallery = document.querySelector(".modal-gallery");
  let child = modalGallery.lastElementChild;
  while (child) {
    modalGallery.removeChild(child);
    child = modalGallery.lastElementChild;
  }
  
    data.forEach(element => {
        const figure = `<figure id="${element.id}Modal" class="figure-modal">
                
        <img class="trash-icon" id="${element.id}" src="./assets/icons/trash-icon.svg" alt="">
				<img class="img-modal" src=${element.imageUrl} alt=${element.title}>
				<figcaption class="figcaption-modal">éditer</figcaption>
			</figure>` ;
        modalGallery.innerHTML += figure;
        
    }); 

    const trashWork= document.querySelectorAll(".trash-icon");
    const token = localStorage.token;
    
    trashWork.forEach(element => {
          element.addEventListener("click", () => {
            fetch(`http://localhost:5678/api/works/${element.id}`, {
              method: "DELETE",
              headers: {
                  accept: "*/*",
                  Authorization: `Bearer ${token}`
              }
           })
           .then (()=> { getWorks(0)})
           .catch (()=>{console.log("une erreur s'est produite lors de la supression")});

          });      
    });  
}
