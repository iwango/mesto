//константы
// кнопоки для открытия и закрытия окон
const profileEditButton = document.querySelector('.profile__edit-button'); // редактировать профиль
const placeAddButton = document.querySelector('.profile__place-add-button'); // добавить место
const closeProfileButton = document.querySelector('.popup__close-profile'); // закрыть профиль
const closeAddPlaceButton = document.querySelector('.popup__close-add-place'); // закрыть место
// поап окна для управления видимостью с помощью добавления отдельного селектора
const popupEditProfile = document.querySelector('.popup__edit-profile'); //профиль
const popupAddPlace = document.querySelector('.popup__add-place'); // место
// строки из HTML для редактирования профиля
const profileName = document.querySelector('.profile__name');
const profileEmployment = document.querySelector('.profile__employment');
// форма для редактирования профиля
const popupFormEditProfile = document.querySelector('.popup__form-edit-profile');
// форма для редактирования места
const popupFormAddPlace = document.querySelector('.popup__form-add-place');
// пременные для полей ввода
  // редактор профиля
const profileNameField = document.querySelector('#profile_name_field');
const profileEmploymentField = document.querySelector('#profile_employment_field');
  // редактор места
const placeName = document.querySelector('#place_name_field');
const placeLinkImage = document.querySelector('#place_link_image');
// список мест
const elementsList = document.querySelector('.elements__list');
// шаблон для карточек
const placeTemplate = document.querySelector('#place-template').content;
// начальный массив мест
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
// Функции
  //попап окна
    // редактировать профиль
function openPopupEditProfile() {
  profileNameField.value = profileName.textContent; // заполнение формы из DOM
  profileEmploymentField.value = profileEmployment.textContent; // заполнение формы из DOM
  popupEditProfile.classList.add('popup_opened'); //  открытие попап
}
    // Добавление места
function openPoupAddplace() {
  placeName.value = ''; // очистка значений
  placeLinkImage.value = ''; // очистка значений
  popupAddPlace.classList.add('popup_opened');
}
  // закрытие попап
function closePoupWindow() {
  document.querySelector('.popup_opened').classList.remove('popup_opened'); // выбор открытого окна по селектору .popup_opened и закрытие
}
  // Обработка Submit
    //профиль
function submitFormEditProfile (evt) {
  evt.preventDefault(); // отмена стандартной обработки формы
  profileName.textContent = profileNameField.value; // Запись данных в DOM
  profileEmployment.textContent = profileEmploymentField.value; // Запись данных в DOM
  closePoupWindow();  // Закрытие попап
}
    // место
function submitFormAddPlace(evt) {
  evt.preventDefault(); // отмена стандартной обработки формы
  const placeElement = placeTemplate.querySelector('.elements__item').cloneNode(true); // клонирование шаблона
  placeElement.querySelector('.place__img').alt = placeName.value; // описание из формы
  placeElement.querySelector('.place__title').textContent = placeName.value; // название из формы
  placeElement.querySelector('.place__img').src = placeLinkImage.value; // картинка из формы
  elementsList.prepend(placeElement); // добавление карточки в начало списка  DOM
  initialCards.push({name: placeName.value, link: placeLinkImage.value}); // добавление карточки в массив
  closePoupWindow(); // закрытие окна
}
// прослушивание событий
profileEditButton.addEventListener('click', openPopupEditProfile); // редактировать профиль
placeAddButton.addEventListener('click', openPoupAddplace); // добавить место
closeProfileButton.addEventListener('click', closePoupWindow); // закрыть окно редактировать профиль
closeAddPlaceButton.addEventListener('click', closePoupWindow); // закрыть окно место
popupFormEditProfile.addEventListener('submit', submitFormEditProfile); // отправка формы профиль
popupFormAddPlace.addEventListener('submit', submitFormAddPlace); // отправка формы место


// начальное заполнение из массива черз обход функцией forEach
initialCards.forEach(function (item){
  const placeElement = placeTemplate.querySelector('.elements__item').cloneNode(true); // клон шаблона
  placeElement.querySelector('.place__img').alt = item.name; // описание alt
  placeElement.querySelector('.place__title').textContent = item.name; // название места
  placeElement.querySelector('.place__img').src = item.link; // ссылка на изображение
  elementsList.prepend(placeElement); // вывод в DOM
});