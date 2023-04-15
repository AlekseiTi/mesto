export const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
  
  
  
  export const popups = document.querySelectorAll(".popup");
  export const formEditProfile = document.forms.edit;
  export const formNewCard = document.forms.newcard;
  export const inputName = document.querySelector('.popup__input_type_name');
  export const inputJob = document.querySelector('.popup__input_type_job');
  export const titleInput = document.querySelector(".popup__input_type_pic");
  export const linkInput = document.querySelector(".popup__input_type_link-url");
  export const buttonOpenEditProfilePopup = document.querySelector('.data__edit-button');
  export const nameForm = formEditProfile.elements.name;
  export const descriptionForm = formEditProfile.elements.description;
  export const buttonOpenAddCardPopup = document.querySelector('.profile__button');
  export const popupTitle = document.querySelector('.imgPopup__title');
  export const profilePopup = document.querySelector('.profilePopup');
  export const addNewCardPopup = document.querySelector('.addNewCardPopup');
  export const imgPopup = document.querySelector('.imgPopup');
  export const imgPopupPic = document.querySelector('.imgPopup__place');
  export const dataName = document.querySelector('.data__name');
  export const dataJob = document.querySelector('.data__job');
  export const cards = document.getElementById('element');
  export const template = document
      .querySelector("#element")
      .content.querySelector(".element__item");
  
  export const config = {
    formSelector: ".popup__form",
    inputSelector: ".popup__input",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__input_type_error",
    errorClass: "popup__error_active",
  };