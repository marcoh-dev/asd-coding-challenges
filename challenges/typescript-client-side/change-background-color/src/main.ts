const colorSelect = document.getElementById("colorSelect") as HTMLSelectElement;
const colorBox = document.getElementById("colorBox") as HTMLDivElement;

colorSelect.addEventListener("click", (event: MouseEvent) => {
	colorBox.style.backgroundColor = colorSelect.value;
});
