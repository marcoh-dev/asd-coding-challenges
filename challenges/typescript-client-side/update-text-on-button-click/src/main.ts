const helloButton = document.getElementById("helloBtn") as HTMLButtonElement;
const output = document.getElementById("output") as HTMLParagraphElement;

helloButton.addEventListener("click", (event: MouseEvent) => {
	output.textContent = "Hello from TypeScript!";
});
