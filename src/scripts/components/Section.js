export default class Section {
  constructor(containerSelector, renderer) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element) {
    this._container.prepend(element);
  }

  renderItems(renderedItems) {
    renderedItems.reverse().forEach(item => {
      this._renderer(item);
    });
  }
}