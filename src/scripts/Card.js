export default class Card {
    constructor(cardData, templateId, handleCardClick) {
        this.cardName = cardData.name;
        this.cardLink = cardData.link
        this.templateId = templateId;
        this.handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
          .querySelector(this.templateId)
          .content
          .querySelector('.element__item')
          .cloneNode(true);
        return cardElement;
    }

    _toggleLike(evt) {
        evt.target.classList.toggle('element__like_liked'); 
    } 

    _deleteCard(evt) {
        evt.target.closest('.element__item').remove()
    }

    _handleImageClick = () => {
        this.handleCardClick(this.cardName, this.cardLink);
    }


    _setEventListeners(cardElement) {
        cardElement.querySelector('.element__like').addEventListener('click', this._toggleLike);

        cardElement.querySelector('.element__trash').addEventListener('click', this._deleteCard);

        cardElement.querySelector('.element__image').addEventListener('click', this._handleImageClick);
    }

    createCard() {
        this.element = this._getTemplate();
        this._cardImage = this.element.querySelector('.element__image');

        this._cardImage.src = this.cardLink
        this.element.querySelector('.element__title').textContent = this.cardName
        this._cardImage.alt = 'Картинка ' + this.cardName;

        this._setEventListeners(this.element)
        
        return this.element;
    }

}