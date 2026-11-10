const todoList = document.getElementById("todoList") as HTMLParagraphElement;
const todoInput = document.getElementById("todoInput") as HTMLInputElement;
const todoForm = document.getElementById("todoForm") as HTMLFormElement;

todoForm.addEventListener("submit", (event: SubmitEvent) => {
	event.preventDefault();

	const newListElement = document.createElement("li");
	newListElement.textContent = todoInput.value;

	const markAsDone = document.createElement("input");
	markAsDone.type = "checkbox";
	markAsDone.value = "1";
	markAsDone.addEventListener("input", (event: InputEvent) => {
		const checkbox = event.target as HTMLInputElement;
		console.log(checkbox.checked);
		checkbox.closest("li")!.style.textDecoration = checkbox.checked
			? "line-through"
			: "";
	});

	const deleteTodo = document.createElement("button");
	deleteTodo.className = "deleteTodo";
	deleteTodo.textContent = "Delete";
	deleteTodo.addEventListener("click", (event: MouseEvent) => {
		const button = event.target as HTMLButtonElement;
		button?.closest("li")?.remove();
	});
	newListElement.append(markAsDone);
	newListElement.append(deleteTodo);
	todoList.append(newListElement);

	todoInput.value = "";
	todoInput.focus();
});
