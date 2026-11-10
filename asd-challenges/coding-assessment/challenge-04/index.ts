function findMissingLetter(letters: string[]): string {
	const charCodes: number[] = letters.map((letter) => letter.charCodeAt(0));

	for (let i: number = 0; i < charCodes.length; i++) {
		const expectedCharCode: number = charCodes[0] + i;
		if (charCodes[i] !== expectedCharCode) {
			return String.fromCharCode(expectedCharCode);
		}
	}
	return "";
}

console.log(findMissingLetter(["a", "b", "c", "d", "f"]));
console.log(findMissingLetter(["O", "Q", "R", "S"]));
