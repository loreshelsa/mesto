let validationSelectors = null;

function enableValidation(validationObject) {
  validationSelectors = validationObject;
  const formList = Array.from(
    document.querySelectorAll(validationSelectors.formSelector)
  );
  formList.forEach((formElement) => {
    return setEventListeners(formElement);
  });
}

function setEventListeners(formElement) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationSelectors.inputSelector)
  );
  const buttonElement = formElement.querySelector(
    validationSelectors.submitButtonSelector
  );
  toggleButtonState(inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
}

function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
  const saveButton = formElement.querySelector(".popup__button");
  disableSubmitButton(saveButton, validationConfig.inactiveButtonClass);
}

function isValid(formElement, inputElement) {
  console.info(inputElement.validity);
  if (!inputElement.validity.valid) {
    let errorMessage = inputElement.dataset.errorMessage;
    if (inputElement.validity.patternMismatch) {
      errorMessage = inputElement.dataset.errorSymbolsMessage;
    } else {
      errorMessage = inputElement.validationMessage;
    }
    showInputError(formElement, inputElement, errorMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationSelectors.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationSelectors.errorClass);
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationSelectors.inputErrorClass);
  errorElement.classList.remove(validationSelectors.errorClass);
  errorElement.textContent = "";
};

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

const disableSubmitButton = (buttonElement, className) => {
  buttonElement.disabled = true;
  buttonElement.classList.add(className);
};

const enableSubmitButton = (buttonElement, className) => {
  buttonElement.disabled = false;
  buttonElement.classList.remove(className);
};

function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(buttonElement, validationSelectors.inactiveButtonClass);
  } else {
    enableSubmitButton(buttonElement, validationSelectors.inactiveButtonClass);
  }
}

export { enableValidation, clearValidation };
