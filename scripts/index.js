import {initialCards} from "./cards.js";
import {Card} from "./Card.js";
import {FormValidator} from "./FormValidator.js";

//константы
// Настройки для валидации список селекторов и классов
const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__input-error_visible',
  autoFillFormName: '.popup__form-edit-profile',
  formEditProfile:  '.popup__form-edit-profile',
  formAddCard: '.popup__form-add-place'
}

// переменные для модуля Card
const popupShowImage = document.querySelector('.popup_show-image'); // картинка
const closeShowImageButton = popupShowImage.querySelector('.popup__close-show-image'); // закрыть картинку
const popupFigureImage = popupShowImage.querySelector('.popup__figure-image'); // изображение
const popupFigureCaption = popupShowImage.querySelector('.popup__figure-caption'); // описание

// попап окна для управления видимостью с помощью добавления отдельных селектора
const popupEditProfile = document.querySelector('.popup_edit-profile'); //профиль
const popupAddPlace = document.querySelector('.popup_add-place'); // место
// кнопоки для открытия и закрытия окон
const profileEditButton = document.querySelector('.profile__edit-button'); // редактировать профиль
const placeAddButton = document.querySelector('.profile__place-add-button'); // добавить место
const closeProfileButton = popupEditProfile.querySelector('.popup__close-profile'); // закрыть профиль
const closeAddPlaceButton = popupAddPlace.querySelector('.popup__close-add-place'); // закрыть место
// строки из HTML для редактирования профиля
const profileName = document.querySelector('.profile__name');
const profileEmployment = document.querySelector('.profile__employment');
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

// let escPopup; // Глобальная переменная для передачи открытого окна в функцию закрытия по escape // log block delete this ~~~~~~ iwang <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< // todo delet this

// Функции
//попап окна
// редактировать профиль
function openPopupEditProfile() {
  fillInitialProfileValues (); // заполнить поля формы из DOM
  openPopup(popupEditProfile); //  открытие попап
  profileValidation.toggleButtonExternal(); // валидация полей профиля после открытия и установка состояния кнопки
  // проверить наличие формы и сфокусировать
  focusOnFormOrClose(popupEditProfile); // Вынес отдельно функцию фокусировки. Или она не нужна инадо ее вообще удалить? не совсем понял
}

function openPopupAddPlace() {
  openPopup(popupAddPlace);
  newCardValidation.toggleButtonExternal(); // установка состояния кнопки при открытии
  // проверить наличие формы и сфокусировать
  focusOnFormOrClose(popupAddPlace); // Вынес отдельно функцию фокусировки. Или она не нужна инадо ее вообще удалить? не совсем понял
}
// открытие попап с параметром,установка фокуса на форму, прослушка для оверлей, прослушка для escape
function openPopup(openablePopup) {
  openablePopup.classList.add('popup__visible'); // включаем попап
  // escPopup = openablePopup; // переменная для передачи окна для закрытия по esc // log block delete this ~~~~~~ iwang <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< // todo delet this
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
    hidePopupWindow(evt.target); //todo compleat
  }
}

// проверка нажатий клавиш и реагирование по esc
function checkKeydown (evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup__visible');
    hidePopupWindow(openedPopup); //todo compleat
  }
}
// Сброс формы и полей ошибок при закрытии или отправке формы //REVIEW error 107
function resetForm(openedPopup) {
  const popupForm = openedPopup.querySelector('.popup__form');
  // проверка если есть форма то очищаем если нет то пропуск //REVIEW error 110
  if (popupForm) {
    // удаление класса с ошибкой для инпутов
    const inputError = Array.from(popupForm.querySelectorAll('.popup__input_type_error'));
    inputError.forEach((errorElement) => {
      errorElement.classList.remove('popup__input_type_error');
    });
  // очистка спанов с ошибкой и удаление видимости
    const inputSpanError = Array.from(popupForm.querySelectorAll('.popup__input-error_visible'));
    inputSpanError.forEach((errorElement) => {
      errorElement.classList.remove('popup__input-error_visible');
      errorElement.textContent = '';
    })
    popupForm.reset(); // сброс формы //REVIEW error 122
  }
}
// Спрятать попап и убрать событие прослушки escape
function hidePopupWindow(openedPopup) {
  openedPopup.removeEventListener('click', checkClick);
  document.removeEventListener('keydown', checkKeydown);
  openedPopup.classList.remove('popup__visible'); // выбор открытого видимого окна параметром и удаление .popup__visible для невидимости
  resetForm(openedPopup); //REVIEW error 130
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
  const newCard =   {
    name: placeNameField.value,
    link: placeLinkImageField.value
  }
  const card = new Card (newCard, '#place-template'); // создать новую карточку
  const cardElement = card.generateCard(); //REVIEW error 149
  renderElement(cardElement); // передать значения для отрисовки DOM
  hidePopupWindow(popupAddPlace); // Спрятать окна
}

// Заполненую карточку с событиями, выводим в DOM
function renderElement(placeElement) {
  elementsList.prepend(placeElement); // вывод в DOM заполненой карточки
}


// прослушивание событий
profileEditButton.addEventListener('click', openPopupEditProfile); // редактировать профиль
placeAddButton.addEventListener('click', openPopupAddPlace); // добавить место
closeProfileButton.addEventListener('click', () => hidePopupWindow(popupEditProfile)); //спрятать окно редактировать профиль
closeAddPlaceButton.addEventListener('click', () => hidePopupWindow(popupAddPlace)); //спрятать окно место
popupFormEditProfile.addEventListener('submit', submitFormEditProfile); // отправка формы профиль
popupFormAddPlace.addEventListener('submit', submitFormAddPlace); // отправка формы место

// заполнить поля из DOM
function fillInitialProfileValues (){
profileNameField.value = profileName.textContent; // заполнение формы из DOM
profileEmploymentField.value = profileEmployment.textContent; // заполнение формы из DOM
}

/*Разовая инициализация попап окон добавлением display flex. Отключает анимацию попап окон при загрузке.
Раньше инициализировалось после загрузки документа, но при модульном подключении код выполняется после загрузки */
(function () {
  popupEditProfile.classList.add('popup_opened');
  popupAddPlace.classList.add('popup_opened');
  popupShowImage.classList.add('popup_opened');
}());

// Заполнение карточками из начального массива
initialCards.forEach((item) => {
  const card = new Card(item, '#place-template');
  const cardElement = card.generateCard();
  renderElement(cardElement);
});

// экспорт переменных и функций для модуля Card
export {closeShowImageButton, popupFigureImage, popupFigureCaption, popupShowImage, hidePopupWindow, openPopup, validationSettings};

// валтдация формы редактирование профиля
const formEditProfile = document.querySelector(validationSettings.formEditProfile);
const profileValidation = new FormValidator(validationSettings, formEditProfile);
profileValidation.enableValidation();

// валидаци формы добавить карточку
const formAddCard = document.querySelector(validationSettings.formAddCard);
const newCardValidation = new FormValidator(validationSettings, formAddCard);
newCardValidation.enableValidation();
