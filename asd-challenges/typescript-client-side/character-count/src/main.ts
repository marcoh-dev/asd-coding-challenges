const charCount = document.getElementById("charCount") as HTMLParagraphElement;
const textInput = document.getElementById("textInput") as HTMLTextAreaElement;

textInput.addEventListener("input", (event: InputEvent) => {
	const chars = textInput.value?.length;
	charCount.textContent = `${chars} character${chars !== 1 ? `s` : ``}`;
});
