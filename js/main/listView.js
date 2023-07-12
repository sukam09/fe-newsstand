import { category, news_by_category } from "../../assets/news.js";

let current_page = 1;

function makeCategory() {
  const $ul = document.querySelector(".category");
  category.forEach((item, index) => {
    const $li = document.createElement("li");
    $li.innerHTML = `
      <div></div>
      <span class="category-item">${item}</span> 
      <span class="category-num">${current_page}/${news_by_category[item].length}</span>
    `;
    $ul.appendChild($li);
    if (index === 0) {
      $li.classList.add("selected-category");
      $li.children[2].style.display = "flex";
    }
  });
}

function handleCategoryClick(e, item) {
  const prevSelected = document.querySelector(".selected-category");
  prevSelected.children[2].style.display = "none";
  prevSelected.classList.remove("selected-category");
  item.classList.add("selected-category");
  item.querySelector(".category-num").style.display = "flex";

  const news = news_by_category[e.target.innerText];

  // news의 length를 div의 animation-iteration-count,
  item.children[0].style.animationIterationCount = news.length;
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
