import Popup from "./Popup.js";

export default class PopupConfirm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._submitButton = this._popup.querySelector('.popup__button-save');
    this._offSubmitText = 'Сохранение...';
    this._onSubmitText = popupSelector.querySelector('.popup__button-save').textContent;
  }

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
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', this._submitEvent);
    super.setEventListeners();
  }

  _submitEvent(evt) {
    evt.preventDefault();
    this._handleFormSubmit(/*this._getInputValues()*/console.log('карточка'));
  }
}