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
const profileClose = document.querySelector('.popupprofile__close');
const infoName = document.querySelector('.data__name');
const infoDescription = document.querySelector('.data__job');
const nameForm = editForm.elements.name;
const descriptionForm = editForm.elements.description;
const profileButton = document.querySelector('.profile__button');
const addClose = document.querySelector('.popupadd__close');
const cardTemplate = document.getElementById('cardTemplate').content;
const popupImage = document.querySelector('.img-popup');
const popupImg = popupImage.querySelector('.img-popup__place');
const popupTitle = popupImage.querySelector('.img-popup__title');
const imgClose = document.querySelector('.img-popup__close');
const addButton = document.querySelector('.popupadd__button');

initialCards.forEach(function (card) {
  createCard(card.name, card.link);
});

cardsContainer.addEventListener('click', function (event) {
  if (event.target.closest('.place-card__like-icon')) {
    event.target.classList.toggle('place-card__like-icon_liked')
  }
})


function popUpProfile() {
  document.querySelector('.popup').classList.toggle('popup_is-opened');
}

editButton.addEventListener('click', popUpProfile);
profileClose.addEventListener('click', popUpProfile);

function editProfile(event) {
  event.preventDefault();
  if (nameForm.value !== 0 && descriptionForm.value !== 0) {
    infoName.textContent = nameForm.value;
    infoDescription.textContent = descriptionForm.value;
    popUpProfile();
  }
}

function addPopUp() {
  document.querySelector('.popupadd').classList.toggle('popup_is-opened');
  newCardForm.reset();
}

profileButton.addEventListener('click', addPopUp);
addClose.addEventListener('click', addPopUp);









function addCard(event) {
  event.preventDefault();
  const name = newCardForm.elements.name;
  const link = newCardForm.elements.link;

  if (name.value.length !== 0 && link.value.length !== 0) {
    createCard(name.value, link.value)
    newCardForm.reset();
    addPopUp();
  };
}
function createCard(name, link) {
  const placesList = document.querySelector('.places-list');
  const cardElement = cardTemplate.querySelector('.place-card').cloneNode(true);
  cardElement.querySelector('.place-card__name').textContent = name;
  cardElement.querySelector('.place-card__image').style.backgroundImage = `url(${link})`;
  cardElement.addEventListener('click', imagePopUp);
  cardElement.querySelector('.place-card__delete-icon').addEventListener('click', deleteCard);
  placesList.prepend(cardElement);
}

addButton.addEventListener('click', addCard);






function deleteCard(event) {
  if (event.target.closest('.place-card__delete-icon')) {
    const card = event.target.closest('.place-card');
    cardsContainer.removeChild(card);
  }
}

editForm.addEventListener('submit', editProfile);

function imagePopUp(event) {
  popupImg.setAttribute('src', `${event.target.style.backgroundImage.slice(5, -2)}`);
  const sibling = event.target.nextElementSibling;
  popupTitle.innerText = sibling.firstElementChild.textContent;
  popupImage.classList.add('img-popup_is-opened');
}

function imageClose() {
  document.querySelector('.img-popup').classList.remove('img-popup_is-opened');
}
const cardsImages = document.querySelectorAll('.place-card__image')

imgClose.addEventListener('click', imageClose);