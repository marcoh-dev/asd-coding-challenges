const toggleButton = document.getElementById("toggleBtn") as HTMLButtonElement;
const hiddenText = document.getElementById(
	"hiddenText",
) as HTMLParagraphElement;

toggleButton.addEventListener("click", (event: MouseEvent) => {
	hiddenText.style.display = hiddenText.style.display === "none" ? "" : "none";
});
