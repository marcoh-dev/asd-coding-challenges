const undo = document.getElementById("undo");
const redo = document.getElementById("redo");

undo?.addEventListener("click", (event: ) => {
	event.preventDefault();
	console.log("undo");
});
redo?.addEventListener("click", (event) => {
	event.preventDefault();
	console.log("redo");
});

/*
Undo / Redo

Build a small UI with one text input and two buttons, Undo and Redo, that uses two stacks to track edit history. Use vanilla TypeScript and HTML.

The state to track is the current value of the input plus two stacks:

    a back stack, holding earlier values of the input
    a forward stack, holding values that have been undone

The behavior on each action:

    on every change to the input, push the previous value onto back, update the current value to the new one, and empty forward
    on Undo (when back is non-empty), push the current value onto forward, pop the top of back, and set it as the current value
    on Redo (when forward is non-empty), push the current value onto back, pop the top of forward, and set it as the current value
    disable the Undo button when back is empty, and the Redo button when forward is empty

*/
