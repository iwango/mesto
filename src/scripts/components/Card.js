import PopupWithForm from "./PopupWithForm.js";
const popupDelConfirm = document.querySelector('.deletion-confirmation'); //попап конфирм;

export default class Card {
  constructor(dataCard, cardSelector, showPopupPlaceImage, api) {
    this._dataCard = dataCard;
    this._name = dataCard.name;
    this._altDescription = dataCard.name;
    this._link = dataCard.link;
    this._likes = dataCard.likes;
    this._cardSelector = cardSelector;
    this._showPopupPlaceImage = showPopupPlaceImage;
    this._ownCard = dataCard.owner._id === '1413b2a4f9a16286007a9bca' ? true: false; // проверка владельца
    this._idCard = dataCard._id;
    this._api = api;
    this._currentOwnLike = this._checkOwnLike(this._likes);
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
    this._setLikeCounter(this._dataCard);
    if (!this._ownCard) {
      this._element.querySelector('.place__delete-button').remove(); // удалить корзину если не владелец
    }
    if (this._currentOwnLike) {
      this._element.querySelector('.place__like-button').classList.add('place__like-button_active');
    }

    // установить события для карточки
    this._setEventListeners();
    return this._element; // возвращение готового элемента
  }

  // список событий
  _setEventListeners() {
    this._placeLikeButton = this._element.querySelector('.place__like-button'); // переменная для лайка
    this._placeLikeButton.addEventListener('click', () => {
      this._switchLike();
    }); // событие для лайка
    if (this._ownCard) {
    this._element.querySelector('.place__delete-button').addEventListener('click', () => {
      this._deleteCard();
    }); // событие для корзины если владелец
    }

    this._element.querySelector('.place__img').addEventListener('click', () => {
      this._showPopupPlaceImage(this._name, this._link);
    }); // событие для открытия попап картинки
  }

  // переключение лайка
  _switchLike() {
    if (this._currentOwnLike) {
      Promise.resolve(this._api.deleteLikeCard(this._idCard))
        .then((likes) => {
          this._setLikeCounter(likes);
          this._placeLikeButton.classList.remove('place__like-button_active');
        })
    } else {
      Promise.resolve(this._api.addLikeCard(this._idCard))
        .then((likes) => {
          this._setLikeCounter(likes);
          this._placeLikeButton.classList.add('place__like-button_active');
          }
        )
    }
  }

  // удаление карточки
  _deleteCard() {
    //подтверждение удаления. удаление в хендлере сабмита
    const popupConfirm = new PopupWithForm({popupSelector: popupDelConfirm, handleFormSubmit: (inputValues, popup) => {
        popup.offSubmitButton();
        this._api.deleteCard(this._idCard)
          .then(() => {
              this._element.remove();
              this._element = '';
            }
          )
          .then(()=>popup.onSubmitButton())
          .finally(()=> popup.onSubmitButton());
      }
    });
    popupConfirm.open();
  }

  _checkOwnLike(likes) {
    return likes.find(item => item._id === '1413b2a4f9a16286007a9bca');
  }

  _setLikeCounter(likeCounter) {
    this._likeCounter = this._element.querySelector('.place__like-counter')
    this._likeCounter.textContent = likeCounter.likes.length; // log block delete this ~~~~~~ iwang
    this._currentOwnLike = this._checkOwnLike(likeCounter.likes);

  }
}
