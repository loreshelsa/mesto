// @todo: Темплейт карточки

// @todo: DOM узлы

// @todo: Функция создания карточки

// @todo: Функция удаления карточки

// @todo: Вывести карточки на страницу

const cardTemplate = document.querySelector("#card-template").content;
const cardContainer = document.querySelector(".places__list");

function renderCard(card, remove) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.setAttribute("alt", card.name);
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", () => remove(cardElement));
  
  return cardElement;
}

function removeCard(cardElement) {
  cardElement.remove();
}

function renderList() {
  const listCards = initialCards.map((card) => renderCard(card, removeCard));
  cardContainer.append(...listCards);
}

document.addEventListener("DOMContentLoaded", renderList);
