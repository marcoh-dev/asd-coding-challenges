console.clear();

const pizzaInput1 = document.querySelector('[data-js="pizza-input-1"]');
const pizza1 = document.querySelector('[data-js="pizza-1"]');
const pizzaInput2 = document.querySelector('[data-js="pizza-input-2"]');
const pizza2 = document.querySelector('[data-js="pizza-2"]');
const outputSection = document.querySelector('[data-js="output-section"]');

const output = document.querySelector('[data-js="output"]');

// pizzaInput1.addEventListener("input", () => {
//   const pizzaSize1 = Number(pizzaInput1.value);
//   const pizzaSize2 = Number(pizzaInput2.value);
//   updatePizzaDisplay(pizza1, pizzaSize1);
//   updateOutputColor(pizzaSize1, pizzaSize2);
//   output.textContent = calculatePizzaGain(pizzaSize1, pizzaSize2);
// });

// pizzaInput2.addEventListener("input", () => {
//   const pizzaSize1 = Number(pizzaInput1.value);
//   const pizzaSize2 = Number(pizzaInput2.value);
//   updatePizzaDisplay(pizza2, pizzaSize2);
//   updateOutputColor(pizzaSize1, pizzaSize2);
//   output.textContent = calculatePizzaGain(pizzaSize1, pizzaSize2);
// });

pizzaInput1.addEventListener("input", handlePizzaInputEvent);
pizzaInput2.addEventListener("input", handlePizzaInputEvent);

function handlePizzaInputEvent() {
  const pizzaSize1 = Number(pizzaInput1.value);
  const pizzaSize2 = Number(pizzaInput2.value);
  updatePizzaDisplay(pizza1, pizzaSize1);
  updatePizzaDisplay(pizza2, pizzaSize2);
  updateOutputColor(pizzaSize1, pizzaSize2);
  output.textContent = calculatePizzaGain(pizzaSize1, pizzaSize2);
}

// Task 1: Define the function `calculatePizzaGain` here
function calculatePizzaGain(diameter1, diameter2) {
  const area1 = Math.PI * (Number(diameter1) / 2) ** 2;
  const area2 = Math.PI * (Number(diameter2) / 2) ** 2;
  const pizzaGain = ((area2 - area1) / area1) * 100;

  return Math.round(pizzaGain);
}

// Task 2: Define the function `updatePizzaDisplay` here
function updatePizzaDisplay(pizzaElement, newSize) {
  const newDisplaySize = (newSize / 24) * 100;
  pizzaElement.style.width = newDisplaySize + "px";
}
// Task 3: Define the function `updateOutputColor` here
function updateOutputColor(size1, size2) {
  if (size2 > size1) {
    outputSection.style.backgroundColor = "var(--green)";
  } else if (size1 > size2) {
    outputSection.style.backgroundColor = "var(--red)";
  } else {
    outputSection.style.backgroundColor = "transparent";
  }
}

// trigger input event once to catch changed values e.g. from reload
pizzaInput1.dispatchEvent(new Event("input"));
