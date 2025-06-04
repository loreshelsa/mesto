import "./index.css";
import { renderCard, toggleLike } from "./components/card";
import { openPopup, closePopup } from "./components/modal";
import { enableValidation, clearValidation } from "./validation";

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

const editProfileForm = document.forms["edit-profile"];
const inputName = editProfileForm.elements["name"];
const inputDescription = editProfileForm.elements["description"];

const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const profileAvatar = document.querySelector(".profile__image");
const previewPopupAvatar = document.querySelector(".popup_type_new-avatar");
const previewPopupAvatarCloseButton =
  previewPopupAvatar.querySelector(".popup__close");
const newAvatarForm = document.forms["new-avatar"];
const inputAvatarLink = newAvatarForm.elements["link"];

const newPlaceForm = document.forms["new-place"];
const inputNameCard = newPlaceForm.elements["place-name"];
const inputCardLink = newPlaceForm.elements["link"];

const cardRemovePopup = document.querySelector(".popup_type_remove-card");
const previewPopupDeleteCardCloseButton =
  cardRemovePopup.querySelector(".popup__close");
const cardRemoveForm = document.forms["delete-card"];
const cardRemoveElement = cardRemoveForm.elements["card-id"];

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-39",
  headers: {
    authorization: "b71db5e8-caa7-425b-948f-03c1ab4b88bc",
    "Content-Type": "application/json",
  },
};

let user = null;
let currentCard = null;

const validationObject = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

function addAnimationPopups() {
  editPopup.classList.add("popup_is-animated");
  previewPopup.classList.add("popup_is-animated");
  newCardPopup.classList.add("popup_is-animated");
  previewPopupAvatar.classList.add("popup_is-animated");
}

function renderList(cards) {
  const listCards = cards.map((card) =>
    renderCard(card, cardTemplate, openRemoveCardPopup, toggleLike, openPreview)
  );
  cardContainer.append(...listCards);
}

function fillUserInfo(user) {
  profileName.textContent = user.name;
  profileDescription.textContent = user.about;
  profileAvatar.style.backgroundImage = `url(${user.avatar})`;
}

function openPreview(card) {
  popupImage.src = card.link;
  popupImage.setAttribute("alt", card.name);
  popupDescription.textContent = card.name;
  openPopup(previewPopup);
}

function openChangeAvatarPopup(event) {
  event.stopPropagation();
  clearValidation(newAvatarForm, validationObject);
  openPopup(previewPopupAvatar);
}

function openEditPopup(event) {
  event.stopPropagation();
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  clearValidation(editProfileForm, validationObject);
  openPopup(editPopup);
}

function editProfileFormSubmit(event) {
  event.preventDefault();
  const saveButton = editPopup.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  addProfileInfo(inputName.value, inputDescription.value).then((data) => {
    fillUserInfo(data);
    saveButton.textContent = "Сохранить";
    closePopup(editPopup);
  });
}

function addNewCard(event) {
  event.preventDefault();
  const saveButton = newCardPopup.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  const newCard = { name: inputNameCard.value, link: inputCardLink.value };
  addNewPost(newCard).then((res) => {
    const card = renderCard(
      { ...res, canDelete: true },
      cardTemplate,
      openRemoveCardPopup,
      toggleLike,
      openPreview
    );
    cardContainer.prepend(card);
    saveButton.textContent = "Сохранить";
    closePopup(newCardPopup);
    newPlaceForm.reset();
  });
}

function openRemoveCardPopup(cardElement, cardId) {
  cardRemoveElement.value = cardId;
  currentCard = cardElement;
  openPopup(cardRemovePopup);
}

function removeCardSubmit(event) {
  event.preventDefault();
  const cardId = cardRemoveElement.value;
  deletePost(cardId).then(() => {
    currentCard.remove();
    closePopup(cardRemovePopup);
  });
}

function editAvatarFormSubmit(event) {
  event.preventDefault();
  const saveButton = previewPopupAvatar.querySelector(".popup__button");
  saveButton.textContent = "Сохранение...";
  const newAvatarLink = inputAvatarLink.value;
  updateAvatar(newAvatarLink).then((res) => {
    fillUserInfo(res);
    saveButton.textContent = "Сохранить";
    closePopup(previewPopupAvatar);
    newAvatarForm.reset();
  });
}

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([getCards(), getUsers()]).then(([cardsData, userData]) => {
    user = userData;
    fillUserInfo(user);
    const cardList = cardsData.map((card) => {
      const canDelete = card.owner._id === user._id;
      const liked = card.likes.some((i) => i._id === user._id);
      return {
        ...card,
        canDelete,
        liked,
      };
    });
    renderList(cardList);
  });
});

editButton.addEventListener("click", openEditPopup);

editPopupCloseButton.addEventListener("click", (event) => {
  event.stopPropagation();
  editProfileForm.reset();
  closePopup(editPopup);
});

addCardButton.addEventListener("click", (event) => {
  event.stopPropagation();
  clearValidation(newPlaceForm, validationObject);
  openPopup(newCardPopup);
});

newCardPopupCloseButton.addEventListener("click", (event) => {
  event.stopPropagation();
  newPlaceForm.reset();
  closePopup(newCardPopup);
});

previewPopupCloseButton.addEventListener("click", (event) => {
  event.stopPropagation();
  closePopup(previewPopup);
});

previewPopupAvatarCloseButton.addEventListener("click", (event) => {
  event.stopPropagation();
  newAvatarForm.reset();
  closePopup(previewPopupAvatar);
});

previewPopupDeleteCardCloseButton.addEventListener("click", (event) => {
  event.stopPropagation();
  closePopup(cardRemovePopup);
});

profileAvatar.addEventListener("click", openChangeAvatarPopup);

editProfileForm.addEventListener("submit", editProfileFormSubmit);

newPlaceForm.addEventListener("submit", addNewCard);

newAvatarForm.addEventListener("submit", editAvatarFormSubmit);

cardRemoveForm.addEventListener("submit", removeCardSubmit);

addAnimationPopups();

enableValidation(validationObject);

function getCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    });
}

function getUsers() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    })
    .catch((err) => {
      console.log("Ошибка. Запрос не выполнен: ", err);
    });
}

function addProfileInfo(profileName, profileDescription) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name: profileName,
      about: profileDescription,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function updateAvatar(avatarLink) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarLink,
    }),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function addNewPost(newCard) {
  return fetch(`${config.baseUrl}/cards`, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify(newCard),
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}

function deletePost(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: "DELETE",
    headers: config.headers,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  });
}
