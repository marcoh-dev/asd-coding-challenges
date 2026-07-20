const todoList = document.getElementById("todoList");
const todoInput = document.getElementById("todoInput");
const todoForm = document.getElementById("todoForm");
todoForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const newListElement = document.createElement("li");
    newListElement.textContent = todoInput.value;
    const markAsDone = document.createElement("input");
    markAsDone.type = "checkbox";
    markAsDone.value = "1";
    markAsDone.addEventListener("input", (event) => {
        const checkbox = event.target;
        console.log(checkbox.checked);
        checkbox.closest("li").style.textDecoration = checkbox.checked
            ? "line-through"
            : "";
    });
    const deleteTodo = document.createElement("button");
    deleteTodo.className = "deleteTodo";
    deleteTodo.textContent = "Delete";
    deleteTodo.addEventListener("click", (event) => {
        const button = event.target;
        button?.closest("li")?.remove();
    });
    newListElement.append(markAsDone);
    newListElement.append(deleteTodo);
    todoList.append(newListElement);
    todoInput.value = "";
    todoInput.focus();
});
export {};
//# sourceMappingURL=main.js.map