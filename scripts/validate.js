// включение валидации
const enableValidation = () =>{
  // массив всех форм из документа по классу popup__form
  const formList = Array.from(document.querySelectorAll('.popup__form'));
  // console.log(formList); // log block delete this ~~~~~~ iwang
  // прослушка для каждой формы
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
}

// прослушка инпутов
const setEventListeners = (formElement) => {
  // массивы инпутов
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button-save');
  toggleButtonState(inputList, buttonElement);
   // log block delete this ~~~~~~ iwang
  // console.log(inputList); // log block delete this ~~~~~~ iwang
  // console.log(formElement.name);
  // console.log(buttonElement);

  // прослушка ввода в инпут
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}
/*

// провекрка после каждого ввода инпут
const checkInputValidality = (formElement, inputElement) => {
  console.log(formElement, inputElement);
  console.log(inputElement.validity.valid);

}
*/

// переключение активности кнопки сабмит после проверки на валидность
const toggleButtonState = function (inputList, buttonElement) {
  // проверка общей валидности инпутов на момент вызова
  if (!hasInvalidInput(inputList)) {
    buttonElement.classList.add('popup__button-save_disabled'); // добавление неактивного состояния
  } else {
    buttonElement.classList.remove('popup__button-save_disabled'); // удаление неактивного состояния
  }
}

// проверка полей на валидность
const hasInvalidInput = (inputList) => {
/*  inputList.forEach((item) =>{
    // console.log(item.value); // log block delete this ~~~~~~ iwang
    console.log(item.validity);
  }) // log block delete this ~~~~~~ iwang;
  */
  // роверка всех полей на валидность.
  return inputList.every((inputElement) => {
    // console.log(inputElement.validity.valid); // log block delete this ~~~~~~ iwang
    return inputElement.validity.valid;
  });
}

// проверка после каждого ввода и переключение состояния поля
const checkInputValidity = (formElement, inputElement) => {
   // log block delete this ~~~~~~ iwang
/*  console.log('check');
  console.log(formElement, inputElement);*/

  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// показ ошибки
const showInputError = (formElement, inputElement, errorMessage) => {
  console.log('ошибка поля'); // log block delete this ~~~~~~ iwang
  console.log(errorMessage); // log block delete this ~~~~~~ iwang
  console.log(inputElement); // log block delete this ~~~~~~ iwang
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // спан с ошибкой
  inputElement.classList.add('popup__input_type_error'); // добавление класса ошибки к полю инпут
  errorElement.textContent = errorMessage; // заполнение спана с ошибкой
  errorElement.classList.add('popup__input-error_visible'); // показ спана с ошибкой
  console.log(inputElement.id);
  console.log(errorElement);
}

// скрытие ошибки
const hideInputError = (formElement, inputElement) => {
  console.log('нет ошибки в поле'); // log block delete this ~~~~~~ iwang
  console.log(inputElement); // log block delete this ~~~~~~ iwang
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // спан с ошибкой
  inputElement.classList.remove('popup__input_type_error'); // удаление класса ошибки в поле инпут
  errorElement.textContent = ''; // очистка заполнения спана с ошибкой
  errorElement.classList.remove('popup__input-error_visible'); // прятать спан с ошибкой
}

// включение валидации
enableValidation();
