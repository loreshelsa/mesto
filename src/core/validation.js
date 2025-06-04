let validationSelectors = null;

//найти все формы и вызвать функцию которая вешает слушатель
function enableValidation(validationObject) {
  validationSelectors = validationObject;
  const formList = Array.from(
    document.querySelectorAll(validationSelectors.formSelector)
  );
  formList.forEach((formElement) => {
    return setEventListeners(formElement);
  });
}

// вешает слушатели
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

//очищает ошибки валидации формы и делает кнопку неактивной
function clearValidation(formElement, validationConfig) {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.inputSelector)
  );
  inputList.forEach((inputElement) => {
    hideInputError(formElement, inputElement);
  });
}

// показать сообщение об ошибке и убрать сообщение об ошибке
function isValid(formElement, inputElement) {
  if (!inputElement.validity.valid) {
    let errorMessage = inputElement.dataset.errorMessage;
    if (inputElement.validity.tooShort) {
      errorMessage = inputElement.dataset.errorLengthMessage;
    } 
    if (inputElement.validity.typeMismatch) {
      errorMessage = inputElement.dataset.errorUrlMessage;
    }
    if (inputElement.validity.patternMismatch) {
      errorMessage = inputElement.dataset.errorSymbolsMessage;
    }
    showInputError(formElement, inputElement, errorMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
}

// добавляем класс ошибки и класс активации
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

//проверяет наличие невалидного поля
function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

//включить и отключить кнопку
function toggleButtonState(inputList, buttonElement) {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationSelectors.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationSelectors.inactiveButtonClass);
  }
}

export { enableValidation, clearValidation };
