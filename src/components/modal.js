let activePopup = null;

function openPopup(popup) {
  activePopup = popup;
  popup.classList.add("popup_is-opened");
  document.addEventListener("click", closePopupOverlay);
  document.addEventListener("keydown", closePopupEsc);
}

function closePopupOverlay(event) {
  const popupContent = activePopup.querySelector(".popup__content");
  if (
    event.target !== popupContent &&
    event.target.closest(".popup__content") !== popupContent
  ) {
    closePopup(activePopup);
  }
}

function closePopup(popup) {
  activePopup = null;
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("click", closePopupOverlay);
  document.removeEventListener("keydown", closePopupEsc);
}

function closePopupEsc(event) {
  if (event.key?.toLowerCase() === "escape") {
    closePopup(activePopup);
  }
}

export { openPopup, closePopup };
