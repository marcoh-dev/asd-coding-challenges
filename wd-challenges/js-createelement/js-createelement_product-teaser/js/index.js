console.clear();

const name = "Queen angelfish";
const description =
  "With their bright colors and deep, laterally compressed bodies, marine angelfishes are some of the more conspicuous residents of the aquarium. The queen angelfish grows to be 45 cm. With neon blue and yellow scales and iridescent purple and orange markings, surprisingly it is not conspicuous, and actually hides very well, and is very shy.";
const category1 = "Freshwater";
const category2 = "Large aquarium";
const category3 = "Plankton Diet";
const categories = [category1, category2, category3];
const price = "149,99 €";
const imageSrc =
  "https://unsplash.com/photos/3VOTHTrE614/download?ixid=MnwxMjA3fDB8MXxhbGx8fHx8fHx8fHwxNjU5NTM3NTA2&force=true&w=640";

function createProductTeaser(
  productName,
  productDescription,
  productCategories,
  productPrice,
  productImageSrc,
) {
  const newProduct = document.createElement("article");
  const newProductBody = document.createElement("section");
  const newProductTextContainer = document.createElement("div");
  const newProductName = document.createElement("h2");
  const newProductCategories = document.createElement("ul");
  const newProductDescription = document.createElement("p");
  const newProductImageContainer = document.createElement("div");
  const newProductImage = document.createElement("img");
  const newProductFooter = document.createElement("footer");
  const newProductPrice = document.createElement("span");
  const newProductBuyButton = document.createElement("button");

  newProduct.classList.add("product");
  newProductBody.classList.add("product__body");
  newProductTextContainer.classList.add("product__text-container");
  newProductName.classList.add("product__name");
  newProductCategories.classList.add("product__categories");
  newProductDescription.classList.add("product__description");
  newProductImageContainer.classList.add("product__image-container");
  newProductImage.classList.add("product__image");
  newProductFooter.classList.add("product__footer");
  newProductPrice.classList.add("product__price");
  newProductBuyButton.classList.add("product__buy-button");

  newProductName.textContent = productName;
  newProductDescription.textContent = productDescription;
  newProductPrice.textContent = productPrice;
  newProductBuyButton.textContent = "Buy";

  newProductImage.src = productImageSrc;
  newProductImage.alt = "";
  newProductBuyButton.type = "button";

  for (let i = 0; i < productCategories.length; i++) {
    const newProductCategory = document.createElement("li");
    newProductCategory.classList.add("product__category");
    newProductCategory.textContent = productCategories[i];
    newProductCategories.append(newProductCategory);
  }

  newProductTextContainer.append(
    newProductName,
    newProductCategories,
    newProductDescription,
  );
  newProductImageContainer.append(newProductImage);
  newProductBody.append(newProductTextContainer, newProductImageContainer);
  newProductFooter.append(newProductPrice, newProductBuyButton);
  newProduct.append(newProductBody, newProductFooter);

  return newProduct;
}

document.body.append(
  createProductTeaser(name, description, categories, price, imageSrc),
);
