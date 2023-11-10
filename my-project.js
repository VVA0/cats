//!-------------------ПРОЕКТ С КОТИКОМ, РАБОТА С СЕРВЕРОМ DELETE,POST,PUT,GET-------------------------

const addBtn = document.querySelector("[data-add_button]");
const addModal = document.querySelector("[data-modal]");
const addModalClose = document.querySelector("[data-close_button]");
const addForm = document.forms.catsForm; //! Внутри документа можно обратиться к любой форме по ее атрибуту name */
const editForm = document.forms.catsFormEdit; //! Внутри документа можно обратиться к любой форме по ее атрибуту name */
const catsConteiner = document.querySelector("[data-wrapper]");
const loader = document.querySelector("[data-spinner]");
const modalInfo = document.querySelector("[data-modal-info]");
const imageCat = document.querySelector("#image");
const ageCat = document.querySelector("#age");
const rateCat = document.querySelector("#rate");
const catName = document.querySelector(".cat__name");
const catDisc = document.querySelector(".cat__disc");
const catHeart = document.querySelector(".like");
const btnInfoClouse = document.querySelector("[data-close_button_show]");
const modalEdit = document.querySelector("[data-modal-edit]");
const closeEditModal = document.querySelector("[data-close_button_edit]");

addBtn.onclick = function (event) {
  addModal.classList.remove("hidden");
  console.log(event);
};

addModalClose.onclick = function () {
  addModal.classList.add("hidden");
};
addForm.onsubmit = function (event) {
  //! event - это информация о произошедшем событии
  event.preventDefault(); //! обращаюсь к событию (ивент) и использ метод, чтобы отменить действие по умолчанию (перезагрузка страницы)
  let id = addForm.id.value;
  let name = addForm.name.value;
  let description = addForm.description.value;
  let image = addForm.image.value;
  let age = addForm.age.value;
  let rate = addForm.rate.value;
  let favorite = addForm.favorite.checked; //! для инпутов с типом чек-бокс получаем значение из свойства checked (true, false)
  let obj = { id, name, description, image, age, rate, favorite }; //! создали объект для того чтобы его отправить на сервер. Может отправлять только в виде объекта
  console.log(obj);
  addCat(obj)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      renderCats();
      addModal.classList.add("hidden");
    });
};

editForm.onsubmit = function (event) {
  event.preventDefault(); //! отмена перезагрузки страницы
  let id = editForm.id.value;
  let name = editForm.name.value;
  let description = editForm.description.value;
  let image = editForm.image.value;
  let age = editForm.age.value;
  let rate = editForm.rate.value;
  let favorite = editForm.favorite.checked; //! для инпутов с типом чек-бокс получаем значение из свойства checked (true, false)
  let obj = { id, name, description, image, age, rate, favorite };
  console.log(obj);
  editCat(obj)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      modalEdit.classList.add("hidden");
      renderCats();
    });
};

function renderCats() {
  catsConteiner.innerHTML = null;
  loader.classList.remove("hidden");
  getAllCats()
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      data.forEach((element) => {
        catsConteiner.insertAdjacentHTML(
          "beforeend",
          `<div data-card_id ="${element.id}" class="card mx-2" style="width: 18rem;">
		  <img src="${element.image}" class="card-img-top" alt="">
		  <div class="card-body">
			 <h5 class="card-title">${element.name}</h5>
			 <button data-action="show" class="btn btn-primary">Show</button>
			 <button data-action="delete" class="btn btn-danger">Delete</button>
			 <button data-action="edit" class="btn btn-success">Edit</button>
		  </div>
		  </div>`
        );
      });
    });
  setTimeout(function () {
    loader.classList.add("hidden");
  }, 500);
}
renderCats();

catsConteiner.onclick = function (event) {
  //! Вешаю клик на весь контейнер
  let action = event.target.dataset.action; //! event.target - это тот элемент на который нажала, dataset.action - достаю значение из (data-action)
  console.log(action);
  if (action === "edit") {
    modalEdit.classList.remove("hidden");
    let idCat = event.target.closest("[data-card_id]").dataset.card_id;
    getCatbyId(idCat)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        editForm.name.value = data.name;
        editForm.id.value = data.id;
        editForm.image.value = data.image;
        editForm.rate.value = data.rate;
        editForm.description.value = data.description;
        editForm.age.value = data.age;
        editForm.favorite.checked = data.favorite;
      });
  }
  if (action === "show") {
    let idCat = event.target.closest("[data-card_id]").dataset.card_id;
    getCatbyId(idCat)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        modalInfo.classList.remove("hidden");
        imageCat.src = data.image;
        ageCat.innerHTML = data.age;
        rateCat.innerHTML = data.rate;
        catName.innerHTML = data.name;
        catDisc.innerHTML = data.description;
        if (data.favorite) {
          catHeart.classList.remove("hidden");
        } else {
          catHeart.classList.add("hidden");
        }
      });
  }
  if (action === "delete") {
    let idCat = event.target.closest("[data-card_id]").dataset.card_id; //! dataset - это как classList. Получаем доступ ко всем атрибутам начинающимся с data-
    deleteIdCat(idCat)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        renderCats();
      });
  }
};

btnInfoClouse.onclick = function () {
  modalInfo.classList.add("hidden");
};

closeEditModal.onclick = function () {
  modalEdit.classList.add("hidden");
};

//!fehug
//? dievhiuewhv
//*hjfvjioekb
//todo heojigdpk[fweg]
