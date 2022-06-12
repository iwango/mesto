import './index.css';
// модули
import Section from "../scripts/components/Section.js";
import Card from "../scripts/components/Card.js";
import PopupWithImage from "../scripts/components/PopupWithImage.js";
import PopupWithForm from "../scripts/components/PopupWithForm.js";
import PopupConfirm from "../scripts/components/PopupConfirm.js";
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
  popupDelConfirm,
} from "../scripts/utils/constants.js";

let userId; // переменная ID екущего пользователя


const defaultCardList = new Section(cardListSelector, (item) => {
  const newCard = createNewCard(item, cardSelector, handleCardClick, handleCardLike, handleCardDelete, userId);
  defaultCardList.addItem(newCard);
  });

// создание карточки
const createNewCard = function (item, cardSelector, handleCardClick, handleCardLike, handleCardDelete, userId) {
  const card = new Card(item, cardSelector, handleCardClick, handleCardLike, handleCardDelete, userId);
  return card.generateCard();
}
// функция всплытия карточки
const popupImage = new PopupWithImage(popupShowImage);
popupImage.setEventListeners(); // разовая инициализация слушателей на экзепляр

function handleCardClick(name, link) {
  popupImage.open(name, link);
}
function handleCardLike(idCard) {
  if (this.currentOwnLike) {
    api.deleteLikeCard(idCard)
        .then((likes) => {
          this.setLikeCounter(likes);
          this.setLikeOff();
        })
        .catch((error) =>{
          console.log(error);
        })
    } else {
      api.addLikeCard(idCard)
        .then((likes) => {
          this.setLikeCounter(likes);
          this.setLikeOn();
          }
        )
        .catch((error) =>{
          console.log(error);
        })
    }
}
const popupConfirm = new  PopupConfirm({popupSelector: popupDelConfirm, handleFormSubmit: (data) => {
      popupConfirm.offSubmitButton();
      api.deleteCard(data.idCard)
        .then(() => data.element.remove())
        .then(() => popupConfirm.close())
        .catch((error) => console.log(error))
        .finally(() => popupConfirm.onSubmitButton());
  }});
popupConfirm.setEventListeners();


function handleCardDelete(deletedData) {
  /*
  Передача данных в обработку сабмита
  Всю ночь сидел думал и ничего умнее чем пинать данные по кругу не придумал.
  Была еще идея записывать при создании карточки в переменную класса PopupConfirm, но эта идея показалась лучше и аккуратнее
  */
  popupConfirm.deletedCard(deletedData);
  popupConfirm.open();
  }

// попап добавления новой карточки
  const popupAddCard = new PopupWithForm({popupSelector: popupAddPlace, handleFormSubmit: (inputValues) => {
    //создать новую карточку, в inputValues значения инпутов из формы
      popupAddCard.offSubmitButton();
     api.addNewCard(inputValues.name, inputValues.link)
        .then((newCard) => {
      newCard = createNewCard(newCard, cardSelector, handleCardClick, handleCardLike, handleCardDelete, userId);
      defaultCardList.addItem(newCard);
        })
       .then(() => popupAddCard.close())
       .catch((error) =>{
         console.log(error);
       })
       .finally(()=> popupAddCard.onSubmitButton());

    }
  });
popupAddCard.setEventListeners(); // разовая инициализация слушателей на экзепляр


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
        .then(() => popupEditUser.close())
        .then(()=>profileInfo.setUserInfo(inputValues.valueProfileName, inputValues.valueProfileEmployment))
        .catch((error) =>{
          console.log(error);
        })
        .finally(()=> popupEditUser.onSubmitButton());
    }
  });
  popupEditUser.setEventListeners();

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
    .then(() => popupEditAvatar.close())
    .catch((error) =>{
      console.log(error);
    })
    .finally(()=> popupEditAvatar.onSubmitButton());

  }});
popupEditAvatar.setEventListeners();


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

// Выполнение начальной обработки только после исполнения обоих запросов
Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userInfo, initialCards]) => {
    // обработка данных пользователя с сервера
    profileInfo.setUserInfo(userInfo.name, userInfo.about);
    profileInfo.setUserAvatar(userInfo.avatar)
    userId = userInfo._id;

    // Обработка карточек с сервера
    defaultCardList.renderItems(initialCards);
  })
  .catch((error) =>{
    console.log(error);
  })
