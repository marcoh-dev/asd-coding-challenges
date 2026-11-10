const addButton = document.getElementById("addBtn") as HTMLButtonElement;
const itemList = document.getElementById("itemList") as HTMLParagraphElement;
const itemInput = document.getElementById("itemInput") as HTMLInputElement;

addButton.addEventListener("click", (event: MouseEvent) => {
	const newListElement = document.createElement("li");
	newListElement.textContent = itemInput.value;
	itemList.append(newListElement);
});
