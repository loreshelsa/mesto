import "./index.css";
import { initialCards } from "./../scripts/cards";

const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".places__list");

const editButton = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector(".popup_type_edit");
const editPopupCloseButton = editPopup.querySelector(".popup__close");

const addCardButton = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector(".popup_type_new-card");
const newCardPopupCloseButton = newCardPopup.querySelector(".popup__close");

const previewPopup = document.querySelector(".popup_type_image");
const previewPopupCloseButton = previewPopup.querySelector(".popup__close");
const popupImage = previewPopup.querySelector(".popup__image");
const popupDescription = previewPopup.querySelector(".popup__caption");

let activePopup = null;

function addAnimationPopups() {
  editPopup.classList.add("popup_is-animated");
  previewPopup.classList.add("popup_is-animated");
  newCardPopup.classList.add("popup_is-animated");
}

function renderCard(card, remove, like) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.setAttribute("alt", card.name);
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    remove(cardElement);
  });

  cardElement.addEventListener("click", (event) => {
    event.stopPropagation();
    openPreview(card);
  });

  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    like(likeBtn);
  });

  return cardElement;
}

function removeCard(cardElement) {
  cardElement.remove();
}

function toggleLike(likeBtn) {
  likeBtn.classList.toggle("card__like-button_is-active");
}

function renderList() {
  const listCards = initialCards.map((card) =>
    renderCard(card, removeCard, toggleLike)
  );
  cardContainer.append(...listCards);
}

function openPopup(popup) {
  activePopup = popup;
  popup.classList.add("popup_is-opened");

  //закрытие по оверлей
  document.addEventListener("click", closePopupOverlay);
}

function closePopupOverlay(event) {
  const popupContent = activePopup.querySelector(".popup__content");
  if (
    event.target !== popupContent &&
    event.target.closest(".popup__content") !== popupContent
  ) {
    closePopup(activePopup);
    document.removeEventListener("click", closePopupOverlay);
  }
}

function closePopup(popup) {
  activePopup = null;
  popup.classList.remove("popup_is-opened");
}

function openPreview(card) {
  popupImage.src = card.link;
  popupImage.setAttribute("alt", card.name);
  popupDescription.textContent = card.name;
  openPopup(previewPopup);
}

document.addEventListener("DOMContentLoaded", renderList);

editButton.addEventListener("click", (event) => {
  event.stopPropagation();
  openEditPopup();
});
editPopupCloseButton.addEventListener("click", (event) => {
  event.stopPropagation();
  closePopup(editPopup);
});

//закрытие по кнопке escape
document.addEventListener("keydown", function (event) {
  if (event.key?.toLowerCase() === "escape") {
    closePopup(activePopup);
  }
});

addCardButton.addEventListener("click", (event) => {
  event.stopPropagation();
  openPopup(newCardPopup);
});
newCardPopupCloseButton.addEventListener("click", (event) => {
  event.stopPropagation();
  closePopup(newCardPopup);
});

previewPopupCloseButton.addEventListener("click", (event) => {
  event.stopPropagation();
  closePopup(previewPopup);
});

//Редактирование имени и информации о себе по кнопке сохранить
const formElement = document.forms["edit-profile"];
const inputName = formElement.elements["name"];
const inputDescription = formElement.elements["description"];

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

function openEditPopup() {
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(editPopup);
}

function handleFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopup(editPopup);
}
formElement.addEventListener("submit", handleFormSubmit);

//Добавление карточки с картинкой по кнопке сохранить
const newPlaceForm = document.forms["new-place"];
const inputNameCard = newPlaceForm.elements["place-name"];
const inputCardLink = newPlaceForm.elements["link"];

function clearNewCardForm() {
  inputNameCard.value = "";
  inputCardLink.value = "";
}

function addNewCard(event) {
  event.preventDefault();
  const newCard = { name: inputNameCard.value, link: inputCardLink.value };
  const card = renderCard(newCard, removeCard, toggleLike);
  cardContainer.prepend(card);
  closePopup(activePopup);
  clearNewCardForm();
}
newPlaceForm.addEventListener("submit", addNewCard);

addAnimationPopups();