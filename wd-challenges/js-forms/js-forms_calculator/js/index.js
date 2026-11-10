console.clear();

const form = document.querySelector('[data-js="form"]');
const resultOutput = document.querySelector('[data-js="result"]');

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  let result;

  // --v-- write your code here --v--
  const formData = Object.fromEntries(new FormData(event.target));
  console.log(formData);

  switch (formData.operator) {
    case "addition":
      result = add(Number(formData.numberA), Number(formData.numberB));
      console.log("addition");
      break;
    case "subtraction":
      result = subtract(Number(formData.numberA), Number(formData.numberB));
      console.log("subtraction");
      break;
    case "multiplication":
      result = multiply(Number(formData.numberA), Number(formData.numberB));
      console.log("multiplication");
      break;
    case "division":
      result = divide(Number(formData.numberA), Number(formData.numberB));
      console.log("division");
      break;
  }
  // --^-- write your code here --^--

  resultOutput.textContent = result;
});
