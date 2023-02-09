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
const inputName = document.querySelector('.popUp__input_type_name');
const inputJob = document.querySelector('.popUp__input_type_job');
inputName.value = document.querySelector('.data__name').innerText;
inputJob.value = document.querySelector('.data__job').innerText;
const editButton = document.querySelector('.data__edit-button');
const profileClose = document.querySelector('.profilePopUp__close');
const infoName = document.querySelector('.data__name');
const infoDescription = document.querySelector('.data__job');
const nameForm = editForm.elements.name;
const descriptionForm = editForm.elements.description;
const profileButton = document.querySelector('.profile__button');
const addClose = document.querySelector('.popUpAdd__close');
const cardTemplate = document.getElementById('cardTemplate').content;
const popupImage = document.querySelector('.img-popup');
const popupImg = document.querySelector('.img-popup__place');
const popupTitle = document.querySelector('.img-popup__title');
const imgClose = document.querySelector('.imgPopUpclose');
const addButton = document.querySelector('.popUpAdd__button');
const profilePopUp = document.querySelector('.profilePopUp');
const addNewCardPopUp = document.querySelector('.addNewCardPopUp');
const imgPopUp = document.querySelector('.imgPopUp');

initialCards.forEach(function (card) {
  let newCard = createCard(card.name, card.link);
  cardsContainer.prepend(newCard);
});

function openPopUp(popUp) {
  popUp.classList.add('popup_is-opened');
}

function closePopUp(popUp) {
  popUp.classList.remove('popup_is-opened');
}

function openProfilePopUp() {
  openPopUp(profilePopUp);
}

function closeProfilePopUp() {
  closePopUp(profilePopUp);
}

function editProfile(event) {
  event.preventDefault();
  if (nameForm.value !== 0 && descriptionForm.value !== 0) {
    infoName.textContent = nameForm.value;
    infoDescription.textContent = descriptionForm.value;
    closeProfilePopUp();
  }
}
editButton.addEventListener('click', () => openPopUp(profilePopUp));
profileClose.addEventListener('click', () => closePopUp(profilePopUp));

function openPopUpAdd() {
  openPopUp(addNewCardPopUp);
  newCardForm.reset()
}

function closePopUpAdd() {
  closePopUp(addNewCardPopUp);
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
    closePopUpAdd();
  };
}
function createCard(name, link) {

  const cardElement = cardTemplate.querySelector('.place-card').cloneNode(true);
  cardElement.querySelector('.place-card__name').textContent = name;
  cardElement.querySelector('.place-card__image').setAttribute("src", link);
  cardElement.querySelector('.place-card__image').setAttribute("alt", name);
  cardElement.querySelector('.place-card__image').addEventListener('click', imagePopUp);
  cardElement.querySelector('.place-card__delete-icon').addEventListener('click', deleteCard);
  cardElement.addEventListener('click', function (event) {
    if (event.target.closest('.place-card__like-icon')) {
      event.target.classList.toggle('place-card__like-icon_liked')
    }
  })
  return cardElement;
}

addButton.addEventListener('click', addCard);
profileButton.addEventListener('click', openPopUpAdd);
addClose.addEventListener('click', closePopUpAdd);
function openImgPopUp() {
  openPopUp(imgPopUp);
}

function closeImgPopUp() {
  closePopUp(imgPopUp);
}

imgClose.addEventListener('click', closeImgPopUp);

function deleteCard(event) {
  if (event.target.closest('.place-card__delete-icon')) {
    const card = event.target.closest('.place-card');
    cardsContainer.removeChild(card);
  }
}

editForm.addEventListener('submit', editProfile);

function imagePopUp(event) {
  const imgUrl = event.target.getAttribute("src");
  popupImg.setAttribute('src', imgUrl);
  const imgAlt = event.target.getAttribute("alt");
  popupImg.setAttribute('alt', imgAlt);
  const sibling = event.target.nextElementSibling;
  popupTitle.innerText = sibling.firstElementChild.textContent;
  openImgPopUp();
}
const cardsImages = document.querySelectorAll('.place-card__image')
