function popUp() {
  let inputName = document.querySelector('.popup__input_type_name');
  let inputJob = document.querySelector('.popup__input_type_job');
  document.querySelector('.popup').classList.toggle('popup__is-opened');
  inputName.value = document.querySelector('.user-info__name').innerText;
  inputJob.value = document.querySelector('.user-info__job').innerText;
}
document.querySelector('.user-info__edit-button').addEventListener('click', popUp);
document.querySelector('.popup__close').addEventListener('click', popUp);


const editForm = document.forms.edit;


function editProfile(event) {
  event.preventDefault();
  let infoName = document.querySelector('.user-info__name');
  let infoDescription = document.querySelector('.user-info__job');
  const nameForm = editForm.elements.name;
  const descriptionForm = editForm.elements.description;
  if (nameForm.value !== 0 && descriptionForm.value !== 0) {
    infoName.textContent = nameForm.value;
    infoDescription.textContent = descriptionForm.value;
    popUp();
  }
}

editForm.addEventListener('submit', editProfile);

