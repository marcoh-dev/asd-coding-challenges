const addButton = document.getElementById("addBtn");
const itemList = document.getElementById("itemList");
const itemInput = document.getElementById("itemInput");
addButton.addEventListener("click", (event) => {
    const newListElement = document.createElement("li");
    newListElement.textContent = itemInput.value;
    itemList.append(newListElement);
});
export {};
//# sourceMappingURL=main.js.map