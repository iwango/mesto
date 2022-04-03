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
const popupFigureImage = popupShowImage.querySelector('.popup__figure-image'); // изображение
const popupFigureCaption = popupShowImage.querySelector('.popup__figure-caption'); // описание
// форма для редактирования профиля
const popupFormEditProfile = popupEditProfile.querySelector('.popup__form-edit-profile');
// форма для редактирования места
const popupFormAddPlace = popupAddPlace.querySelector('.popup__form-add-place');
// пременные для полей ввода
// редактор профиля
const profileNameField = popupFormEditProfile.querySelector('#profile_name_field');
const profileEmploymentField = popupFormEditProfile.querySelector('#profile_employment_field');
// редактор места
const placeNameField = popupFormAddPlace.querySelector('#place_name_field');
const placeLinkImageField = popupFormAddPlace.querySelector('#place_link_image');
// список мест
const elementsList = document.querySelector('.elements__list');
// шаблон для карточек
const placeTemplate = document.querySelector('#place-template').content;
// Функции
//попап окна
// редактировать профиль
function openPopupEditProfile() {
  profileNameField.value = profileName.textContent; // заполнение формы из DOM
  profileEmploymentField.value = profileEmployment.textContent; // заполнение формы из DOM
  openPopup(popupEditProfile); //  открытие попап
}
// открытие попап с параметром
function openPopup(openablePopup) {
  openablePopup.classList.add('popup__visible');
}
// Спрятать попап
function hidePopupWindow(openedPopup) {
  openedPopup.classList.remove('popup__visible'); // выбор открытого видимого окна параметром и удаление .popup__visible для невидимости
}
// Обработка Submit
//профиль
function submitFormEditProfile (evt) {
  evt.preventDefault(); // отмена стандартной обработки формы
  profileName.textContent = profileNameField.value; // Запись данных в DOM
  profileEmployment.textContent = profileEmploymentField.value; // Запись данных в DOM
  hidePopupWindow(popupEditProfile);  // Спрятать попап
}
// место
function submitFormAddPlace(evt) {
  evt.preventDefault(); // отмена стандартной обработки формы
  const placeAltName = placeNameField.value; // описание из формы
  const placeName = placeNameField.value; // название из формы
  const placeLinkImage = placeLinkImageField.value; // картинка из формы
  placeNameField.value = ''; // очистка значений  в форме
  placeLinkImageField.value = ''; // очистка значений в форме
  renderElement(placeAltName, placeName, placeLinkImage); // передать значения для отрисовки DOM
  hidePopupWindow(popupAddPlace); // Спрятать окна
}
// переключение состояния лайка
function switchLikeIcon(evt) {
  evt.target.classList.toggle('place__like-button_active');
}
// удаление карточки из DOM
function deleteCard(evt) {
  evt.target.closest('.elements__item').remove(); // удаление карточки. closest ближайший родитель с селектором
}
// попап с картинкой
function showPopupPlaceImage(evt) {
  popupFigureImage.src = evt.target.src; // адрес картинки из src нажатой каринки
  popupFigureCaption.textContent = evt.target.alt; // описание из alt ажатой картинки
  openPopup(popupShowImage); // видимость
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
placeAddButton.addEventListener('click', () => openPopup(popupAddPlace)); // добавить место
closeProfileButton.addEventListener('click', () => hidePopupWindow(popupEditProfile)); //спрятать окно редактировать профиль
closeAddPlaceButton.addEventListener('click', () => hidePopupWindow(popupAddPlace)); //спрятать окно место
closeShowImageButton.addEventListener('click', () => hidePopupWindow(popupShowImage)); //спрятать окно картинки
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