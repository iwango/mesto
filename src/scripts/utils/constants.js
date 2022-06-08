// начальный массив мест
// export const initialCards = [];

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
  formEditAvatar:  '.popup__form-edit-avatar',
  formAddCard: '.popup__form-add-place'
}

export const popupAddPlace = document.querySelector('.popup_add-place'); // место
export const popupEditProfile = document.querySelector('.popup_edit-profile'); //профиль
export const popupEditAvatarProfile = document.querySelector('.popup_edit-avatar'); //профиль
// export const popupDelConfirm = document.querySelector('.deletion-confirmation'); //конфирм

export const placeAddButton = document.querySelector('.profile__place-add-button'); // добавить место
export const profileEditButton = document.querySelector('.profile__edit-button'); // редактировать профиль
export const profileEditAvatarButton = document.querySelector('.profile__avatar-edit-button'); // редактировать профиль


// строки из HTML для редактирования профиля
export const profileName = document.querySelector('.profile__name');
export const profileEmployment = document.querySelector('.profile__employment');
export const profileAvatar = document.querySelector('.profile__avatar');

// пременные для полей ввода
// форма для редактирования профиля
export const popupFormEditProfile = popupEditProfile.querySelector('.popup__form-edit-profile');
// редактор профиля
export const profileNameField = popupFormEditProfile.querySelector('#profile_name_field');
export const profileEmploymentField = popupFormEditProfile.querySelector('#profile_employment_field');
