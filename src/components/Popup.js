export default class Popup {
    constructor(popupSelector) {
        this._popupElement = document.querySelector(popupSelector)
        this._closeButton = this._popupElement.querySelector('.popup__close')
        this._handleEscClose = this._handleEscClose.bind(this);
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

    setEventListeners() {
        document.addEventListener('mousedown', this._handleOverlayClose);
        this._closeButton.addEventListener('click', this._handleCloseButtonOnClick)
    }
 
     open() {
        this._popupElement.classList.add('popup_is-opened');
        document.addEventListener('keydown', this._handleEscClose);
    }

    close() {
        this._popupElement.classList.remove('popup_is-opened');
        document.removeEventListener('keydown', this._handleEscClose);
    }
}