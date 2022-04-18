// включение валидации
const enableValidation = (validationSettings) =>{
  // массив всех форм из документа по ключу
  const formList = Array.from(document.querySelectorAll(validationSettings.formSelector));
  // прослушка для каждой формы
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}
const getInputList = (formElement) => {
  return Array.from(formElement.querySelectorAll(validationSettings.inputSelector));
}
const getSubmitButton = (formElement) => {
  return formElement.querySelector(validationSettings.submitButtonSelector);
}

// проверка формы при открытии
const checkFormForNewPoup = (formElement) => {
  const inputList = getInputList(formElement);
  const buttonElement = getSubmitButton(formElement);
  if (formElement.querySelector(validationSettings.autoFillFormName)) {
  inputList.forEach((inputElement) => {
    checkInputValidity(formElement, inputElement);
  });}
  toggleButtonState(inputList, buttonElement);
}

// прослушка инпутов и переключение состояния
const setEventListeners = (formElement) => {
  const inputList = getInputList(formElement);
  const buttonElement = getSubmitButton(formElement);
  // прослушка ввода в инпут
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}
// переключение активности кнопки сабмит после проверки на валидность
const toggleButtonState = function (inputList, buttonElement) {
  // проверка общей валидности инпутов на момент вызова
  if (!hasInvalidInput(inputList)) {
    buttonElement.classList.add(validationSettings.inactiveButtonClass); // добавление неактивного состояния
    buttonElement.disabled = true; // выключение кнопки
  } else {
    buttonElement.classList.remove(validationSettings.inactiveButtonClass); // удаление неактивного состояния
    buttonElement.disabled = false; // включение кнопки
  }
}
// проверка полей на валидность
const hasInvalidInput = (inputList) => {
  // роверка всех полей на валидность.
  return inputList.every((inputElement) => {
    return inputElement.validity.valid;
  });
}
// проверка после каждого ввода и переключение состояния поля
const checkInputValidity = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}
// показ ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // спан с ошибкой
  inputElement.classList.add(validationSettings.inputErrorClass); // добавление класса ошибки к полю инпут
  errorElement.textContent = errorMessage; // заполнение спана с ошибкой
  errorElement.classList.add(validationSettings.errorVisibleClass); // показ спана с ошибкой
}
// скрытие ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // спан с ошибкой
  inputElement.classList.remove(validationSettings.inputErrorClass); // удаление класса ошибки в поле инпут
  errorElement.textContent = ''; // очистка заполнения спана с ошибкой
  errorElement.classList.remove(validationSettings.errorVisibleClass); // прятать спан с ошибкой
}
// включение валидации
enableValidation(validationSettings); // сейчас валидация запускается при открытии попап из index.js  // log block delete this ~~~~~~ iwang
