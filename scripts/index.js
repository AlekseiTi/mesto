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
const formEditProfile = document.forms.edit;
const formNewCard = document.forms.newcard;
const inputName = document.querySelector('.popup__input_type_name');
const inputJob = document.querySelector('.popup__input_type_job');
const buttonOpenEditProfilePopup = document.querySelector('.data__edit-button');
const buttonCloseEditProfilePopup = document.querySelector('.profilePopup__close');
const infoName = document.querySelector('.data__name');
const infoDescription = document.querySelector('.data__job');
const nameForm = formEditProfile.elements.name;
const descriptionForm = formEditProfile.elements.description;
const buttonOpenAddCardPopup = document.querySelector('.profile__button');
const buttonCloseAddCardPopup = document.querySelector('.addNewCardPopup__close');
const cardTemplate = document.getElementById('cardTemplate').content;
const popupImg = document.querySelector('.imgPopup__place');
const popupTitle = document.querySelector('.imgPopup__title');
const buttonCloseImagePopup = document.querySelector('.imgPopup__close');
const addButton = document.querySelector('.addNewCardPopup__button');
const profilePopup = document.querySelector('.profilePopup');
const addNewCardPopup = document.querySelector('.addNewCardPopup');
const imgPopup = document.querySelector('.imgPopup');

initialCards.forEach(function (card) {
  const newCard = createCard(card.name, card.link);
  cardsContainer.prepend(newCard);
});

function openPopup(popup) {
  popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_is-opened');
}

function openProfilePopup() {
  inputName.value = document.querySelector('.data__name').innerText;
inputJob.value = document.querySelector('.data__job').innerText;
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
buttonOpenEditProfilePopup.addEventListener('click', openProfilePopup);
buttonCloseEditProfilePopup.addEventListener('click', closeProfilePopup);

function openPopupAdd() {
  openPopup(addNewCardPopup);
  formNewCard.reset()
}

function closePopupAdd() {
  closePopup(addNewCardPopup);
  formNewCard.reset()
}

function addCard(event) {
  event.preventDefault();
  const name = formNewCard.elements.name;
  const link = formNewCard.elements.link;

  if (name.value.length !== 0 && link.value.length !== 0) {
    const newCard = createCard(name.value, link.value)
    formNewCard.reset();
    cardsContainer.prepend(newCard);
    closePopupAdd();
  };
}
function createCard(name, link) {
  const cardElement = cardTemplate.querySelector('.place-card').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.place-card__image');
  cardElement.querySelector('.place-card__name').textContent = name;
  cardElementImage.setAttribute("src", link);
  cardElementImage.setAttribute("alt", name);
  cardElementImage.addEventListener('click', openImgPopup);
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

formNewCard.addEventListener('submit', addCard);
buttonOpenAddCardPopup.addEventListener('click', openPopupAdd);
buttonCloseAddCardPopup.addEventListener('click', closePopupAdd);

function openImgPopup() {
  function imagePopup(event) {
    const imgUrl = event.target.getAttribute("src");
    popupImg.setAttribute('src', imgUrl);
    const imgAlt = event.target.getAttribute("alt");
    popupImg.setAttribute('alt', imgAlt);
    const sibling = event.target.nextElementSibling;
    popupTitle.innerText = sibling.firstElementChild.textContent;
  }
  openPopup(imgPopup);
}

function closeImgPopup() {
  closePopup(imgPopup);
}

buttonCloseImagePopup.addEventListener('click', closeImgPopup);

formEditProfile.addEventListener('submit', editProfile);
const cardsImages = document.querySelectorAll('.place-card__image');
