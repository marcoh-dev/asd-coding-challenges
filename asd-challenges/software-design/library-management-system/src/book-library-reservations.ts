/*

Book Library Reservations

Your local library wants to create a reservation system for book reservations. Members of the library should be able to reserve books, mark them as returned, 
and cancel reservations through their online account. Create a BookReservation class in TypeScript that implements the following criteria:

    accept a member name and a book title in the constructor
    store the reservation #status so it cannot be changed directly from outside the class. The #status can only be “reserved”, “returned”, or “cancelled”.
    provide a markReturned method that rejects the action if the reservation is already returned or cancelled
    provide a cancel method that rejects the action if the book has already been returned
    provide a way to read the current #status safely

*/

type TReservationStatus = "reserved" | "returned" | "cancelled";

class BookReservation {
	public memberName: string;
	public bookTitle: string;
	#status: TReservationStatus;
	constructor(name: string, bookTitle: string) {
		this.memberName = name;
		this.bookTitle = bookTitle;
		this.#status = "reserved";
	}
	markReturned(): void {
		if (this.#status === "returned" || this.#status === "cancelled") {
			throw new Error(`reservation already ${this.#status}`);
		}
		this.#status = "returned";
	}
	cancel(): void {
		if (this.#status === "returned") {
			throw new Error(`reservation already ${this.#status}`);
		}
		this.#status = "cancelled";
	}
	getStatus(): TReservationStatus {
		return this.#status;
	}
}

const reservation1 = new BookReservation("Marco", "LOTR");

console.log(reservation1);

console.log(reservation1.getStatus());

reservation1.markReturned();

console.log(reservation1.getStatus());

// reservation1.cancel(); // Error
