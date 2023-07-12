import { category, news_by_category } from "../../assets/news.js";

let current_page = 1;

function passAnimation() {
  const prevSelected = document.querySelector(".selected-category");
  prevSelected.classList.remove("selected-category");
  prevSelected.children[2].style.display = "none";

  if (prevSelected.nextElementSibling === null) {
    document
      .querySelector(".category li:first-child")
      .classList.add("selected-category");
  } else {
    prevSelected.nextElementSibling.classList.add("selected-category");
  }
  document.querySelector(".selected-category").children[2].style.display =
    "flex";
}

function makeCategory() {
  const _ul = document.querySelector(".category");

  category.forEach((item, index) => {
    const _li = document.createElement("li");

    _li.innerHTML = `
      <div style="animation-iteration-count:${news_by_category[item].length}"></div>
      <span class="category-item">${item}</span> 
      <span class="category-num">${current_page}/${news_by_category[item].length}</span>
    `;

    _ul.appendChild(_li);

    // _li.children[0].addEventListener("animationiteration", (e) => {
    //   document.querySelector(".category-num").innerText = `${e.elapsedTime}/81`;
    // });

    _li.children[0].addEventListener("animationend", passAnimation);

    if (index === 0) {
      _li.classList.add("selected-category");
      _li.children[2].style.display = "flex";
    }
  });
}

function handleCategoryClick(e, item) {
  const prevSelected = document.querySelector(".selected-category");
  // category-num 안 보이게
  prevSelected.children[2].style.display = "none";
  prevSelected.classList.remove("selected-category");
  item.classList.add("selected-category");
  item.querySelector(".category-num").style.display = "flex";
  // const news = news_by_category[e.target.innerText];
}

function addEventToCategory() {
  //이전에 selected-category 요소 찾고 있으면 지우고 추가
  const categoryList = document.querySelectorAll(".category li");
  categoryList.forEach((item) => {
    item.addEventListener("click", (e) => handleCategoryClick(e, item));
  });
}

function initListView() {
  makeCategory();
  addEventToCategory();
}
export { initListView };
