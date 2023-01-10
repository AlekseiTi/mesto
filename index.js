function popUp() {
  let inputName = document.querySelector('.popup__input_type_name');
  let inputJob = document.querySelector('.popup__input_type_job');
  document.querySelector('.popup').classList.toggle('popup_is-opened');
  inputName.value = document.querySelector('.data__name').innerText;
  inputJob.value = document.querySelector('.data__job').innerText;
}
document.querySelector('.data__edit-button').addEventListener('click', popUp);
document.querySelector('.popup__close').addEventListener('click', popUp);


const editForm = document.forms.edit;


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

editForm.addEventListener('submit', editProfile);

