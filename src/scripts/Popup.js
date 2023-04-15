export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector)
        this._closeButton = this._popupElement.querySelector('.popup__close')
    }

    _handleEscClose = (evt) => {
        if (evt.key === 'Escape') {
            this.close();
        }
    }

    _handleOverlayClose = (evt) => {
        if (evt.target.classList.contains('popup_is-opened')) {
            this.close();
        }
    }

    _handleCloseButtonOnClick = () => {
        this.close();
    }

    _setEventListeners() {
        document.addEventListener('mousedown', this._handleOverlayClose);
        document.addEventListener('keydown', this._handleEscClose);
        this._closeButton.addEventListener('click', this._handleCloseButtonOnClick)
    }

    _removeEventListeners() {
        document.removeEventListener('mousedown', this._handleOverlayClose);
        document.removeEventListener('keydown', this._handleEscClose);
        this._closeButton.removeEventListener('click', this._handleCloseButtonOnClick)
    }


    open() {
        this._popupElement.classList.add('popup_is-opened');
        this._setEventListeners()
    }

    close() {
        this._popupElement.classList.remove('popup_is-opened');
        this._removeEventListeners();
    }
}