const submitButton = document.getElementById("submitBtn");
const displayName = document.getElementById("displayName");
const nameInput = document.getElementById("nameInput");
submitButton.addEventListener("click", (event) => {
    displayName.textContent = nameInput.value;
});
export {};
//# sourceMappingURL=main.js.map