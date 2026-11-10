console.clear();

const form = document.querySelector('[data-js="form"]');

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(e.target));
  const ageBadnessSum = Number(formData.age) + Number(formData.badness);

  console.log(formData);
  console.log(
    `The age-badness-sum of ${formData.firstName} is ${ageBadnessSum}`,
  );

  e.target.reset();
  e.target["first-name"].focus();
});
