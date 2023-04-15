import './styles/index.css';
import Card  from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import Section from "./scripts/Section.js";
import UserInfo from "./scripts/UserInfo.js";
import { initialCards, formEditProfile, formNewCard, inputName, inputJob, titleInput, 
  linkInput, buttonOpenEditProfilePopup, nameForm, descriptionForm, buttonOpenAddCardPopup, 
  popupTitle, addNewCardPopup, imgPopup,  imgPopupPic, dataName, dataJob, cards, template, config}
from "./scripts/constants.js";

const userInfo = new UserInfo('.data__name', '.data__job');
const imagePopup = new PopupWithImage('.imgPopup')

const createCard = (item) => {
    const card = new Card(item, '#element', imagePopup.open)
    const cardElement = card.createCard()
    return cardElement
}

const cardList = new Section ({
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


buttonOpenEditProfilePopup.addEventListener('click', () => {
    profilePopup.open();

    const infoObject = userInfo.getUserInfo();
    inputName.value = infoObject.userName;
    inputJob.value = infoObject.userProf;     

    popupEditProfileForm.resetValidation();
});

buttonOpenAddCardPopup.addEventListener('click', () => {
    contentPopup.open();
    popupAddContentForm.resetValidation();
})



