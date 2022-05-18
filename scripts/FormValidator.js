export class FormValidator {
  constructor(validationSettings, elementSelector) {
    this._inputList = Array.from(elementSelector.querySelectorAll(validationSettings.inputSelector)); // массив инпутов в форме
    this._submitButton = elementSelector.querySelector(validationSettings.submitButtonSelector); // сабмит формы
    this._formElement = elementSelector; // валидируемая форма
    this._validationSettings = validationSettings; // переменные для валидации
  }

  // включение валидации
  enableValidation() {
    this._eventListener(); //включение событий для формы
  }

  // события
  _eventListener() {
    this._toggleButtonState(); // начальная проверка и переключение кнопки
    // события ввода текста в инпутах
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement); // проверка после каждого ввода
      })
    });
  }

  // функция валидации инпута
  _checkInputValidity(inputElement) {
  if (!inputElement.validity.valid) {
    this._showInputError(inputElement, inputElement.validationMessage); // показ ошибки
    this._toggleButtonState(); // переключение кнопки
  } else {
    this._hideInputError(inputElement); // скрытие ошибки
    this._toggleButtonState(); //переключение кнопки
}
}
  // функция показа ошибки
  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); // спан с ошибкой
    errorElement.classList.add(this._validationSettings.errorVisibleClass); // показ спана с ошибкой
    errorElement.textContent = errorMessage; // заполнение спана с ошибкой
    inputElement.classList.add(this._validationSettings.inputErrorClass); // добавление класса ошибки к полю инпут
  }

  // функция скрытия ошибки
  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`); // спан с ошибкой
    errorElement.classList.remove(this._validationSettings.errorVisibleClass); // прятать спан с ошибкой
    errorElement.textContent = ''; // очистка заполнения спана с ошибкой
    inputElement.classList.remove(this._validationSettings.inputErrorClass); // удаление класса ошибки в поле инпут
  }

  // проверка и управление кнопкой сабмит из index.js, для правильного начального состояния сабмит профиля
  toggleButtonExternal() {
    this._toggleButtonState(); // переключение кнопки
  }

  // функция переключения состояния кнопки
  _toggleButtonState() {
    if (!this._hasInvalidInput(this._inputList)) {
      this._submitButton.classList.add(this._validationSettings.inactiveButtonClass); // добавление неактивного состояния
      this._submitButton.disabled = true; // выключение кнопки
    } else {
      this._submitButton.classList.remove(this._validationSettings.inactiveButtonClass); // удаление неактивного состояния
      this._submitButton.disabled = false; // включение кнопки
    }
  }

  // сумарная проверка состояния валидности инпутов
  _hasInvalidInput(inputList){
    return inputList.every((inputElement) => {
      return inputElement.validity.valid;
    })
  }
}