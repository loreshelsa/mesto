import { addLike, removeLike } from "../core/apiService";

function renderCard(card, cardTemplate, remove, like, openPreview) {
  const cardElement = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.src = card.link;
  cardImage.setAttribute("alt", card.name);
  cardElement.querySelector(".card__title").textContent = card.name;

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  if (!card.canDelete) {
    deleteBtn.classList.add("card__delete-button_hidden");
  } else {
    deleteBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      remove(cardElement, card._id);
    });
  }

  cardElement.addEventListener("click", (event) => {
    event.stopPropagation();
    openPreview(card);
  });

  const likeBtn = cardElement.querySelector(".card__like-button");
  const countLikeElement = cardElement.querySelector(".card__like-count");
  countLikeElement.textContent = card.likes.length;
  if (card.liked) {
    likeBtn.classList.add("card__like-button_is-active");
  }

  likeBtn.addEventListener("click", (event) => {
    event.stopPropagation();
    like(likeBtn, card._id, countLikeElement);
  });

  return cardElement;
}

function toggleLike(likeBtn, cardId, countLikeElement) {
  if (likeBtn.classList.contains("card__like-button_is-active")) {
    removeLike(cardId)
      .then((res) => {
        countLikeElement.textContent = res.likes.length;
        likeBtn.classList.remove("card__like-button_is-active");
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  } else {
    addLike(cardId)
      .then((res) => {
        countLikeElement.textContent = res.likes.length;
        likeBtn.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.log("Ошибка. Запрос не выполнен: ", err);
      });
  }
}

export { renderCard, toggleLike };
