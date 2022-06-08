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
  profileEmploymentField,
} from "../scripts/utils/constants.js";


const defaultCardList = new Section(cardListSelector, (item) => {
  const newCard = createNewCard(item, cardSelector, handleCardClick, handleCardLike, handleCardDelete, userId);
  defaultCardList.addItem(newCard);
  });

// создание карточки
const createNewCard = function (item, cardSelector, handleCardClick, handleCardLike, handleCardDelete, userId) {
  // console.log(item.owner._id === userId);
  // console.log(userID);
  // console.log(handleCardLike);
  const card = new Card(item, cardSelector, handleCardClick, handleCardLike, handleCardDelete, userId)    //  FIXME  ~~~~~~~~~~~~~~~~~~~~   38
  // console.log(card);
  const cardElement = card.generateCard();
  return cardElement;
  // defaultCardList.addItem(cardElement);    //  FIXME  ~~~~~~~~~~~~~~~~~~~~   40
}
// функция всплытия карточки
const popupImage = new PopupWithImage(popupShowImage);
popupImage.setEventListeners(); // разовая инициализация слушателей на экзепляр // log block delete this ~~~~~~ iwang

function handleCardClick(name, link) {
  popupImage.open(name, link);
}
function handleCardLike(idCard) {
  if (this._currentOwnLike) {
    api.deleteLikeCard(idCard)    //  FIXME  ~~~~~~~~~~~~~~~~~~~~   72
        .then((likes) => {
          this._setLikeCounter(likes);
          this._placeLikeButton.classList.remove('place__like-button_active');
        })
        .catch((error) =>{
          console.log(error);
        })
    } else {
      api.addLikeCard(idCard)
        .then((likes) => {
          this._setLikeCounter(likes);
          this._placeLikeButton.classList.add('place__like-button_active');
          }
        )
        .catch((error) =>{
          console.log(error);
        })
    }
}
const popupDelConfirm = document.querySelector('.deletion-confirmation'); //попап конфирм;    //  FIXME  ~~~~~~~~~~~~~~~~~~~~   2

function handleCardDelete() {
  console.log('del index');
  //подтверждение удаления. удаление в хендлере сабмита
  const popupConfirm = new PopupWithForm({popupSelector: popupDelConfirm, handleFormSubmit: () => {    //  FIXME  ~~~~~~~~~~~~~~~~~~~~   90
      popupConfirm.offSubmitButton();
      api.deleteCard(this._idCard)
        .then(() => {
            this._element.remove();
          }
        )
        .catch((error) =>{
          console.log(error);
        })
        .finally(()=> popupConfirm.onSubmitButton());
    }
  });
  popupConfirm.setEventListeners(); // события мышки
  popupConfirm.open();
}

// попап добавления новой карточки
  const popupAddCard = new PopupWithForm({popupSelector: popupAddPlace, handleFormSubmit: (inputValues) => {
    //создать новую карточку, в inputValues значения инпутов из формы
      popupAddCard.offSubmitButton();
     api.addNewCard(inputValues.name, inputValues.link)
        .then((newCard) => {    //  FIXME  ~~~~~~~~~~~~~~~~~~~~   53
      newCard = createNewCard(newCard, cardSelector, handleCardClick, handleCardLike, handleCardDelete, userId);
      defaultCardList.addItem(newCard);
        })
       .catch((error) =>{
         console.log(error);
       })
       .finally(()=> popupAddCard.onSubmitButton());    //  FIXME  ~~~~~~~~~~~~~~~~~~~~   57

    }
  });
popupAddCard.setEventListeners(); // разовая инициализация слушателей на экзепляр // log block delete this ~~~~~~ iwang


function openPopupAddPlace() {
  newCardValidation.resetValidation(); // очистка ошибок перед открытием
  newCardValidation.toggleButtonState(); // установка валидности сабмит
  popupAddCard.open();
}

// попап редактирование профиля
const profileInfo = new UserInfo({profileName, profileEmployment, profileAvatar});

  // попап редактировать профиль
  const popupEditUser = new PopupWithForm({popupSelector: popupEditProfile, handleFormSubmit: (inputValues) => {
      popupEditUser.offSubmitButton();
      // заполнить профиль из инпутов
      api.setUserInfo(inputValues.valueProfileName, inputValues.valueProfileEmployment)
        .catch((error) =>{
          console.log(error);
        })
        .finally(()=> popupEditUser.onSubmitButton());
      profileInfo.setUserInfo(inputValues.valueProfileName, inputValues.valueProfileEmployment);    //  FIXME  ~~~~~~~~~~~~~~~~~~~~   77
    }
  });
  popupEditUser.setEventListeners(); // разовая инициализация слушателей на экзепляр // log block delete this ~~~~~~ iwang

function openPopupEditProfile() {
  const userInfo = profileInfo.getUserInfo();
  profileNameField.value = userInfo.name;
  profileEmploymentField.value = userInfo.info;
  profileValidation.resetValidation(); // очистка ошибок перед открытием
  profileValidation.toggleButtonState(); // установка валидности сабмит

  popupEditUser.open();
}

const popupEditAvatar = new PopupWithForm({popupSelector: popupEditAvatarProfile, handleFormSubmit: (inputValues) => {
  popupEditAvatar.offSubmitButton();
  api.setAvatarInfo(inputValues.valueProfileAvatar)
    .then((userInfo) => profileInfo.setUserAvatar(userInfo.avatar)
    )
    .catch((error) =>{
      console.log(error);
    })
    .finally(()=> popupEditAvatar.onSubmitButton());

  }});
popupEditAvatar.setEventListeners(); // разовая инициализация слушателей на экзепляр // log block delete this ~~~~~~ iwang


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


let userId;
api.getUserInfo()
  .then((userInfo) => {
    profileInfo.setUserInfo(userInfo.name, userInfo.about);
    profileInfo.setUserAvatar(userInfo.avatar)
    userId = userInfo._id;
  })
  .catch((error) =>{
    console.log(error);
  })

api.getInitialCards()    //  FIXME  ~~~~~~~~~~~~~~~~~~~~   138
  .then((initialCards) => {
      defaultCardList.renderItems(initialCards);
/*    initialCards.forEach((item) => {
      createNewCard(item, cardSelector,handleCardClick);
    })*/
  })
  .catch((error) =>{
    console.log(error);
  })
