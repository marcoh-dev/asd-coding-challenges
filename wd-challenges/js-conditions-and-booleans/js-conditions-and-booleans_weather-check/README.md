# JS Conditions and Booleans: Weather check

In this exercise you train to write a `switch` statement. Please also refer to the handout.

## Tasks

### Part 1: Simple switch Statement

- Open the file `index.js`.
- There is a variable `weather` that contains the current weather condition as a string (e.g., "sunny", "rainy", "snowy").
- Write a `switch` statement that checks the value of `weather` and logs a message for each weather condition.
    - Example:
    - If the weather is "sunny" → "It's sunny!"
    - If the weather is "rainy" → "It's raining, don't forget your umbrella!"
    - If the weather is "snowy" → "It's snowing, stay warm!"
    - For any other input → "I'm not sure what the weather is like."

> 💡 Tip: Use the `break` statement to avoid the "fall-through" effect.

### Part 2: Adding Conditions

- Now we’ll extend the `switch` statement by adding a second variable `temperature`, which contains a `number` (the current temperature in degrees Celsius).
- Modify the `switch` statement so that it also takes into account the `temperature`, and logs different messages based on the `weather` and the `temperature`.
    - New Conditions:
    - If the weather is "sunny" and the temperature is above 20°C → "It's sunny and warm!"
    - If the weather is "sunny" and the temperature is 20°C or below → "It's sunny, but a bit chilly!"
    - If the weather is "rainy" → "It's raining, don't forget your umbrella!"
    - If the weather is "snowy" and the temperature is below 0°C → "Freezing snow!"
    - For any other input → "I'm not sure what the weather is like."

> 💡 Tip: Use the `break` statement to avoid the "fall-through" effect.

### Running the Code

> 💡 Since this project is JavaScript only, there is nothing to preview in the browser. You will run the JavaScript code directly in the terminal using Node.js.

- To run your code:
    - Open your terminal.
    - Navigate to the folder where `index.js` is located.
    - Run `pnpm start` to execute the `index.js` file using Node.js.
    - The script will run using Node.js, and the output will be logged in the terminal.
    - Check the terminal output to see if the correct messages are displayed based on the weather conditions and temperature.

### Notes

- You only have to touch the `index.js` file.
