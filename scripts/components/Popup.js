export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    // бинд функций для возможности удаления слушателей
    this._handleEscClose = this._handleEscClose.bind(this);
    this._mouseEvent = this._mouseEvent.bind(this);
  }

  open() {
    this._popup.classList.add('popup__visible', 'popup_opened'); // включаем попап
    this.setEventListeners(); // установка слушателей
  }

  setEventListeners() {
    this._popup.addEventListener('mousedown', this._mouseEvent);
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup__visible'); // спяртать окно
    // удалить слушатели
    document.removeEventListener('keydown', this._handleEscClose); // слушать клавиши
    this._popup.removeEventListener('mousedown', this._mouseEvent); // слушать клики
  }

  _handleEscClose(evt) {
    // закрытие по эскейп
    if (evt.key === 'Escape') {
      this.close();
    }
  }

  _mouseEvent(evt) {
    // закрытие по клику на кнопку или фону
    if (evt.target === evt.currentTarget || evt.target.classList.contains('popup__close')) {
      this.close();
    }
  }
}
