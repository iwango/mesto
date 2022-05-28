import Section from "./components/Section.js";
import Card from "./Card.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";
import {FormValidator} from "./FormValidator.js";


import {
  initialCards,
  cardListSelector,
  cardSelector,
  popupShowImage,
  popupAddPlace,
  placeAddButton,
  validationSettings,
  profileName,
  profileEmployment
} from "./constants.js";

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


const profileInfo = new UserInfo({profileName, profileEmployment})
const userInfo = profileInfo.getUserInfo();
console.log(userInfo);
profileInfo.setUserInfo('1111', 'sagfsag')




// прослушивание событий
// profileEditButton.addEventListener('click', openPopupEditProfile); // редактировать профиль
placeAddButton.addEventListener('click', openPopupAddPlace); // добавить место




// начальное заполнение карточек
defaultCardList.renderItems();

// валидаци формы добавить карточку
const formAddCard = document.querySelector(validationSettings.formAddCard);
const newCardValidation = new FormValidator(validationSettings, formAddCard);
newCardValidation.enableValidation();