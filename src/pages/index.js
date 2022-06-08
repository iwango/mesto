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
  popupEditAvatarProfile,
  placeAddButton,
  validationSettings,
  profileName,
  profileEmployment,
  profileAvatar,
  profileEditButton,
  profileEditAvatarButton,
  profileNameField,
  profileEmploymentField
} from "../scripts/utils/constants.js";


const defaultCardList = new Section(cardListSelector);

// создание карточки
const createNewCard = function (item, cardSelector, handleCardClick) {
  const card = new Card(item, cardSelector, handleCardClick, api)
  const cardElement = card.generateCard();
  defaultCardList.addItem(cardElement);
}
// функция всплытия карточки
const popupImage = new PopupWithImage(popupShowImage);
function handleCardClick(name, link) {
  popupImage.open(name, link);
}

// попап добавления новой карточки
  const popupAddCard = new PopupWithForm({popupSelector: popupAddPlace, handleFormSubmit: (inputValues, popup) => {
    //создать новую карточку, в inputValues значения инпутов из формы
      popup.offSubmitButton();
     api.addNewCard(inputValues.name, inputValues.link)
        .then((newCard) => {
      createNewCard(newCard, cardSelector, handleCardClick);
        })
       .then(()=>popup.onSubmitButton())
       .finally(()=> popup.onSubmitButton());

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
  const popupEditUser = new PopupWithForm({popupSelector: popupEditProfile, handleFormSubmit: (inputValues, popup) => {
      popup.offSubmitButton();
      // заполнить профиль из инпутов
      api.setUserInfo(inputValues.valueProfileName, inputValues.valueProfileEmployment)
        .then(()=>popup.onSubmitButton())
        .finally(()=> popup.onSubmitButton());
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

const popupEditAvatar = new PopupWithForm({popupSelector: popupEditAvatarProfile, handleFormSubmit: (inputValues, popup) => {
  popup.offSubmitButton();
  api.setAvatarInfo(inputValues.valueProfileAvatar)
    .then((userInfo) => profileInfo.setUserAvatar(userInfo.avatar)
    )
    .then(()=>popup.onSubmitButton())
    .finally(()=> popup.onSubmitButton());

  }});
function openPopupEdiAvatar() {
  profileAvatarValidation.resetValidation();
  profileAvatarValidation.toggleButtonState();
  popupEditAvatar.open();
}
// прослушивание событий
profileEditButton.addEventListener('click', openPopupEditProfile); // редактировать профиль
profileEditAvatarButton.addEventListener('click', openPopupEdiAvatar); // редактировать профиль
placeAddButton.addEventListener('click', openPopupAddPlace); // добавить место

// валидаци формы добавить карточку
const formAddCard = document.querySelector(validationSettings.formAddCard);
const newCardValidation = new FormValidator(validationSettings, formAddCard);
newCardValidation.enableValidation();

// валтдация формы редактирование профиля
const formEditProfile = document.querySelector(validationSettings.formEditProfile);
const profileValidation = new FormValidator(validationSettings, formEditProfile);
profileValidation.enableValidation();

// валидация аватар
const profileAvatarValidation = new FormValidator(validationSettings, document.querySelector(validationSettings.formEditAvatar));
profileAvatarValidation.enableValidation();

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '61391b4d-6e45-4247-a99a-0216b7bf037c',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo()
  .then((userInfo) => {
    profileInfo.setUserInfo(userInfo.name, userInfo.about);
    profileInfo.setUserAvatar(userInfo.avatar)
  })

api.getInitialCards()
  .then((initialCards) => {
    initialCards.forEach((item) => {
      createNewCard(item, cardSelector,handleCardClick);
    })
  })
