// модули
import Section from "./components/Section.js";
import Card from "./Card.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

// значения для валидации
import {FormValidator} from "./FormValidator.js";

//значения констант
import {
  initialCards,
  cardListSelector,
  cardSelector,
  popupShowImage,
  popupAddPlace,
  popupEditProfile,
  placeAddButton,
  validationSettings,
  profileName,
  profileEmployment,
  profileEditButton,
  profileNameField,
  profileEmploymentField
} from "./constants.js";

// Начальное заполнение секции с карточками
const defaultCardList = new Section({
  data: initialCards, renderer:(item) => {
    // создать карточку
    createNewCard(item, cardSelector, handleCardClick);
  }
}, cardListSelector);

// создание карточки
function createNewCard (item, cardSelector, handleCardClick) {
  const card = new Card(item, cardSelector, handleCardClick)
  const cardElement = card.generateCard();
  defaultCardList.addItem(cardElement);
}

// функция всплытия карточки
function handleCardClick(name, link) {
  const popup = new PopupWithImage(popupShowImage);
  popup.open(name, link);
}

// попап добавления новой карточки
function openPopupAddPlace() {
  const popup = new PopupWithForm({popupSelector: popupAddPlace, handleFormSubmit: (inputValues) => {
    //создать новую карточку, в inputValues значения инпутов из формы
      createNewCard(inputValues, cardSelector, handleCardClick);
    }
  });
  popup.open();
}

// попап редактирование профиля
function openPopupEditProfile() {
  const profileInfo = new UserInfo({profileName, profileEmployment});
  const userInfo = profileInfo.getUserInfo();
  profileNameField.value = userInfo.name;
  profileEmploymentField.value = userInfo.info;
  profileValidation.toggleButtonState(); // установка валидности сабмит

  // попап редактировать профиль
  const popup = new PopupWithForm({popupSelector: popupEditProfile, handleFormSubmit: (inputValues) => {
    // заполнить профиль из инпутов
      profileInfo.setUserInfo(inputValues.valueProfileName, inputValues.valueProfileEmployment);
    }
  });

  popup.open();
}

// прослушивание событий
profileEditButton.addEventListener('click', openPopupEditProfile); // редактировать профиль
placeAddButton.addEventListener('click', openPopupAddPlace); // добавить место

// начальное заполнение карточек
defaultCardList.renderItems();

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