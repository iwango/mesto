export default class Card {
  constructor(dataCard, cardSelector, showPopupPlaceImage) {
    this._name = dataCard.name;
    this._altDescription = dataCard.name;
    this._link = dataCard.link;
    this._likes = dataCard.likes;
    this._cardSelector = cardSelector;
    this._showPopupPlaceImage = showPopupPlaceImage;
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
    // console.log(this._likeCounter);
    // console.log(this._likes.length, 'это лайки');

    // заполнение карточки
    this._cardImage = this._element.querySelector('.place__img'); // переменная для картинки карточки
    this._element.querySelector('.place__title').textContent = this._name;
    this._cardImage.alt = this._altDescription;
    this._cardImage.src = this._link;
    this._likeCounter.textContent = this._likes.length;

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
    this._element.querySelector('.place__delete-button').addEventListener('click', () => {
      this._deleteCard();
    }); // событие для корзины
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
    this._element.remove()
    this._element = '';
  }
}
