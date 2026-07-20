const addButton = document.getElementById("addBtn") as HTMLButtonElement;
const itemList = document.getElementById("itemList") as HTMLParagraphElement;
const itemInput = document.getElementById("itemInput") as HTMLInputElement;

addButton.addEventListener("click", (event: MouseEvent) => {
	const newListElement = document.createElement("li");
	newListElement.textContent = itemInput.value;

	const deleteButton = document.createElement("button");
	deleteButton.className = "deleteBtn";
	deleteButton.textContent = "Delete";
	deleteButton.addEventListener("click", (event: MouseEvent) => {
		const button = event.target as HTMLButtonElement;
		button?.closest("li")?.remove();
	});
	newListElement.append(deleteButton);
	itemList.append(newListElement);

	itemInput.value = "";
	itemInput.focus();
});
