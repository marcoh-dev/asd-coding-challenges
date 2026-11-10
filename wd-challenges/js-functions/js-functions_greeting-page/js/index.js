console.clear();

/*
Update the content and style of the page based on the current day and time.

- Write a function `getGreeting` that returns a different greeting depending on the current time:
  - 6 - 12: returns "Good Morning"
  - 13 - 18: returns "Good Afternoon"
  - 19 - 22: returns "Good Evening"
  - 23 - 5: returns "Good Night"

(HINT: You can get the current hour with `new Date().getHours()`)

- Write a function `getDayColor` that returns a different color depending on the current weekday:
  - Monday: "darkgray"
  - Tuesday - Friday: "lightblue"
  - Saturday - Sunday: "hotpink"

(HINT: You can get the current weekday with `new Date().getDay()`)

*/

const display = document.querySelector('[data-js="display"]');

function getGreeting() {
  //const time = new Date().getHours();
  const time = 23;
  console.log(time);
  switch (true) {
    case time >= 6 && time <= 12:
      return "Good Morning";
    case time >= 13 && time <= 18:
      return "Good Afternoon";
    case time >= 19 && time <= 22:
      return "Good Evening";
    case time >= 23 || time <= 5:
      return "Good Night";
  }
}

function getDayColor() {
  const day = new Date().getDay();
  //const day = 3;
  console.log(day);
  switch (true) {
    case day === 1:
      return "darkgray";
    case day >= 2 && day <= 5:
      return "lightblue";
    case day >= 6 && day <= 7:
      return "hotpink";
  }
}

display.textContent = getGreeting();
document.body.style.backgroundColor = getDayColor();
