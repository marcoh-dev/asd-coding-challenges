const colorSelect = document.getElementById("colorSelect");
const colorBox = document.getElementById("colorBox");
colorSelect.addEventListener("click", (event) => {
    colorBox.style.backgroundColor = colorSelect.value;
});
export {};
//# sourceMappingURL=main.js.map