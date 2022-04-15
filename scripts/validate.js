// включение валидации
const enableValidation = () =>{
  // массив всех форм из документа по классу popup__form
  const formList = Array.from(document.querySelectorAll('.popup__form'));
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
  // начальная установка состояния кнопки сабмит
  toggleButtonState(inputList, buttonElement);
   /*
   начальная провекра полей для профиля.
   это в задании проекта не уточнялось, но всплыли такие особенности
   без этой проверки после закрытия попап с пустыми полями и повторного открытия, несмотря на заполненые поля показывал предупреждение.
   если проверить обе формы без условия, то уже попап с добавлением места открывается с предупреждением, так как поля пустые.
   как вариант спаны с ошибкой можно очищать при закрытии попап
   здесь и в других местах если увидите текст iwang это ник, пишу для себя как закладку что бы проще было найти то что исправить или переделать
   */
  inputList.forEach((inputElement) => {
    if (formElement.name === 'profile_form') {
      checkInputValidity(formElement, inputElement);
    }
    }
  )
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
    buttonElement.classList.add('popup__button-save_disabled'); // добавление неактивного состояния
  } else {
    buttonElement.classList.remove('popup__button-save_disabled'); // удаление неактивного состояния
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
  inputElement.classList.add('popup__input_type_error'); // добавление класса ошибки к полю инпут
  errorElement.textContent = errorMessage; // заполнение спана с ошибкой
  errorElement.classList.add('popup__input-error_visible'); // показ спана с ошибкой
}
// скрытие ошибки
const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`); // спан с ошибкой
  inputElement.classList.remove('popup__input_type_error'); // удаление класса ошибки в поле инпут
  errorElement.textContent = ''; // очистка заполнения спана с ошибкой
  errorElement.classList.remove('popup__input-error_visible'); // прятать спан с ошибкой
}
// включение валидации
// enableValidation(); // сейчас валидация запускается при открытии попап из index.js  // log block delete this ~~~~~~ iwang
