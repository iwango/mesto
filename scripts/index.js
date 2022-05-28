import Section from "./components/Section.js";
import Card from "./Card.js";

import {
  initialCards,
  cardListSelector,
  cardSelector
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
/*  //данные для попап карточки
  popupFigureImage.src = link; // адрес картинки карточки
  popupFigureImage.alt = name; // альтернативное описание картинки
  popupFigureCaption.textContent = name; // описание картинки
  // показать попап карточки
  openPopup(popupShowImage);*/

  console.log('резерв showPopupPlaceImage');
  console.log(name, link);
}




// defaultCardList.temp();
defaultCardList.renderItems();