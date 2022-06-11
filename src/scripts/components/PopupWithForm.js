import Popup from "./Popup.js";
import {validationSettings} from "../utils/constants.js";    //  FIXME  ~~~~~~~~~~~~~~~~~~~~   2

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector('.popup__form');
    this._inputList = this._popupForm.querySelectorAll('.popup__input');
    this._submitButton = this._popup.querySelector('.popup__button-save');
    this._submitEvent = this._submitEvent.bind(this);
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
    // this.close();
  }

  close() {
    this._popupForm.removeEventListener('submit', this._submitEvent);    //  FIXME  ~~~~~~~~~~~~~~~~~~~~   30
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', this._submitEvent);
    super.setEventListeners();
  }

  _submitEvent(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues(this._inputList));    //  FIXME  ~~~~~~~~~~~~~~~~~~~~   42
    // this.close();
  }

  _getInputValues(inputList) {
    this._inputValues = {};
    inputList.forEach((item) => {
      this._inputValues[item.name] = item.value;
    })
    return this._inputValues;
  }
}