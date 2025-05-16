let activePopup = null;

function openPopup(popup) {
  activePopup = popup;
  popup.classList.add("popup_is-opened");
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

export { activePopup, openPopup, closePopup };