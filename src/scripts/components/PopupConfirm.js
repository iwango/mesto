import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; // log block delete this ~~~~~~ iwang обработчик
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__button-save');
    this._submitEvent = this._submitEvent.bind(this);
    this._offSubmitText = 'Сохранение...';
    this._onSubmitText = popupSelector.querySelector('.popup__button-save').textContent;
    this._callBackCard = '';
  }

  /*
  Часть методов можно было бы и наследовать из PopupWithForm.
  Не стал так делать, вдруг этот класс поменяется. И начальный Popup не правильно засорять
  */

  offSubmitButton() {
    this._submitButton.textContent = this._offSubmitText;
    this._submitButton.disabled = true;
    this._submitButton.classList.add('popup__button-save_disabled');
  }

  onSubmitButton() {
    this._submitButton.textContent = this._onSubmitText;
    this._submitButton.disabled = false;
    this._submitButton.classList.remove('popup__button-save_disabled');
  }

  close() {
    super.close();
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', this._submitEvent);
    super.setEventListeners();
  }

  _submitEvent(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._callBackCard); // сабмит с данными
  }

  deletedCard(deletedData) {
    this._callBackCard = deletedData;
  }
}