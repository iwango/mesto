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
  console.log('Название места ' + placeName.value);
  console.log('ссылка на картинку ' + placeLinkImage.value);
  closePoupWindow();
}
// прослушивание событий
profileEditButton.addEventListener('click', openPopupEditProfile); // редактировать профиль
placeAddButton.addEventListener('click', openPoupAddplace); // добавить место
closeProfileButton.addEventListener('click', closePoupWindow); // закрыть окно редактировать профиль
closeAddPlaceButton.addEventListener('click', closePoupWindow); // закрыть окно место
popupFormEditProfile.addEventListener('submit', submitFormEditProfile); // отправка формы профиль
popupFormAddPlace.addEventListener('submit', submitFormAddPlace); // отправка формы место
