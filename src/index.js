import "./index.css";
import { initialCards } from "./../scripts/cards";
import {renderCard, removeCard, toggleLike} from "./components/card";
import {activePopup, openPopup, closePopup} from "./components/modal";

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

const formElement = document.forms["edit-profile"];
const inputName = formElement.elements["name"];
const inputDescription = formElement.elements["description"];

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const newPlaceForm = document.forms["new-place"];
const inputNameCard = newPlaceForm.elements["place-name"];
const inputCardLink = newPlaceForm.elements["link"];

function addAnimationPopups() {
  editPopup.classList.add("popup_is-animated");
  previewPopup.classList.add("popup_is-animated");
  newCardPopup.classList.add("popup_is-animated");
}

function renderList() {
  const listCards = initialCards.map((card) =>
    renderCard(card, cardTemplate, removeCard, toggleLike, openPreview)
  );
  cardContainer.append(...listCards);
}

function openPreview(card) {
  popupImage.src = card.link;
  popupImage.setAttribute("alt", card.name);
  popupDescription.textContent = card.name;
  openPopup(previewPopup);
}

function openEditPopup(event) {
  event.stopPropagation();
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

function clearNewCardForm() {
  inputNameCard.value = "";
  inputCardLink.value = "";
}

function addNewCard(event) {
  event.preventDefault();
  const newCard = { name: inputNameCard.value, link: inputCardLink.value };
  const card = renderCard(newCard, cardTemplate, removeCard, toggleLike, openPreview);
  cardContainer.prepend(card);
  closePopup(activePopup);
  clearNewCardForm();
}

document.addEventListener("DOMContentLoaded", renderList);

editButton.addEventListener("click", openEditPopup);

editPopupCloseButton.addEventListener("click", (event) => {
  event.stopPropagation();
  closePopup(editPopup);
});

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

formElement.addEventListener("submit", handleFormSubmit);

newPlaceForm.addEventListener("submit", addNewCard);

addAnimationPopups();