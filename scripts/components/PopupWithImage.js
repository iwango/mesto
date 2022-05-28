import Popup from "./Popup.js"; // расширяемый класс
import {popupFigureCaption, popupFigureImage} from "../constants.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    // добавить переменные для оформления попап
    this._popupFigureImage = popupFigureImage;
    this._popupFigureCaption = popupFigureCaption;
  }

  open(name, link) {
    // расширение основного метода и заполнение
    this._popupFigureImage.src = link;
    this._popupFigureImage.alt = name;
    this._popupFigureCaption.textContent = name;

    super.open();
  }
}