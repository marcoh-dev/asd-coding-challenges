import { countries } from "./utils/countries.js";
import { Country } from "./components/Country/Country.js";

console.clear();

const container = document.querySelector('[data-js="card-container"]');
const queryInput = document.querySelector('[data-js="query-input"]');

queryInput.addEventListener("input", (event) => {
  container.innerHTML = "";

  const searchString = event.target.value;

  // const foundCountry = countries.find((element) => element.name.toLowerCase().startsWith(searchString.toLowerCase()));

  // if (foundCountry) {
  //   const countryElement = Country(foundCountry);
  //   container.append(countryElement);
  // }

  const foundCountries = countries.filter((element) =>
    element.name.toLowerCase().startsWith(searchString.toLowerCase()),
  );

  if (foundCountries) {
    foundCountries.forEach((element) => {
      const countryElement = Country(element);
      container.append(countryElement);
    });
  }
});

queryInput.dispatchEvent(new Event("input"));
