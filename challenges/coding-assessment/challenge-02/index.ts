function maskify(input: string) {
	if (input.length <= 4) return input;

	const maskCharacter = "#";
	const maskedInput = maskCharacter.repeat(input.length - 4) + input.slice(-4);

	return maskedInput;
}

console.log(maskify("4556364607935616"));
console.log(maskify("64607935616"));
console.log(maskify("1"));
console.log(maskify(""));
console.log(maskify("Skippy"));
console.log(maskify("Nananananananananananananananana Batman!"));
