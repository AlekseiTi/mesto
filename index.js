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

function loadInitial(name, link) {
  const html = `<div class="place-card">
  <button class="button place-card__delete-icon"></button>
  <div class="place-card__image" style="background-image: url(${link})">
  </div>
  <div class="place-card__description">
    <h3 class="place-card__name">${name}</h3>
    <button class="place-card__like-icon"></button>
  </div>
</div>`;
  cardsContainer.insertAdjacentHTML('beforeend', html);
}

cardsContainer.addEventListener('click', function (event) {
  if (event.target.closest('.place-card__like-icon')) {
    event.target.classList.toggle('place-card__like-icon_liked')
  }
})


function popUp() {
  let inputName = document.querySelector('.popup__input_type_name');
  let inputJob = document.querySelector('.popup__input_type_job');
  document.querySelector('.popup').classList.toggle('popup_is-opened');
  inputName.value = document.querySelector('.data__name').innerText;
  inputJob.value = document.querySelector('.data__job').innerText;
}

document.querySelector('.data__edit-button').addEventListener('click', popUp);
document.querySelector('.popup__close').addEventListener('click', popUp);

function editProfile(event) {
  event.preventDefault();
  let infoName = document.querySelector('.data__name');
  let infoDescription = document.querySelector('.data__job');
  const nameForm = editForm.elements.name;
  const descriptionForm = editForm.elements.description;
  if (nameForm.value !== 0 && descriptionForm.value !== 0) {
    infoName.textContent = nameForm.value;
    infoDescription.textContent = descriptionForm.value;
    popUp();
  }
}



function addPopUp() {
  document.querySelector('.popupadd').classList.toggle('popup_is-opened');
  newCardForm.reset();
}

document.querySelector('.profile__button').addEventListener('click', addPopUp);
document.querySelector('.popupadd__close').addEventListener('click', addPopUp);




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
  const placeCard = document.createElement('div');
  cardsContainer.appendChild(placeCard);
  placeCard.classList.add('place-card');

  const cardImage = document.createElement('div');
  placeCard.appendChild(cardImage);
  cardImage.classList.add('place-card__image');
  cardImage.style.backgroundImage = 'url(' + link + ')';

  const buttonDelete = document.createElement('button');
  cardImage.appendChild(buttonDelete);
  buttonDelete.classList.add('place-card__delete-icon');

  const cardDescription = document.createElement('div');
  placeCard.appendChild(cardDescription);
  cardDescription.classList.add('place-card__description');

  const cardName = document.createElement('h3');
  cardDescription.appendChild(cardName);
  cardName.classList.add('place-card__name');
  cardName.textContent = name;

  const buttonLike = document.createElement('button');
  cardDescription.appendChild(buttonLike);
  buttonLike.classList.add('place-card__like-icon');
}

document.querySelector('.popupadd__button').addEventListener('click', addCard);

function deleteCard(event) {
  if (event.target.closest('.place-card__delete-icon')) {
    let card = event.target.closest('.place-card');
    cardsContainer.removeChild(card);
  }
}
cardsContainer.addEventListener('click', deleteCard);




editForm.addEventListener('submit', editProfile);
initialCards.forEach(function (card) {
  loadInitial(card.name, card.link);
});




function imagePopUp(event) {
  const popupImage = document.querySelector('.img-popup');
  const popupImg = popupImage.querySelector('.img-popup__place');
  const popupTitle = popupImage.querySelector('.img-popup__title');
  popupImg.setAttribute('src', `${event.target.style.backgroundImage.slice(5, -2)}`);
  const sibling = event.target.nextElementSibling;
  popupTitle.innerText = sibling.firstElementChild.textContent;
  popupImage.classList.add('img-popup_is-opened');
}

function imageClose() {
  document.querySelector('.img-popup').classList.remove('img-popup_is-opened');
}
const cardsImages = document.querySelectorAll('.place-card__image')

cardsImages.forEach((card) => {
  card.addEventListener('click', imagePopUp);
});

document.querySelector('.img-popup__close').addEventListener('click', imageClose);