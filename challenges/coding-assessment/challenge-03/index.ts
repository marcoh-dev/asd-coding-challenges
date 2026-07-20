function sortWords(inputString: string): string {
	const wordArray = inputString.split(" ");
	let sortedWordArray: string[] = [];

	if (wordArray.length < 2) return inputString;

	for (let i = 0; i < wordArray.length; i++) {
		const word: string | undefined = wordArray.find((word) =>
			word.includes(String(i + 1)),
		);

		if (word) {
			sortedWordArray.push(word);
		}
	}

	return sortedWordArray.join(" ");
}

console.log(sortWords("is2 Thi1s T4est 3a"));
console.log(sortWords("4of Fo1r pe6ople g3ood th5e the2"));
console.log(sortWords(""));
