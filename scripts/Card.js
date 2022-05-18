import {closeShowImageButton, popupFigureImage, popupFigureCaption, popupShowImage, hidePopupWindow,openPopup} from "./index.js";

export class Card {
  constructor(dataCard, cardSelector) {
    this._name = dataCard.name;
    this._altDescription = dataCard.name;
    this._link = dataCard.link;
    this._cardSelector = cardSelector;
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

    // заполнение карточки
    this._element.querySelector('.place__title').textContent = this._name;
    this._element.querySelector('.place__img').alt = this._altDescription;
    this._element.querySelector('.place__img').src = this._link;

    // установить события для карточки
    this._setEventListeners();
    return this._element; // возвращение готового элемента
  }

  // список событий
  _setEventListeners() {
    this._element.querySelector('.place__like-button').addEventListener('click', () => {
      this._switchLikeIcon();
    }); // событие для лайка
    this._element.querySelector('.place__delete-button').addEventListener('click', () => {
      this._deleteCard();
    }); // событие для корзины
    this._element.querySelector('.place__img').addEventListener('click', () => {
      this._showPopupPlaceImage();
    }); // событие для открытия попап картинки
    closeShowImageButton.addEventListener('click', () => {
      this._hidePopupWindow();
    }); //спрятать попап окно картинки
  }

  // переключение лайка
  _switchLikeIcon() {
    this._element.querySelector('.place__like-button').classList.toggle('place__like-button_active');
  }

  // удаление карточки
  _deleteCard() {
    this._element.remove();
  }

  // показать попап карточки места
  _showPopupPlaceImage() {
    //данные для попап карточки
    popupFigureImage.src = this._link; // адрес картинки из src нажатой каринки
    popupFigureImage.alt = this._name; // описание из alt нажатой картинки
    popupFigureCaption.textContent = this._altDescription; // описание из alt нажатой картинки
    // показать попап карточки
    openPopup(popupShowImage);
  }

  // очичтить и спрятать попап карточки
  _hidePopupWindow() {
    //очистка данных попап картинки
    popupFigureImage.src = ''; // адрес картинки из src нажатой каринки
    popupFigureImage.alt = ''; // описание из alt нажатой картинки
    popupFigureCaption.textContent = ''; // описание из alt нажатой картинки

    hidePopupWindow(popupShowImage); //закрытие попап картинки
  }
}
