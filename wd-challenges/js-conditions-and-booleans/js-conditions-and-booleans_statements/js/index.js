console.clear();

// Part 1: Password
const SUPER_SECRET_PASSWORD = "h4x0r1337";

const receivedPassword = "password1234";

if (receivedPassword === SUPER_SECRET_PASSWORD) {
  console.log("Welcome! You are logged in as Brunhilde1984.");
} else {
  console.log("Access denied!");
}

// Part 2: Even / Odd
const number = 6;

if (number % 2) {
  console.log("odd number");
} else {
  console.log("even number");
}

// Part 3: Hotdogs
const numberOfHotdogs = 42;

if (numberOfHotdogs >= 1000000) {
  console.log("0.10 euro per hotdog");
} else if (numberOfHotdogs >= 100) {
  console.log("1 euro per hotdog");
} else if (numberOfHotdogs >= 5) {
  console.log("1.50 euro per hotdog");
} else if (numberOfHotdogs > 0) {
  console.log("2 euro per hotdog");
} else {
  console.log("you didnt buy anything!");
}

// Part 4: Daytime
const currentHour = 12;

const statement = currentHour >= 17 ? "Partytime!!!" : "Still need to learn...";

console.log(statement);

// Part 5: Greeting
const userName = "Archibald";
const coachName = "Klaus";

const greeting = "Hello " + (userName === coachName ? "Coach" : userName) + "!";

console.log(greeting);
