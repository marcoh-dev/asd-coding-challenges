console.clear();

const url = "https://swapi.py4e.com/api/people";

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
  console.log(data.results);
  data.results.forEach((element) => {
    //console.log(element);
    if (element.name === "R2-D2") {
      console.log(element.name + ", eye_color:" + element.eye_color);
    }
  });
}

fetchData(url);
