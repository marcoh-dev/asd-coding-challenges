const submitButton = document.getElementById("submitBtn") as HTMLButtonElement;
const displayName = document.getElementById(
	"displayName",
) as HTMLParagraphElement;
const nameInput = document.getElementById("nameInput") as HTMLInputElement;

submitButton.addEventListener("click", (event: MouseEvent) => {
	displayName.textContent = nameInput.value;
});
