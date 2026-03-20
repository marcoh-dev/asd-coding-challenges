console.clear();

const progressBar = document.querySelector('[data-js="progress-bar"]');

function calculateScrollPercentage() {
  const scrollPosition = window.scrollY;
  const viewportHeight = window.innerHeight;
  const pageHeight = document.body.clientHeight;

  console.log(
    "pageHeight:" + pageHeight,
    "viewportHeight:" + viewportHeight,
    "scrollPosition:" + scrollPosition,
  );

  const scrollPercentage =
    (scrollPosition / (pageHeight - viewportHeight)) * 100;
  return Math.round(scrollPercentage * 100) / 100;
}

document.addEventListener("scroll", function (e) {
  progressBar.style.width = calculateScrollPercentage() + "%";
});
