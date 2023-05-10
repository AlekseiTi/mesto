import './index.css';
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithConfirmation from '../components/PopupWithConfirmation';
import {popupEditProfile, popupAddContent, popupEditAvatar, config, buttonEditProfile, buttonAddContent, buttonEditAvatar, inputUserName, inputUserProfession}
    from "../utils/constants.js";
import {api} from "../components/Api";

let userId;

const cardList = new Section ({
    items: {},
    renderer: () => {},
}, '.content')

const userInfo = new UserInfo('.data__name', '.data__job', '.profile__image');
const imagePopup = new PopupWithImage('.popup_image');

Promise.all([api.getUserInfo(), api.getInitialCards()])
    .then(([userData, initialCards]) => {
        userInfo.setUserAvatar(userData.avatar)
        userInfo.setUserInfo(userData)
        userId = userData._id

        cardList.setItems(initialCards)
        cardList.setRenderer((item) => {    
            cardList.addItem(createCard(item));
        })
        cardList.renderItems()
    })
    .catch((err) => console.log(err))


const createCard = (item) => {
    const card = new Card({
        cardData: item, 
        templateId: '#card-template', 
        handleCardClick: imagePopup.open,
        handleDeleteIconClick: (card) => {
            popupWithConfirmation.open();
            popupWithConfirmation.setConfirmAction(() => {
                api.deleteCard(card.cardId).then(() => {
                    card.deleteCard();
                    popupWithConfirmation.close();
                })
                .catch((err) => console.log(err))
            })
        },
        userID: userId,
        handleDeleteLike: (cardId) => {return api.deleteLike(cardId)},
        handleAddLike: (cardId) => {return api.addLike(cardId)},
    })
    const cardElement = card.createCard()
    return cardElement
}


const profilePopup = new PopupWithForm({
    popupSelector: '.popup_edit-info',
    handleFormSubmit: (item) => {
        profilePopup.showLoading(true);
        api.editProfileInfo(item.name, item.description).then(res => {
            userInfo.setUserInfo(res)
            profilePopup.close()
        })
        .catch((err) => {console.log(err)})
        .finally(() => {profilePopup.showLoading(false)})
    }
})

const contentPopup = new PopupWithForm({
    popupSelector: '.popup_add-card',
    handleFormSubmit: (item) => {
        contentPopup.showLoading(true);
        api.postCard(item.name, item.link).then(res => {
            cardList.addItemToStart(createCard(res))
            contentPopup.close()
        })
        .catch((err) => {console.log(err)})
        .finally(() => {contentPopup.showLoading(false)})
    }
})

const avatarPopup = new PopupWithForm ({
    popupSelector: '.popup_edit-avatar',
    handleFormSubmit: (item) => {
        avatarPopup.showLoading(true);
        api.editAvatar(item.editAvatar).then((res) => {
            avatarPopup.close()
            userInfo.setUserAvatar(res.avatar)
        })
        .catch((err) => {console.log(err)})
        .finally(() => {avatarPopup.showLoading(false)})
    }
})

const popupEditProfileForm = new FormValidator(config, popupEditProfile);
popupEditProfileForm.enableValidation();

const popupAddContentForm = new FormValidator(config, popupAddContent);
popupAddContentForm.enableValidation()

const popupEditAvatarForm = new FormValidator(config, popupEditAvatar);
popupEditAvatarForm.enableValidation()

const popupWithConfirmation = new PopupWithConfirmation('.popup_delete-content')
popupWithConfirmation.setEventListeners();

buttonEditAvatar.addEventListener('click', () => {
    avatarPopup.open();
    popupEditAvatarForm.resetValidation();
})

buttonAddContent.addEventListener('click', () => {
    contentPopup.open();
    popupAddContentForm.resetValidation();
})

buttonEditProfile.addEventListener('click', () => {
    profilePopup.open();

    const infoObject = userInfo.getUserInfo();
    inputUserName.value = infoObject.userName;
    inputUserProfession.value = infoObject.userProf;     

    popupEditProfileForm.resetValidation();
});


