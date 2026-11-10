console.clear();

const firstInput = document.querySelector('[data-js="first-input"]');
const secondInput = document.querySelector('[data-js="second-input"]');
const uppercaseButton = document.querySelector('[data-js="button-uppercase"]');
const lowercaseButton = document.querySelector('[data-js="button-lowercase"]');
const switchValuesButton = document.querySelector(
  '[data-js="button-switch-values"]',
);

uppercaseButton.addEventListener("click", () => {
  firstInput.value = firstInput.value.toUpperCase();
  secondInput.value = secondInput.value.toUpperCase();
});

lowercaseButton.addEventListener("click", () => {
  firstInput.value = firstInput.value.toLowerCase();
  secondInput.value = secondInput.value.toLowerCase();
});

switchValuesButton.addEventListener("click", () => {
  const firstInputValue = firstInput.value;
  const secondInputValue = secondInput.value;
  firstInput.value = secondInputValue;
  secondInput.value = firstInputValue;
});
