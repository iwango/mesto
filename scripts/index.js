//константы
// попап окна для управления видимостью с помощью добавления отдельных селектора
const popupEditProfile = document.querySelector('.popup_edit-profile'); //профиль
const popupAddPlace = document.querySelector('.popup_add-place'); // место
const popupShowImage = document.querySelector('.popup_show-image'); // картинка
// кнопоки для открытия и закрытия окон
const profileEditButton = document.querySelector('.profile__edit-button'); // редактировать профиль
const placeAddButton = document.querySelector('.profile__place-add-button'); // добавить место
const closeProfileButton = popupEditProfile.querySelector('.popup__close-profile'); // закрыть профиль
const closeAddPlaceButton = popupAddPlace.querySelector('.popup__close-add-place'); // закрыть место
const closeShowImageButton = popupShowImage.querySelector('.popup__close-show-image'); // закрыть картинку
// строки из HTML для редактирования профиля
const profileName = document.querySelector('.profile__name');
const profileEmployment = document.querySelector('.profile__employment');
// данные для попап картинки
const popupFigureImage = document.querySelector('.popup__figure-image'); // изображение
const popupFigureCaption = document.querySelector('.popup__figure-caption'); // описание
// форма для редактирования профиля
const popupFormEditProfile = document.querySelector('.popup__form-edit-profile');
// форма для редактирования места
const popupFormAddPlace = document.querySelector('.popup__form-add-place');
// пременные для полей ввода
// редактор профиля
const profileNameField = document.querySelector('#profile_name_field');
const profileEmploymentField = document.querySelector('#profile_employment_field');
// редактор места
const placeNameField = document.querySelector('#place_name_field');
const placeLinkImageField = document.querySelector('#place_link_image');
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
  popupEditProfile.classList.add('popup__visible'); //  открытие попап
}
// Добавление места
function openPopupAddPlace() {
  popupAddPlace.classList.add('popup__visible');
}
// Спрятать попап
function hidePopupWindow() {
  document.querySelector('.popup__visible').classList.remove('popup__visible'); // выбор открытого видимого окна по селектору .popup__visible и сделать невидимым
}
// Обработка Submit
//профиль
function submitFormEditProfile (evt) {
  evt.preventDefault(); // отмена стандартной обработки формы
  profileName.textContent = profileNameField.value; // Запись данных в DOM
  profileEmployment.textContent = profileEmploymentField.value; // Запись данных в DOM
  hidePopupWindow();  // Спрятать попап
}
// место
function submitFormAddPlace(evt) {
  evt.preventDefault(); // отмена стандартной обработки формы
  const placeAltName = placeNameField.value; // описание из формы
  const placeName = placeNameField.value; // название из формы
  const placeLinkImage = placeLinkImageField.value; // картинка из формы
  placeNameField.value = ''; // очистка значений  в форме
  placeLinkImageField.value = ''; // очистка значений в форме
  initialCards.push({name: placeName, link: placeLinkImage}); // добавление карточки в массив
  renderElement(placeAltName, placeName, placeLinkImage); // передать значения для отрисовки DOM
  hidePopupWindow(); // Спрятать окна
}
// переключение состояния лайка
function switchLikeIcon(evt) {
  evt.target.classList.toggle('place__like-button_active');
}
// удаление карточки из DOM
function deleteCard(evt) {
  evt.target.closest('.elements__item').remove(); // удаление карточки. closest ближайший родитель с селектором
  // удаленные карточки, в массиве пока остаются ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~!!!!!!!!!!!!!!!!!!!!!!!!!!
}
// попап с картинкой
function showPopupPlaceImage(evt) {
  popupFigureImage.src = evt.target.src; // адрес картинки из src нажатой каринки
  popupFigureCaption.textContent = evt.target.alt; // описание из alt ажатой картинки
  popupShowImage.classList.add('popup__visible'); // видимость
}
// Заполнение карточки, вывод в DOM и событие для лайка
function renderElement(placeAltName, placeName, placeLinkImage) {
  const placeElement = placeTemplate.querySelector('.elements__item').cloneNode(true); // клонирование карточки из шаблона
  placeElement.querySelector('.place__img').alt = placeAltName; // альтернативное описание места
  placeElement.querySelector('.place__title').textContent = placeName; // описание места
  placeElement.querySelector('.place__img').src = placeLinkImage; // ссылка на изображение
  elementsList.prepend(placeElement); // вывод в DOM заполненой карточки
  // добавление индивидуальных событий для каждой карточки
  placeElement.querySelector('.place__like-button').addEventListener('click', switchLikeIcon); // событие для лайка
  placeElement.querySelector('.place__delete-button').addEventListener('click', deleteCard); // событие для корзины
  placeElement.querySelector('.place__img').addEventListener('click', showPopupPlaceImage); // событие для картинки

}
// прослушивание событий
profileEditButton.addEventListener('click', openPopupEditProfile); // редактировать профиль
placeAddButton.addEventListener('click', openPopupAddPlace); // добавить место
closeProfileButton.addEventListener('click', hidePopupWindow); //спрятать окно редактировать профиль
closeAddPlaceButton.addEventListener('click', hidePopupWindow); //спрятать окно место
closeShowImageButton.addEventListener('click', hidePopupWindow); //спрятать окно картинки
popupFormEditProfile.addEventListener('submit', submitFormEditProfile); // отправка формы профиль
popupFormAddPlace.addEventListener('submit', submitFormAddPlace); // отправка формы место

// начальное заполнение карточек из массива черз обход функцией forEach
initialCards.forEach(function (item){
  const placeAltName = item.name; // описание alt
  const placeName = item.name; // название места
  const placeLinkImage = item.link; // ссылка на изображение
  renderElement(placeAltName, placeName, placeLinkImage); // передать значения для отрисовки DOM
});

// После загрузки DOM ерева добавление попап окнам display flex. если сразу добавить то отрисовывается анимация при загрузке страницы
document.addEventListener("DOMContentLoaded", function(){
  popupEditProfile.classList.add('popup_opened');
  popupAddPlace.classList.add('popup_opened');
  popupShowImage.classList.add('popup_opened');
});