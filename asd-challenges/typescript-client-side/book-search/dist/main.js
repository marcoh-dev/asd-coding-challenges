const searchForm = document.getElementById("search-form");
const bookList = document.getElementById("book-list");
async function fetchBooks(term) {
    const response = await fetch(`https://www.dbooks.org/api/search/${term}`);
    const data = await response.json();
    return data.books;
}
searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(searchForm));
    const books = await fetchBooks(data.query);
    bookList.innerHTML = "";
    books.forEach((book) => {
        const newListElement = document.createElement("li");
        newListElement.textContent = `${book.title} (${book.authors.split(", ")[0]})`;
        bookList.append(newListElement);
    });
});
export {};
//# sourceMappingURL=main.js.map