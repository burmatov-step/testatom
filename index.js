const wrapperCats = document.querySelector(".wrapper-cats"),
  likeCount = document.querySelector(".like__count"),
  likeSuccess = document.querySelector(".like-success"),
  dislike = document.querySelector(".dislike"),
  createForm = document.querySelector(".createForm"),
  allInputForm = createForm.querySelectorAll("input"),
  textareaForm = createForm.querySelector("textarea"),
  buttonForm = createForm.querySelector("button"),
  popupCreate = document.querySelector(".popup-create"),
  catsItemAll = document.querySelectorAll(".cats__item"),
  plus = document.querySelectorAll(".plus"),
  wrapperCat = document.querySelector(".wrapper__cat"),
  btnCreatecats = document.querySelector(".btn-createcats"),
  popupChange = document.querySelector(".popup-change"),
  nameCatChange = document.querySelector(".name-cat__change"),
  descriptionCatChange = document.querySelector(".description-cat__change");
back = document.querySelector(".back");

// Функция запроса
const postData = () => {
  return fetch("cats.json", {
    method: "GET",
  });
};

// Функция Создание котов на главной
const createCats = (info) => {
  const item = document.createElement("div");
  item.setAttribute("id", `${info._id}`);
  item.classList.add("cats__item");
  item.innerHTML = `
  <div class="cats__img">
          <img src="${info.img}" alt="" />
        </div>
        <div class="cats__item-info">
          <div class="cats__name">Имя: <span class='info-name'>${info.name}</span></div>

          <div class="cats_description">
           Описание:  <span class='info-description'>${info.description}</span>
          </div>
          <div class="cats__likes">
            <div class="like__change">
              <span class="plus">+</span><span class="minus">-</span>
            </div>
            <div class="like__count">${info.like}</div>
          </div>
        </div>
  `;

  wrapperCats.append(item);
};

// функция создания кота

const createCat = (info) => {
  const wrap = document.querySelector(".wrapper__cat");
  const item = document.querySelector(".cat__items");
  wrap.setAttribute("num", `${info._id}`);
  item.innerHTML = `
  <div class="cat__img">
            <img
              src="${info.img}"
              alt=""
            />
          </div>
          <div class="cat__item-info">
            <div class="cat__name">Имя:<span class='info-name'>${info.name}</span></div>

            <div class="cat_description">
            Описание:
              <span class='info-description'> ${info.description}</span>

            </div>
            <div class="cat__likes">
             Набрал лайков: <span class="like__count">${info.like}</span>
            </div>
          </div>
  `;

  wrap.prepend(item);
};

// Функция активации кнопки
const renderForm = () => {
  allInputForm.forEach((item) => {
    if (item.value && textareaForm.value) {
      buttonForm.removeAttribute("disabled");
    }
  });
};

// вывод карточек
postData()
  .then((response) => {
    if (response.status !== 200) {
      throw new Error("status network not 200");
    }
    return response.json();
  })
  .then((response) => {
    const info = response;
    info.forEach((item) => {
      createCats(item);
    });
  })
  .catch((error) => {
    console.log(error);
  });

document.body.addEventListener("click", (e) => {
  let target = e.target;

  if (target.closest(".plus")) {
    likeSuccess.classList.add("active");
    setTimeout(() => {
      likeSuccess.classList.remove("active");
    }, 800);
  }

  if (target.closest(".minus")) {
    dislike.classList.add("active");
    setTimeout(() => {
      dislike.classList.remove("active");
    }, 800);
  }

  if (target.closest(".btn-createcats")) {
    e.preventDefault();
    popupCreate.classList.add("active");
  }

  // Клик на карточку
  if (
    target.closest(".cats__item") &&
    !target.closest(".plus") &&
    !target.closest(".minus")
  ) {
    let id = target.closest(".cats__item").attributes.id.value;

    postData()
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("status network not 200");
        }
        return response.json();
      })
      .then((response) => {
        wrapperCats.style.display = "none";
        wrapperCat.style.display = "block";
        const info = response[id - 1];
        createCat(info);
        btnCreatecats.style.display = "none";
        back.style.display = "block";
      })
      .catch((error) => {
        console.log(error);
      });
  }

  if (target.closest(".close")) {
    popupCreate.classList.remove("active");
    popupChange.classList.remove("active");
  }

  // Возвращение на главную

  if (target.closest(".back button")) {
    wrapperCats.style.display = "block";
    wrapperCat.style.display = "none";
    btnCreatecats.style.display = "block";
    back.style.display = "none";
  }
  if (target.closest(".delete-cat")) {
    // Удаление кота
    e.preventDefault();
    if (confirm("точно удалить? не жалко?(")) {
      let id = target.closest(".wrapper__cat").attributes.num.value,
        allCats = document.querySelector(".wrapper-cats"),
        catDelete = document.querySelector(`[id="${id}"]`);
      allCats.removeChild(catDelete);
      wrapperCats.style.display = "block";
      wrapperCat.style.display = "none";
      btnCreatecats.style.display = "block";
      back.style.display = "none";
    }
  }

  // Редактирование кота
  if (target.closest(".change")) {
    popupChange.classList.add("active");

    postData()
      .then((response) => {
        if (response.status !== 200) {
          throw new Error("status network not 200");
        }
        return response.json();
      })
      .then((response) => {
        let id = target.closest(".wrapper__cat").attributes.num.value;
        descriptionCatChange.value = response[id - 1].description;
        nameCatChange.value = response[id - 1].name;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // При клике на редактировать

  if (target.closest(".button-form__change")) {
    e.preventDefault();
    let name = wrapperCat.querySelector(".info-name"),
      description = wrapperCat.querySelector(".info-description"),
      id = wrapperCat.attributes.num.value,
      catsChange = document.querySelector(`[id="${id}"]`),
      nameMain = catsChange.querySelector(".info-name"),
      descriptionMain = catsChange.querySelector(".info-description");
    name.textContent = nameCatChange.value;
    description.textContent = descriptionCatChange.value;
    nameMain.textContent = nameCatChange.value;
    descriptionMain.textContent = descriptionCatChange.value;
    popupChange.classList.remove("active");
  }
});

allInputForm.forEach((item) => {
  item.addEventListener("change", () => {
    renderForm();
  });
});

// Создание карточки

createForm.addEventListener("submit", (e) => {
  e.preventDefault();
  let numCat = document.querySelector(".wrapper-cats");
  const formData = new FormData(createForm);
  let body = {};
  formData.forEach((val, key) => {
    body[key] = val;
  });
  body.like = 0;
  body._id = numCat.children.length + 1;
  createCats(body);
  popupCreate.classList.remove("active");
});
