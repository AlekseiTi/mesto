import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import { initialCards, config }
    from "../utils/constants.js";

let formEditProfile = document.forms.edit;
let formNewCard = document.forms.newcard;
let buttonOpenAddCardPopup = document.querySelector('.profile__button');
let buttonOpenEditProfilePopup = document.querySelector('.data__edit-button');
let inputName = document.querySelector('.popup__input_type_name');
let inputJob = document.querySelector('.popup__input_type_job');

const userInfo = new UserInfo('.data__name', '.data__job');
const imagePopup = new PopupWithImage('.imgPopup');

const createCard = (item) => {
    const card = new Card(item, '#element', imagePopup.open)
    const cardElement = card.createCard()
    return cardElement
}

const cardList = new Section({
    items: initialCards,
    renderer: (item) => {
        cardList.addItem(createCard(item));
    },
}, '.places-list')

cardList.renderItems()

const profilePopup = new PopupWithForm({
    popupSelector: '.profilePopup',
    handleFormSubmit: (data) => {
        return userInfo.setUserInfo(data);
    }
})

const contentPopup = new PopupWithForm({
    popupSelector: '.addNewCardPopup',
    handleFormSubmit: (item) => {
        cardList.addItem(createCard(item))
    }
})

const popupEditProfileForm = new FormValidator(config, formEditProfile);
popupEditProfileForm.enableValidation();

const popupAddContentForm = new FormValidator(config, formNewCard);
popupAddContentForm.enableValidation();


buttonOpenEditProfilePopup.addEventListener('click', profilePopupOpen);

function profilePopupOpen() {
    profilePopup.open();
    const infoObject = userInfo.getUserInfo();
    inputName.value = infoObject.userName;
    inputJob.value = infoObject.userProf;
    popupEditProfileForm.resetValidation();
}

buttonOpenAddCardPopup.addEventListener('click', contentPopupOpen);

function contentPopupOpen() {
    contentPopup.open();
    popupAddContentForm.resetValidation();
}

profilePopup.setEventListeners();
contentPopup.setEventListeners();
imagePopup.setEventListeners();
