let data = new Object();

switch (typeof data) {
  case "undefined":
    console.log("undefined!");
    break;
  case "number":
    if (isNaN(data)) {
      console.log("not a number!");
    } else {
      console.log("number!");
    }
    break;
  case "string":
    console.log("string!");
    break;
  case "boolean":
    console.log("boolean!");
    break;
  case "function":
    console.log("function!");
    break;
  case "object":
    if (data === null) {
      console.log("null!");
    } else if (Array.isArray(data)) {
      console.log("array!");
    } else {
      console.log("object!");
    }
    break;
  default:
    console.log("I have no idea!");
}

/*
- Open the file `js/index.js`.
- Declare a variable named `data`.
- Write a `switch` statement that checks the result of [`typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) data and logs a different string depending on the type or value of `data`.

The possible strings to log are:
- "undefined!"
- "null!"
- "number!"
- "not a number!" (for NaN)
- "string!"
- "boolean!"
- "function!"
- "object!"
- "array!"
- "I have no idea!" (for any other type)

> 💡 Hint: For checking if `data` is `null`, an `array`, or a regular `object`, you’ll need to handle these cases specifically in JavaScript, as `typeof` returns "object" for all of them.
*/
