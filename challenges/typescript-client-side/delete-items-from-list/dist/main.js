const addButton = document.getElementById("addBtn");
const itemList = document.getElementById("itemList");
const itemInput = document.getElementById("itemInput");
addButton.addEventListener("click", (event) => {
    const newListElement = document.createElement("li");
    newListElement.textContent = itemInput.value;
    const deleteButton = document.createElement("button");
    deleteButton.className = "deleteBtn";
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", (event) => {
        const button = event.target;
        button?.closest("li")?.remove();
    });
    newListElement.append(deleteButton);
    itemList.append(newListElement);
    itemInput.value = "";
    itemInput.focus();
});
export {};
//# sourceMappingURL=main.js.map