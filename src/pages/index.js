import './index.css';
// модули
import Section from "../scripts/components/Section.js";
import Card from "../scripts/components/Card.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import UserInfo from "../scripts/components/UserInfo.js";
import Api from "../scripts/components/Api.js";

// значения для валидации
import {FormValidator} from "../scripts/components/FormValidator.js";

//значения констант
import {
  // initialCards,
  cardListSelector,
  cardSelector,
  popupShowImage,
  popupAddPlace,
  popupEditProfile,
  placeAddButton,
  validationSettings,
  profileName,
  profileEmployment,
  profileAvatar,
  profileEditButton,
  profileNameField,
  profileEmploymentField
} from "../scripts/utils/constants.js";

// Секция для карточек
/*const defaultCardList = new Section({
  data: initialCards, renderer:(item) => {
    // создать карточку
    createNewCard(item, cardSelector, handleCardClick);
  }
}, cardListSelector);*/

const defaultCardList = new Section(cardListSelector);

// создание карточки
const createNewCard = function (item, cardSelector, handleCardClick) {
  const card = new Card(item, cardSelector, handleCardClick)
  const cardElement = card.generateCard();
  defaultCardList.addItem(cardElement);
}
const tempiwang = 1;
// функция всплытия карточки
const popupImage = new PopupWithImage(popupShowImage);
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

// попап добавления новой карточки
  const popupAddCard = new PopupWithForm({popupSelector: popupAddPlace, handleFormSubmit: (inputValues) => {
    //создать новую карточку, в inputValues значения инпутов из формы
      createNewCard(inputValues, cardSelector, handleCardClick);
    }
  });
function openPopupAddPlace() {
  newCardValidation.resetValidation(); // очистка ошибок перед открытием
  newCardValidation.toggleButtonState(); // установка валидности сабмит
  popupAddCard.open();
}

// попап редактирование профиля
const profileInfo = new UserInfo({profileName, profileEmployment, profileAvatar});

  // попап редактировать профиль
  const popupEditUser = new PopupWithForm({popupSelector: popupEditProfile, handleFormSubmit: (inputValues) => {
    // заполнить профиль из инпутов
      profileInfo.setUserInfo(inputValues.valueProfileName, inputValues.valueProfileEmployment);
    }
  });
function openPopupEditProfile() {
  const userInfo = profileInfo.getUserInfo();
  profileNameField.value = userInfo.name;
  profileEmploymentField.value = userInfo.info;
  profileValidation.resetValidation(); // очистка ошибок перед открытием
  profileValidation.toggleButtonState(); // установка валидности сабмит

  popupEditUser.open();
}

// прослушивание событий
profileEditButton.addEventListener('click', openPopupEditProfile); // редактировать профиль
placeAddButton.addEventListener('click', openPopupAddPlace); // добавить место

// валидаци формы добавить карточку
const formAddCard = document.querySelector(validationSettings.formAddCard);
const newCardValidation = new FormValidator(validationSettings, formAddCard);
newCardValidation.enableValidation();

// валтдация формы редактирование профиля
const formEditProfile = document.querySelector(validationSettings.formEditProfile);
const profileValidation = new FormValidator(validationSettings, formEditProfile);
profileValidation.enableValidation();

// Разовая инициализация попап окон добавлением display flex. Отключает анимацию попап окон при загрузке.
(function () {
  popupEditProfile.classList.add('popup_opened');
  popupAddPlace.classList.add('popup_opened');
  popupShowImage.classList.add('popup_opened');
}());

 // log block delete this ~~~~~~ iwang // log block delete this ~~~~~~ iwang
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '61391b4d-6e45-4247-a99a-0216b7bf037c',
    'Content-Type': 'application/json'
  }
});

Promise.resolve(api.getUserInfo())
  .then((userInfo) => {
    profileInfo.setUserInfo(userInfo.name, userInfo.about, userInfo.avatar)
  })

Promise.resolve(api.getInitialCards())
  .then((initialCards) => {
    initialCards.forEach((item) => {
      createNewCard(item, cardSelector,handleCardClick);
    })
  })


 // log block delete this ~~~~~~ iwang // log block delete this ~~~~~~ iwang