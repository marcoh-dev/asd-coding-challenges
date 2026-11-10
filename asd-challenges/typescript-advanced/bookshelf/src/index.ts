import {
	sampleBooks,
	fetchBooks,
	fetchBook,
	createBook,
	updateBook,
	parseIsbn,
	groupBy,
	pluck,
	merge,
} from "./bookService";
import {} from "./bookService";

console.log(await fetchBooks("lord"));

console.log(await fetchBook(1550586483));
console.log(await fetchBook("1137556978"));

console.log(
	await createBook({
		title: "cool book",
		author: "Marco",
		isbn: "489084489084",
		isAvailable: false,
	}),
);

console.log(
	await updateBook(8697689, {
		title: "very cool book",
		isAvailable: true,
	}),
);

console.log(parseIsbn("489084489084"));

console.log(groupBy(sampleBooks, "author"));

console.log(pluck(sampleBooks, "title"));

console.log(merge(sampleBooks[3], { title: "new booktitle", author: "me" }));
