/*
Big O reasoning

Each snippet below takes an array arr of length n. Assign a Big O complexity class to each one and write a sentence justifying your answer.
*/

// snippet 1
function first(arr) {
	return arr[0];
}
// O(1), asks for specific index in array, doesnt change even if array length is 1 million

// snippet 2
function second(arr) {
	let total = 0;
	for (const value of arr) {
		total += value;
	}
	return total;
}
// O(n), linearly scales with array length

// snippet 3
function third(arr) {
	for (const a of arr) {
		for (const b of arr) {
			if (a === b) console.log(a);
		}
	}
}
// O(n^2), nested loop, scales with each loop

// snippet 4
function fourth(arr) {
	for (const value of arr) {
		for (let i = 0; i < 10; i++) {
			console.log(value, i);
		}
	}
}
// O(10n) (simplified O(n)), nested loop, but inner loop has a fixed length of 10, which is a constant we drop

// snippet 5
function fifth(arr) {
	if (arr.length <= 1) return arr;
	const mid = Math.floor(arr.length / 2);
	return [...fifth(arr.slice(0, mid)), ...fifth(arr.slice(mid))];
}
// O(n log n), keeps halving the array length recursively
