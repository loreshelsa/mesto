function renderCard(card, cardTemplate, remove, like, openPreview) {
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

export {renderCard, removeCard, toggleLike};