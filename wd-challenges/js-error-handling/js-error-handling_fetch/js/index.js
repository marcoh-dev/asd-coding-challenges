console.clear();

const actionsElement = document.querySelector("[data-js='actions']");
const userElement = document.querySelector("[data-js='user']");
const errorElement = document.querySelector("[data-js='error']");

async function fetchUserData(url) {
  console.clear();
  const response = await fetch(url, {
    headers: { "x-api-key": "reqres_c0aaf46c1fa2400e8fb8669bacd63171" },
  });
  const contentType = response.headers.get("content-type");
  const expectedContentType = "application/json; charset=utf-8";

  try {
    if (!response.ok) {
      throw new Error(`${response.status}`);
      //throw new Error(`${response.name}: ${response.message}`);
    }
    if (contentType !== expectedContentType) {
      //console.log("contentType not correct");
      throw new Error(`Wrong content type, expected ${expectedContentType} but received ${contentType} instead`);
    } else {
      //console.log("contentType is correct I guess");
    }

    return await response.json();
  } catch (error) {
    return { error: error.message };
  }
}

const endpoints = [
  { name: "User 1", url: "https://reqres.in/api/users/1" },
  { name: "User 2", url: "https://reqres.in/api/users/2" },
  { name: "User 99", url: "https://reqres.in/api/users/99" },
  { name: "Invalid API link", url: "https://reqres.in" },
];

endpoints.forEach((endpoint) => {
  const button = document.createElement("button");
  button.textContent = endpoint.name;
  actionsElement.append(button);

  button.addEventListener("click", async () => {
    const result = await fetchUserData(endpoint.url);

    if (result.error) {
      errorElement.textContent = result.error;
      userElement.innerHTML = "No user data available.";
    } else {
      const user = result.data;
      try {
        userElement.innerHTML = `
      <img alt="${user.first_name} ${user.last_name}" src="${user.avatar}" class="user__image"/>
      <h2>${user.first_name} ${user.last_name}</h2>
      `;
        errorElement.textContent = "";
      } catch (error) {
        errorElement.textContent = error;
        userElement.innerHTML = "An error occured";
        userElement.innerHTML = "User data incomplete (see error message).";
      }
    }
  });
});
