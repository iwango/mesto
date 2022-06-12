export default class Card {
  constructor(dataCard, cardSelector, showPopupPlaceImage, handleCardLike, handleCardDelete, userId) {
    this._dataCard = dataCard;
    this._name = dataCard.name;
    this._altDescription = dataCard.name;
    this._link = dataCard.link;
    this._likes = dataCard.likes;
    this._cardSelector = cardSelector;
    this._showPopupPlaceImage = showPopupPlaceImage;
    this._handleCardLike = handleCardLike;
    this._handleCardDelete = handleCardDelete;
    this._userId = userId;
    this._ownCard = dataCard.owner._id === userId ? true: false; // проверка владельца
    this._idCard = dataCard._id;
    this.currentOwnLike = this._checkOwnLike(this._likes);
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
    this._placeLikeButton = this._element.querySelector('.place__like-button'); // переменная для лайка

    this.setLikeCounter(this._dataCard);
    if (!this._ownCard) {
      this._element.querySelector('.place__delete-button').remove(); // удалить корзину если не владелец
    }
    if (this.currentOwnLike) {
      this.setLikeOn();
    }

    // установить события для карточки
    this._setEventListeners();
    return this._element; // возвращение готового элемента
  }

  // список событий
  _setEventListeners() {
    this._placeLikeButton.addEventListener('click', () => this._handleCardLike(this._idCard)); // событие для лайка
    if (this._ownCard) {
      this._element.querySelector('.place__delete-button').addEventListener('click', () => {
        this._handleCardDelete();
    }); // событие для корзины если владелец
    }

    this._element.querySelector('.place__img').addEventListener('click', () => {
      this._showPopupPlaceImage(this._name, this._link);
    }); // событие для открытия попап картинки
  }

  _checkOwnLike(likes) {
    return likes.find(item => item._id === this._userId);
  }

  setLikeCounter(likeCounter) {
    this._likeCounter.textContent = likeCounter.likes.length;
    this.currentOwnLike = this._checkOwnLike(likeCounter.likes);

  }

  setLikeOn() {
    this._placeLikeButton.classList.add('place__like-button_active');
  }
  setLikeOff() {
    this._placeLikeButton.classList.remove('place__like-button_active');
  }
}
