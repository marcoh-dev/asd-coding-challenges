const decreaseButton = document.getElementById(
	"decreaseBtn",
) as HTMLButtonElement;
const increaseButton = document.getElementById(
	"increaseBtn",
) as HTMLButtonElement;
const counter = document.getElementById("counter") as HTMLParagraphElement;

function updateCounter(change: number): void {
	const currentValue = Number(counter.textContent);
	counter.textContent = String(currentValue + change);
}

increaseButton.addEventListener("click", (event: MouseEvent) =>
	updateCounter(1),
);
decreaseButton.addEventListener("click", (event: MouseEvent) =>
	updateCounter(-1),
);
