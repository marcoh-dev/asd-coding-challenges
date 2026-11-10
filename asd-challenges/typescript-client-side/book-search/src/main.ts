interface IBook {
	id: string;
	title: string;
	subtitle: string;
	authors: string;
	image: string;
	url: string;
}

interface ISearchResult {
	status: string;
	total: string;
	books: IBook[];
}

const searchForm = document.getElementById("search-form") as HTMLFormElement;
const bookList = document.getElementById("book-list") as HTMLUListElement;

async function fetchBooks(term: string): Promise<IBook[]> {
	const response = await fetch(`https://www.dbooks.org/api/search/${term}`);
	const data: ISearchResult = await response.json();
	return data.books as IBook[];
}

searchForm.addEventListener("submit", async (event: SubmitEvent) => {
	event.preventDefault();

	const data = Object.fromEntries(new FormData(searchForm));

	const books = await fetchBooks(data.query as string);

	bookList.innerHTML = "";
	books.forEach((book) => {
		const newListElement = document.createElement("li");
		newListElement.textContent = `${book.title} (${book.authors.split(", ")[0]})`;
		bookList.append(newListElement);
	});
});
