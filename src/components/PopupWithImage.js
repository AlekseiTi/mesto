import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
    constructor(popupSelector) {
        super(popupSelector)
        this._popupElementImage = this._popupElement.querySelector('.imgPopup__place')
        this._popupElementText = this._popupElement.querySelector('.imgPopup__title')
    }

    open = (name, link) => {
        this._popupElementImage.src = link;
        this._popupElementImage.alt = 'Картинка' + name;
        this._popupElementText.textContent = name;
        super.open();
    }

}