import Circle from "./components/Circle/Circle.js";
import Pentagon from "./components/Pentagon/Pentagon.js";
import Square from "./components/Square/Square.js";

const root = document.getElementById("root");

const circleElement = Circle();
const squareElement = Square();
const pentagonElement = Pentagon();

root.append(circleElement, squareElement, pentagonElement);
