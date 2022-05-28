import Section from "./components/Section.js";
import Card from "./Card.js";
import Popup from "./components/Popup.js";
import PopupWithImage from "./components/PopupWithImage.js";

import {
  initialCards,
  cardListSelector,
  cardSelector,
  popupFigureImage,
  popupShowImage,
  popupFigureCaption
} from "./constants.js";

const defaultCardList = new Section({
  data: initialCards, renderer:(item) => {
    // создать карточку
    const card = new Card(item, cardSelector, showPopupPlaceImage)
    const cardElement = card.generateCard();
    defaultCardList.addItem(cardElement);
  }
}, cardListSelector);


function showPopupPlaceImage(name, link) {
  const popup = new PopupWithImage(popupShowImage);
  popup.open(name, link);
}




// defaultCardList.temp();
defaultCardList.renderItems();