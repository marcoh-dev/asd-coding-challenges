/*
Implement insertion sort

Write an insertionSort function that takes an array of numbers and returns it sorted in ascending order. 
Match the algorithm from the algorithms file: walk the array from the second element onwards, and for each element, slide it left past every larger value until it lands in the right place.

function insertionSort(arr) {
  // your code here
}

console.log(insertionSort([5, 2, 4, 6, 1, 3]));
// → [1, 2, 3, 4, 5, 6]

A few things to decide while implementing:

    whether to mutate the input array or work on a copy
    how the inner loop knows when to stop sliding the current value
    what happens for an empty array or an array of length one

Once it works, test it on three inputs and count how many comparisons it makes for each:

    an already-sorted array, e.g. [1, 2, 3, 4, 5]
    a reverse-sorted array, e.g. [5, 4, 3, 2, 1]
    a single-element array [42]

The already-sorted and single-element cases should be cheap. The reverse-sorted case should be expensive. That gap is what the algorithms file means when it says insertion sort is O(n²) worst case but O(n) best case.
*/

function insertionSort(arr) {
	console.log("	");
	console.log("input:", arr);
	let comparisons = 0;
	for (let i = 1; i <= arr.length - 1; i++) {
		const current = arr[i];
		let j = i - 1;

		while (j >= 0 && arr[j] > current) {
			comparisons++;
			arr[j + 1] = arr[j];
			j = j - 1;
		}
		arr[j + 1] = current;
	}

	console.log("comparisons:", comparisons);
	return arr;
}

// O(n) - O(n^2)
// I mutate the input array to save on memory, I also don't need it as it already is a copy of the data inside the function call
// j >= 0 always true as i is always minimum 1 and j is i-1, arr[j] > current means the greater number is still on the left
// empty array or length of 1 will skip the for loop

console.log(insertionSort([1, 2, 3, 4, 5]));
console.log(insertionSort([5, 4, 3, 2, 1]));
console.log(insertionSort([42]));
console.log(insertionSort([]));
console.log(insertionSort([5, 2, 4, 6, 1, 3]));
console.log(insertionSort([9, 8, 7, 6, 5, 4, 3, 2, 1]));
