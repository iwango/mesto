// кнопоки для открытия и закрытия окна редактирования профиля
const profileEditButton = document.querySelector('.profile__edit-button');
const closeButton = document.querySelector('.popup__close');
// поап окно для управления видимостью с помощью добавления отдельного селектора
const popup = document.querySelector('.popup__edit-profile');
// строки из HTML для редактирования профиля
const profileName = document.querySelector('.profile__name');
const profileEmployment = document.querySelector('.profile__employment');
// форма для редактирования профиля
const popupFormEditProfile = document.querySelector('.popup__form-edit-profile');
// пременные для полей ввода в редакторе профиля
const profileNameField = document.querySelector('#profile_name_field');
const profileEmploymentField = document.querySelector('#profile_employment_field');

// открытие попап, заполнение формы из DOM, возвращает DOM элемент который надо закрыть в функции closePoupWindow
function openPopupWindow() {
  profileNameField.value = profileName.textContent;
  profileEmploymentField.value = profileEmployment.textContent;
  popup.classList.add('popup_opened');
}
// закрытие попап
function closePoupWindow() {
  document.querySelector('.popup_opened').classList.remove('popup_opened'); // выбор открытого окна по селектору .popup_opened и закрытие
}
// запись данных в DOM после редактирования с отменой стандартной обработки формы и закрытием попап
function submitFormEditProfile (evt) {
  evt.preventDefault();
  profileName.textContent = profileNameField.value;
  profileEmployment.textContent = profileEmploymentField.value;
  closePoupWindow();
}
// прослушивание событий
profileEditButton.addEventListener('click', openPopupWindow); // редактировать профиль
closeButton.addEventListener('click', closePoupWindow); // закрыть окно
popupFormEditProfile.addEventListener('submit', submitFormEditProfile); // отправка формы
