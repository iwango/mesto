import Popup from "./Popup.js"; // расширяемый класс

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // добавить переменные для оформления попап
    this._popupFigureImage = this._popup.querySelector('.popup__figure-image');
    this._popupFigureCaption = this._popup.querySelector('.popup__figure-caption');
  }

  open(name, link) {
    // расширение основного метода и заполнение
    this._popupFigureImage.src = link;
    this._popupFigureImage.alt = name;
    this._popupFigureCaption.textContent = name;

    super.open();
  }
}