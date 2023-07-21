import { findCurrentCategory } from "./handleNewsData.js";

function removeAnimation() {
  const prevSelected = document.querySelector(".selected-category");
  prevSelected.children[2].style.display = "none";
  prevSelected.classList.remove("selected-category");
}

function addAnimation(domObj, to) {
  if (to === "Next" || to === "Prev") {
    removeAnimation();
    if (domObj === null) {
      document
        .querySelector(".category li:first-child")
        .classList.add("selected-category");
      return;
    }
  }
  domObj.classList.add("selected-category");
}

function resetAnimation() {
  //애니메이션 초기화
  const currentCategory = findCurrentCategory();
  currentCategory.classList.remove("selected-category");
  void currentCategory.offsetWidth;
  currentCategory.classList.add("selected-category");
}

export { removeAnimation, addAnimation, resetAnimation };
