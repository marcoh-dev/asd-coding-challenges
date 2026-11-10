console.clear();

/*
1: Create the data for a book in an online store. Define variables for the following details:
  - The title of the book
  - The author of the book
  - The book's rating
  - The number of copies sold
*/

// --v-- write your code here --v--
const bookTitle = "The Lord of the Javascript";
const bookAuthor = "Mario";
let bookRating = 4.2;
let bookSales = 120;
// --^-- write your code here --^--

/*
2: Log all variables to the console, for example:

Title: The Lord of the Javascript
Author: Mario
Rating: 4.2
Sales: 120

Then:
- Increase the number of sales.
- Update the book's rating.
- Log all variables to the console again after making these updates.
*/

// --v-- write your code here --v--

// --^-- write your code here --^--

/*
3: The logging code above is repetitive and hard to maintain.
   Refactor your code by doing the following:

 - Write a function called `logBookData` that logs all the book details to the console.
 - Replace the existing `console.log` statements with calls to this function.
 - Then, increase the number of sales two more times and log the updated details after each increase.
*/

// --v-- write your code here --v--
function logBookData(bookTitle, bookAuthor, bookRating, bookSales) {
  console.log("Title: " + bookTitle);
  console.log("Author: " + bookAuthor);
  console.log("Rating: " + bookRating);
  console.log("Sales: " + bookSales);
}

logBookData(bookTitle, bookAuthor, bookRating, bookSales);

bookSales = 140;
bookRating = 4.4;

logBookData(bookTitle, bookAuthor, bookRating, bookSales);

bookSales = 240;

logBookData(bookTitle, bookAuthor, bookRating, bookSales);

// --^-- write your code here --^--
