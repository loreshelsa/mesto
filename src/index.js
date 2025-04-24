import './index.css'; 
import {initialCards} from './../scripts/cards';

const avatarImage = new URL('./../images/avatar.jpg', import.meta.url);
const cardOne = new URL('./../images/card_1.jpg', import.meta.url);
const cardTwo = new URL('./../images/card_2.jpg', import.meta.url);
const cardThree = new URL('./../images/card_3.jpg', import.meta.url);


const pictures = [
  // меняем исходные пути на переменные
  { name: 'avatar', link: avatarImage },
  { name: 'card-1', link: cardOne },
  { name: 'card-2', link: cardTwo },
  { name: 'card-3', link: cardThree },
]; 


// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

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

function renderCard(card, remove) {
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

  cardElement.addEventListener("click", () => openPreview(card));

  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    likeBtn.classList.add("card__like-button_is-active");
  })

  return cardElement;
}

function removeCard(cardElement) {
  cardElement.remove();
}

function renderList() {
  const listCards = initialCards.map((card) => renderCard(card, removeCard));
  cardContainer.append(...listCards);
}

function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
}

function openPreview(card) {
  popupImage.src = card.link;
  popupImage.setAttribute("alt", card.name);
  popupDescription.textContent = card.name;
  openPopup(previewPopup);
}

document.addEventListener("DOMContentLoaded", renderList);

editButton.addEventListener("click", () => openPopup(editPopup));
editPopupCloseButton.addEventListener("click", () => closePopup(editPopup));

addCardButton.addEventListener("click", () => openPopup(newCardPopup));
newCardPopupCloseButton.addEventListener("click", () =>
  closePopup(newCardPopup)
);

previewPopupCloseButton.addEventListener("click", () =>
  closePopup(previewPopup)
);
