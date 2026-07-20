const decreaseButton = document.getElementById("decreaseBtn");
const increaseButton = document.getElementById("increaseBtn");
const counter = document.getElementById("counter");
function updateCounter(change) {
    const currentValue = Number(counter.textContent);
    counter.textContent = String(currentValue + change);
}
increaseButton.addEventListener("click", (event) => updateCounter(1));
decreaseButton.addEventListener("click", (event) => updateCounter(-1));
export {};
//# sourceMappingURL=main.js.map