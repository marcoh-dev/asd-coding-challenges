const charCount = document.getElementById("charCount");
const textInput = document.getElementById("textInput");
textInput.addEventListener("input", (event) => {
    const chars = textInput.value?.length;
    charCount.textContent = `${chars} character${chars !== 1 ? `s` : ``}`;
});
export {};
//# sourceMappingURL=main.js.map