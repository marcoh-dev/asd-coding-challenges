console.clear();

function handleLikeButtonClick(event) {
  const buttonElement = event.target;
  buttonElement.classList.toggle("post__button--liked");
}

const likeButton = document.querySelector('[data-js="like-button"]');
likeButton.addEventListener("click", handleLikeButtonClick);

// Exercise:
// Use document.createElement() and append another social media post to the body.

function createSocialMediaPost() {
  const newPost = document.createElement("article");
  const newPostContent = document.createElement("p");
  const newPostFooter = document.createElement("footer");
  const newPostUsername = document.createElement("span");
  const newPostLikeButton = document.createElement("button");

  newPost.classList.add("post");
  newPostContent.classList.add("post__content");
  newPostFooter.classList.add("post__footer");
  newPostUsername.classList.add("post__username");
  newPostLikeButton.classList.add("post__button");

  newPostContent.textContent =
    "Lorem ipsum dolor, sit amet consectetur adipisicing elit.";
  newPostUsername.textContent = "@username";
  newPostLikeButton.textContent = "♥ Like";

  newPostLikeButton.type = "button";
  newPostLikeButton.dataset.js = "like-button";
  newPostLikeButton.addEventListener("click", handleLikeButtonClick);

  newPostFooter.append(newPostUsername, newPostLikeButton);
  newPost.append(newPostContent, newPostFooter);

  return newPost;
}

document.body.append(createSocialMediaPost());
