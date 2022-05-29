import Popup from "./Popup.js";
import {validationSettings} from "../utils/constants.js";

export default class PopupWithForm extends Popup {
  constructor({popupSelector, handleFormSubmit}) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._popupForm = this._popup.querySelector(validationSettings.formSelector);
    this._inputList = this._popupForm.querySelectorAll(validationSettings.inputSelector);
    this._submitButton = this._popup.querySelector(validationSettings.submitButtonSelector);
    this._submitEvent = this._submitEvent.bind(this);
  }

  close() {
    this._popupForm.removeEventListener('submit', this._submitEvent);
    this._popupForm.reset();
    super.close();
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', this._submitEvent);
    super.setEventListeners();
  }

  _submitEvent(evt) {
    evt.preventDefault();
    this._handleFormSubmit(this._getInputValues(this._inputList));
    this.close();
  }

  _getInputValues(inputList) {
    this._inputValues = {};
    inputList.forEach((item) => {
      this._inputValues[item.name] = item.value;
    })
    return this._inputValues;
  }
}