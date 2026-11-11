const fruits: string[] = ["apple", "banana", "cherry"];

function shoutAll(items: string[]): string[] {
	return items.map((item) => item.toUpperCase());
}

function sum(numbers: number[]): number {
	return numbers.reduce((total, n) => total + n, 0);
}

console.log(shoutAll(fruits));
console.log(sum([10, 20, 30]));
