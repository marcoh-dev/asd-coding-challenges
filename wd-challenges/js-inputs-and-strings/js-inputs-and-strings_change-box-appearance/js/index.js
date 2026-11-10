console.clear();

const box = document.querySelector('[data-js="box"]');
const colorRangeInput = document.querySelector('[data-js="input-color"]');
const radiusRangeInput = document.querySelector('[data-js="input-radius"]');
const rotationRangeInput = document.querySelector('[data-js="input-rotation"]');

colorRangeInput.addEventListener("input", () => {
  const colorRangeInputValue = colorRangeInput.value;
  box.style.backgroundColor = `hsl(${colorRangeInputValue}, 70%, 60%)`;
});

radiusRangeInput.addEventListener("input", () => {
  const radiusRangeInputValue = radiusRangeInput.value;
  box.style.borderRadius = `${radiusRangeInputValue}%`;
});

rotationRangeInput.addEventListener("input", () => {
  const rotationRangeInputValue = rotationRangeInput.value;
  box.style.transform = `rotate(${rotationRangeInputValue}deg)`;
});
