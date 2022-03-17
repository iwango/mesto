let editButton = document.querySelector('.profile__edit-button');
let closeButton = document.querySelector('.popup__close');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__name');
let profileEmployment = document.querySelector('.profile__employment');
let popupForm = document.querySelector('.popup__form');

function fnClickEdit() {
  popupForm.elements.valueProfileName.value = profileName.textContent;
  popupForm.elements.valueProfileEmployment.value = profileEmployment.textContent;
  popup.classList.add('popup_opened')
}
function fnClickClose() {
  popup.classList.remove('popup_opened');
}
function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = popupForm.elements.valueProfileName.value;
  profileEmployment.textContent = popupForm.elements.valueProfileEmployment.value;
  popup.classList.remove('popup_opened');
}

editButton.addEventListener('click', fnClickEdit);
closeButton.addEventListener('click', fnClickClose);
popupForm.addEventListener('submit', formSubmitHandler);
