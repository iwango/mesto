//константы
// Настройки для валидации список селекторов и классов
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__input-error_visible',
  autoFillFormName: '.popup__form-edit-profile'
}
// попап окна для управления видимостью с помощью добавления отдельных селектора
// const popupOverlay = document.querySelector('.popup'); // оверлей попап
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

let escPopup; // Глобальная переменная для передачи открытого окна в функцию закрытия по escape

// Функции
//попап окна
// редактировать профиль
function openPopupEditProfile() {
  fillInitialProfileValues (); // заполнить поля формы из DOM
  openPopup(popupEditProfile); //  открытие попап
  checkFormForNewPoup (popupEditProfile);
}
function openPopupAddPlace() {
  openPopup(popupAddPlace);
  checkFormForNewPoup(popupAddPlace);
}
// открытие попап с параметром,установка фокуса на форму, прослушка для оверлей, прослушка для escape
function openPopup(openablePopup) {
  openablePopup.classList.add('popup__visible'); // включаем попап
  focusOnFormOrClose(openablePopup); // проверить галичие формы и сфокусировать
  escPopup = openablePopup; // переменная для передачи окна для закрытия по esc
  openablePopup.addEventListener('click', checkClick); // прослушка оверлея и закрытие при клике
  document.addEventListener('keydown', checkKeydown); // прослушка клавиш
}

// установка фокуса на форму или кнопку закрыть, можно и в инпут но если он пустой, то стирается placeholder  не понятно что надо вводить в поле
function focusOnFormOrClose (openablePopup) {
  const focusElement = function (){
    if (openablePopup.querySelector('.popup__form')) {
      return openablePopup.querySelector('.popup__form'); // если есть форма то возвращает форму
    } else {
      return openablePopup.querySelector('.popup__close'); // если нет, то возвращает кнопку закрыть
    }
  }
  focusElement().tabIndex = -1; // табиндекс для возможности установки фокуса
  setTimeout(() => focusElement().focus(), 100); // установка, с задержкой для появления эллемента
}

// проверка где клик, если на оверлее попап, то закрыть окно
function checkClick (evt) {
  if (evt.target === evt.currentTarget) {
    hidePopupWindow(escPopup)
  }
}

// проверка нажатий клавиш и реагирование по esc
function checkKeydown (evt) {
  if (evt.key === 'Escape') {
    hidePopupWindow(escPopup);
  }
}

// Спрятать попап и убрать событие прослушки escape
function hidePopupWindow(openedPopup) {
  openedPopup.removeEventListener('click', checkClick);
  document.removeEventListener('keydown', checkKeydown);
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
  // формирование объекта для добавления карточки
  const card =   {
    name: placeNameField.value,
    link: placeLinkImageField.value
  }
  placeNameField.value = ''; // очистка значений  в форме
  placeLinkImageField.value = ''; // очистка значений в форме
  const placeElement = creatCard(card); // сохдать новую карточку
  renderElement(placeElement); // передать значения для отрисовки DOM
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
  popupFigureImage.alt = evt.target.alt; // описание из alt нажатой картинки
  popupFigureCaption.textContent = evt.target.alt; // описание из alt нажатой картинки
  openPopup(popupShowImage); // видимость
}
// Заполненую карточку с событиями, выводим в DOM
function renderElement(placeElement) {
  elementsList.prepend(placeElement); // вывод в DOM заполненой карточки
}
 // Создание новой карточки места со всеми событиями
function creatCard (card) {
  const placeElement = placeTemplate.querySelector('.elements__item').cloneNode(true); // клонирование карточки из шаблона
  placeElement.querySelector('.place__title').textContent = card.name; // описание места
  placeElement.querySelector('.place__img').alt = card.name; // альтернативное описание места
  placeElement.querySelector('.place__img').src = card.link; // ссылка на изображение
  // добавление индивидуальных событий для каждой карточки
  placeElement.querySelector('.place__like-button').addEventListener('click', switchLikeIcon); // событие для лайка
  placeElement.querySelector('.place__delete-button').addEventListener('click', deleteCard); // событие для корзины
  placeElement.querySelector('.place__img').addEventListener('click', showPopupPlaceImage); // событие для картинки
  return placeElement; // возвращаем карточку с событиями готовую к отправки в DOM ли в массив
}

// прослушивание событий
profileEditButton.addEventListener('click', openPopupEditProfile); // редактировать профиль
placeAddButton.addEventListener('click', openPopupAddPlace); // добавить место
closeProfileButton.addEventListener('click', () => hidePopupWindow(popupEditProfile)); //спрятать окно редактировать профиль
closeAddPlaceButton.addEventListener('click', () => hidePopupWindow(popupAddPlace)); //спрятать окно место
closeShowImageButton.addEventListener('click', () => hidePopupWindow(popupShowImage)); //спрятать окно картинки
popupFormEditProfile.addEventListener('submit', submitFormEditProfile); // отправка формы профиль
popupFormAddPlace.addEventListener('submit', submitFormAddPlace); // отправка формы место

// заполнить поля из DOM
function fillInitialProfileValues (){
profileNameField.value = profileName.textContent; // заполнение формы из DOM
profileEmploymentField.value = profileEmployment.textContent; // заполнение формы из DOM
}
// начальное заполнение полей профиля из DOM поможет корректно переключить состояние кнопки сабмит
// fillInitialProfileValues (); // iwang

// начальное заполнение карточек из массива черз обход функцией forEach
initialCards.forEach(function (card){
  const placeElement = creatCard(card); // сформировать из каждого элемента массива отдельную карточку с событиями
  renderElement(placeElement); // Отправить готовую карточку для отрисовки DOM
});

// После загрузки DOM дерева добавление попап окнам display flex. если сразу добавить то отрисовывается анимация при загрузке страницы
document.addEventListener("DOMContentLoaded", function(){
  popupEditProfile.classList.add('popup_opened');
  popupAddPlace.classList.add('popup_opened');
  popupShowImage.classList.add('popup_opened');
});