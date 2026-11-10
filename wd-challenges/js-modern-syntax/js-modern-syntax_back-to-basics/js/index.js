/*
Now that you've practiced destructuring, default parameters, and the spread operator,
try reversing the challenge by rewriting this code without using these modern features.
*/
console.clear();

export function getNameAndCountry({ name, country }) {
  return [name, country];
}

export function getRelocatedCity(city1, city2) {
  /*
  city2 = city2 || { name: "Berlin", country: "Germany" };
  */

  /*
  if (!city2) {
    city2 = {
      name: "Berlin",
      country: "Germany",
    };
  }*/

  /*
  city2 = typeof city2 === "undefined" ? { name: "Berlin", country: "Germany" } : city2;
  */

  if (city2 === undefined) {
    city2 = {};
    if (!Object.hasOwn(city2, "name")) {
      city2.name = "Berlin";
    }

    if (!Object.hasOwn(city2, "country")) {
      city2.country = "Germany";
    }
  }

  const country = getNameAndCountry(city2)[1];
  /*
  const relocatedCity = {};

  for (const key in city1) {


    if (Object.hasOwn(city1, key)) {
      relocatedCity[key] = city1[key];
    }
  }

  relocatedCity.country = country;
  return relocatedCity;
*/

  return { name: city1.name, city: city1.country, country: country };
}
