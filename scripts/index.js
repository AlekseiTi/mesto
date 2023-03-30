import Card  from "./Card.js";
import FormValidator from "./FormValidator.js";



const initialCards = [
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



const popups = document.querySelectorAll(".popup");
const formEditProfile = document.forms.edit;
const formNewCard = document.forms.newcard;
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const titleInput = document.querySelector(".popup__input_type_name");
const linkInput = document.querySelector(".popup__input_type_link-url");
const buttonOpenEditProfilePopup = document.querySelector('.data__edit-button');
const nameForm = formEditProfile.elements.name;
const descriptionForm = formEditProfile.elements.description;
const buttonOpenAddCardPopup = document.querySelector('.profile__button');
const popupTitle = document.querySelector('.imgPopup__title');
const profilePopup = document.querySelector('.profilePopup');
const addNewCardPopup = document.querySelector('.addNewCardPopup');
const imgPopup = document.querySelector('.imgPopup');
const imgPopupPic = document.querySelector('.imgPopup__place');
const dataName = document.querySelector('.data__name');
const dataJob = document.querySelector('.data__job');
const cards = document.getElementById('element');
const template = document
    .querySelector("#element")
    .content.querySelector(".element__item");

const config = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};



function showInitialCards() {
  initialCards.map((item) => {
      const card = createCard(item);
      cards.append(card);
  });
}

showInitialCards();

function createCard(data) {
  const card = new Card(data, "#element", handleCardClick);
  return card.generateCard();
}

function handleCardClick(name, link) {
  openPopup(imgPopup);
  imgPopupPic.src = link;
  imgPopup.alt = name;
  popupTitle.textContent = name;
}


const validPopupEditForm = new FormValidator(config, formEditProfile);
validPopupEditForm.enableValidation();

const validPopupAddForm = new FormValidator(config, formNewCard);
validPopupAddForm.enableValidation();

function openPopup(popup) {
    popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", handlerEscapeKey);
}

function closePopup(popup) {
    popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", handlerEscapeKey);
}

buttonOpenEditProfilePopup.addEventListener("click", () => {
    openPopup(profilePopup);
    inputName.value = dataName.textContent;
    inputJob.value = dataJob.textContent;
});
buttonOpenAddCardPopup.addEventListener("click", () => {
    openPopup(addNewCardPopup);
});

popups.forEach((popup) => {
    popup.addEventListener("mousedown", (evt) => {
        if (evt.target.classList.contains("popup_is-opened")) {
            closePopup(popup);
        }
        if (evt.target.classList.contains("popup__close")) {
            closePopup(popup);
        }
    });
});

function handlerEscapeKey(evt) {
    if (evt.key === "Escape") {
        const popupOpened = document.querySelector(".popup_is-opened");
        if (popupOpened) {
            closePopup(popupOpened);
        }
    }
}

formEditProfile.addEventListener("submit", handleEditSubmit);
formNewCard.addEventListener("submit", handleAddSubmit);

function handleEditSubmit(evt) {
    evt.preventDefault();
    dataName.textContent = inputName.value;
    dataJob.textContent = inputJob.value;
    closePopup(profilePopup);
}

function handleAddSubmit(evt) {
    evt.preventDefault();
    const title = titleInput.value;
    const link = linkInput.value;

    const card = createCard({ name: title, link: link });

    cards.prepend(card);
    validPopupAddForm.resetValidation();
    closePopup(addNewCardPopup);
    formNewCard.reset();
}
