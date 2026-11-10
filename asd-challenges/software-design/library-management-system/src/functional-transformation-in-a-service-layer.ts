type BookRow = {
	id: number;
	title: string;
	author_name: string;
	is_available: boolean;
	added_at: Date;
};

/* DRY */
type BookResponse = {
	id: BookRow["id"];
	title: BookRow["title"];
	authorName: BookRow["author_name"];
	addedAt: BookRow["added_at"];
};

const rows: BookRow[] = [
	{
		id: 1,
		title: "The Hobbit",
		author_name: "J.R.R. Tolkien",
		is_available: true,
		added_at: new Date("2026-08-01"),
	},
	{
		id: 2,
		title: "1984",
		author_name: "George Orwell",
		is_available: false,
		added_at: new Date("2026-08-02"),
	},
	{
		id: 3,
		title: "Pride and Prejudice",
		author_name: "Jane Austen",
		is_available: true,
		added_at: new Date("2026-08-03"),
	},
];

/*
Functional transformation in a service layer

You receive an array of SQL result rows for the book catalogue. Each row contains id, title, author_name, is_available, and added_at.

Write TypeScript code that:

    filters the array so only available books remain
    maps each row into a response shape with id, title, authorName, and addedAt
    keeps the original array unchanged

After you finish, explain which part of your solution is pure and where side effects (e.g. DB writes) would belong in an Express application.
*/

const availableBooks = rows
	.filter((book) => book.is_available)
	.map((book) => ({
		id: book.id,
		title: book.title,
		authorName: book.author_name,
		addedAt: book.added_at,
	}));

console.log(rows);
console.log(availableBooks);

/* SRP ? */

function getAvailableBookRows(rows: BookRow[]): BookRow[] {
	return rows.filter((row) => row.is_available);
}

function toBookResponse(row: BookRow): BookResponse {
	return {
		id: row.id,
		title: row.title,
		authorName: row.author_name,
		addedAt: row.added_at,
	};
}

function getAvailableBooksResponse(rows: BookRow[]) {
	const availableBooksRows = getAvailableBookRows(rows);
	const bookResponses = availableBooksRows.map((row) => toBookResponse(row));
	return bookResponses;
}

console.log(getAvailableBooksResponse(rows));
