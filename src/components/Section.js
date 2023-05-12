export default class Section {
    constructor ({renderer}, containerSelector) {
        this._renderer = renderer;
    
        this._container = document.querySelector(containerSelector);
    }

    renderItems(items) {
        items.forEach(item => this._renderer(item))
    }

    addItem(element) {
        this._container.append(element);
    }

    addItemToStart(element) {
        this._container.prepend(element);
    }

    setItems(items) {
        this._renderedItems = items
    }

    setRenderer(renderer) {
        this._renderer = renderer
    }
}
