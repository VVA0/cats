//! https://cats.petiteweb.dev/api/single/viktoria --- основной url сервера
//! для добавления путь: /add, метод POST
//! для получения всех котов путь: /show, метод GET
//! для получения кота по id путь: /show/{id}, метод GET
//! для обновления кота по id путь: /update/{id}, методж PUT
//! для удаления кота по id путь: /delete/{id}, метод DELETE

function addCat(obj) {
  return fetch("https://cats.petiteweb.dev/api/single/viktoriya/add", {
    //! путь сервера куда я отпраляю
    method: "POST", //! метод запроса, в данном случае я добавляю данные
    headers: {
      //! настройки запроса. Указываем в каком формате данные отправляем и принимаем
      accept: "application/json",
      "content-type": "application/json",
    },
    body: JSON.stringify(obj), //! мы отправляем данные внутри ключа body в формате JSON
  });
}

function getAllCats() {
  //! тут я получаю ответ от сервера, а именно для того, чтобы отобразить своих котов
  return fetch("https://cats.petiteweb.dev/api/single/viktoriya/show");
}

function deleteIdCat(id) {
  return fetch(`https://cats.petiteweb.dev/api/single/viktoriya/delete/${id}`, {
    method: "DELETE",
  });
}

function getCatbyId(id) {
  return fetch(`https://cats.petiteweb.dev/api/single/viktoriya/show/${id}`); //! получаю информацию об одном коте по id
}

function editCat(obj) {
  //! это я отправляю данные для редактирования
  return fetch(
    `https://cats.petiteweb.dev/api/single/viktoriya/update/${obj.id}`,
    {
      method: "PUT",
      headers: {
        accept: "application/json", //! стандартная запись для методов post, put, path (если нужно передавать объект данных)
        "content-type": "application/json",
      },
      body: JSON.stringify(obj),
    }
  );
}
