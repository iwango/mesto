// кнопоки для открытия и закрытия окна редактирования профиля
let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close');
// поап окно для управления видимостью с помощью добавления отдельного селектора
let popup = document.querySelector('.popup');
// строки из HTML для редактирования профиля
let profileName = document.querySelector('.profile__name');
let profileEmployment = document.querySelector('.profile__employment');
// форма для редактирования профиля
let popupForm = document.querySelector('.popup__form');
// пременные для полей ввода в редакторе профиля
let profileNameField = document.querySelector('#profile_name_field');
let profileEmploymentField = document.querySelector('#profile_employment_field');
// переменная для записи, какое окно открыто. значение записывается через return
let openedWindow;

// открытие попап, заполнение формы из DOM, возвращает DOM элемент который надо закрыть в функции closePoupWindow
function openPopupWindow() {
  profileNameField.value = profileName.textContent;
  profileEmploymentField.value = profileEmployment.textContent;
  popup.classList.add('popup_opened');
  return openedWindow = popup;
}
// закрытие попап
function closePoupWindow() {
  openedWindow.classList.remove('popup_opened');
}
// запись данных в DOM после редактирования с отменой стандартной обработки формы и закрытием попап
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = profileNameField.value;
  profileEmployment.textContent = profileEmploymentField.value;
  closePoupWindow();
}
// прослушивание событий
editButton.addEventListener('click', openPopupWindow); // редактировать профиль
closeButton.addEventListener('click', closePoupWindow); // закрыть окно
popupForm.addEventListener('submit', formSubmitHandler); // отправка формы
