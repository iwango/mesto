// начальный массив мест
export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

export const cardListSelector = '.elements__list';
export const cardSelector = '#place-template';

// переменные для модулей Card и PopupWithImage
export const popupShowImage = document.querySelector('.popup_show-image'); // картинка
export const popupFigureImage = popupShowImage.querySelector('.popup__figure-image'); // изображение
export const popupFigureCaption = popupShowImage.querySelector('.popup__figure-caption'); // описание


// Настройки для валидации список селекторов и классов
export const validationSettings = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button-save',
  inactiveButtonClass: 'popup__button-save_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorVisibleClass: 'popup__input-error_visible',
  autoFillFormName: '.popup__form-edit-profile',
  formEditProfile:  '.popup__form-edit-profile',
  formAddCard: '.popup__form-add-place'
}

export const popupAddPlace = document.querySelector('.popup_add-place'); // место
export const placeAddButton = document.querySelector('.profile__place-add-button'); // добавить место
