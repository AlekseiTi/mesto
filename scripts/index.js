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

const cardsContainer = document.querySelector('.places-list');
const editForm = document.forms.edit;
const newCardForm = document.forms.newcard;
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
inputName.value = document.querySelector('.data__name').innerText;
inputJob.value = document.querySelector('.data__job').innerText;
const editButton = document.querySelector('.data__edit-button');
const profileClose = document.querySelector('.profilePopup__close');
const infoName = document.querySelector('.data__name');
const infoDescription = document.querySelector('.data__job');
const nameForm = editForm.elements.name;
const descriptionForm = editForm.elements.description;
const profileButton = document.querySelector('.profile__button');
const addClose = document.querySelector('.addNewCardPopup__close');
const cardTemplate = document.getElementById('cardTemplate').content;
const popupImg = document.querySelector('.imgPopup__place');
const popupTitle = document.querySelector('.imgPopup__title');
const imgClose = document.querySelector('.imgPopup__close');
const addButton = document.querySelector('.addNewCardPopup__button');
const profilePopup = document.querySelector('.profilePopup');
const addNewCardPopup = document.querySelector('.addNewCardPopup');
const imgPopup = document.querySelector('.imgPopup');

initialCards.forEach(function (card) {
  let newCard = createCard(card.name, card.link);
  cardsContainer.prepend(newCard);
});

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

function openProfilePopup() {
  openPopup(profilePopup);
}

function closeProfilePopup() {
  closePopup(profilePopup);
}

function editProfile(event) {
  event.preventDefault();
  if (nameForm.value !== 0 && descriptionForm.value !== 0) {
    infoName.textContent = nameForm.value;
    infoDescription.textContent = descriptionForm.value;
    closeProfilePopup();
  }
}
editButton.addEventListener('click', () => openPopup(profilePopup));
profileClose.addEventListener('click', () => closePopup(profilePopup));

function openPopupAdd() {
  openPopup(addNewCardPopup);
  newCardForm.reset()
}

function closePopupAdd() {
  closePopup(addNewCardPopup);
  newCardForm.reset()
}

function addCard(event) {
  event.preventDefault();
  const name = newCardForm.elements.name;
  const link = newCardForm.elements.link;

  if (name.value.length !== 0 && link.value.length !== 0) {
    let newCard = createCard(name.value, link.value)
    newCardForm.reset();
    cardsContainer.prepend(newCard);
    closePopupAdd();
  };
}
function createCard(name, link) {

  const cardElement = cardTemplate.querySelector('.place-card').cloneNode(true);
  cardElement.querySelector('.place-card__name').textContent = name;
  cardElement.querySelector('.place-card__image').setAttribute("src", link);
  cardElement.querySelector('.place-card__image').setAttribute("alt", name);
  cardElement.querySelector('.place-card__image').addEventListener('click', imagePopup);
  cardElement.querySelector('.place-card__delete-icon').addEventListener('click', deleteCard);
  cardElement.addEventListener('click', function (event) {
    if (event.target.closest('.place-card__like-icon')) {
      event.target.classList.toggle('place-card__like-icon_liked')
    }
  })
  return cardElement;
}

function deleteCard(event) {
  if (event.target.closest('.place-card__delete-icon')) {
    const card = event.target.closest('.place-card');
    cardsContainer.removeChild(card);
  }
}

addButton.addEventListener('click', addCard);
profileButton.addEventListener('click', openPopupAdd);
addClose.addEventListener('click', closePopupAdd);

function openImgPopup() {
  openPopup(imgPopup);
}

function closeImgPopup() {
  closePopup(imgPopup);
}

imgClose.addEventListener('click', closeImgPopup);

editForm.addEventListener('submit', editProfile);

function imagePopup(event) {
  const imgUrl = event.target.getAttribute("src");
  popupImg.setAttribute('src', imgUrl);
  const imgAlt = event.target.getAttribute("alt");
  popupImg.setAttribute('alt', imgAlt);
  const sibling = event.target.nextElementSibling;
  popupTitle.innerText = sibling.firstElementChild.textContent;
  openImgPopup();
}
const cardsImages = document.querySelectorAll('.place-card__image');
