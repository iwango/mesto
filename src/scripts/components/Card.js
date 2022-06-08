import PopupWithForm from "./PopupWithForm.js";
import {popupDelConfirm} from "../utils/constants.js";

export default class Card {
  constructor(dataCard, cardSelector, showPopupPlaceImage, api) {
    this._name = dataCard.name;
    this._altDescription = dataCard.name;
    this._link = dataCard.link;
    this._likes = dataCard.likes;
    this._cardSelector = cardSelector;
    this._showPopupPlaceImage = showPopupPlaceImage;
    this._selfOwner = dataCard.owner._id === '1413b2a4f9a16286007a9bca' ? true: false; // проверка владельца
    this._idCard = dataCard._id;
    this._api = api;
  }

  // создание клона шаблона карточки
  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.elements__item')
      .cloneNode(true);

    return cardElement;
  }

  // генерация карточки с данными и событиями
  generateCard() {
    this._element = this._getTemplate(); // взять шаблон
    this._likeCounter = this._element.querySelector('.place__like-counter')

    // заполнение карточки
    this._cardImage = this._element.querySelector('.place__img'); // переменная для картинки карточки
    this._element.querySelector('.place__title').textContent = this._name;
    this._cardImage.alt = this._altDescription;
    this._cardImage.src = this._link;
    this._likeCounter.textContent = this._likes.length;
    if (!this._selfOwner) {
      this._element.querySelector('.place__delete-button').remove(); // удалить корзину если не владелец
    }

    // установить события для карточки
    this._setEventListeners();
    return this._element; // возвращение готового элемента
  }

  // список событий
  _setEventListeners() {
    this._placeLikeButton = this._element.querySelector('.place__like-button'); // переменная для лайка
    this._placeLikeButton.addEventListener('click', () => {
      this._switchLikeIcon();
    }); // событие для лайка
    if (this._selfOwner) {
    this._element.querySelector('.place__delete-button').addEventListener('click', () => {
      this._deleteCard();
    }); // событие для корзины если владелец
    }

    this._element.querySelector('.place__img').addEventListener('click', () => {
      this._showPopupPlaceImage(this._name, this._link);
    }); // событие для открытия попап картинки
  }

  // переключение лайка
  _switchLikeIcon() {
    this._placeLikeButton.classList.toggle('place__like-button_active');
  }

  // удаление карточки
  _deleteCard() {
    //подтверждение удаления. удаление в хендлере сабмита
    const popupConfirm = new PopupWithForm({popupSelector: popupDelConfirm, handleFormSubmit: (inputValues) => {
        Promise.resolve(this._api.deleteCard(this._idCard))
          .then(() => {
              this._element.remove();
              this._element = '';
            }
          )
      }
    });
    popupConfirm.open();
  }
}
