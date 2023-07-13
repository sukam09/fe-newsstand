import { category, news_by_category } from "../../assets/news.js";

const ANIMATION_DURATON = 1;

function makeCategory() {
  const _ul = document.querySelector(".category");

  category.forEach((item, index) => {
    const _li = document.createElement("li");

    _li.innerHTML = `
      <div style="animation-iteration-count:${news_by_category[item].length}"></div>
      <span class="category-item">${item}</span> 
      <span class="category-num">1/${news_by_category[item].length}</span>
    `;

    _li.addEventListener("click", (e) => getNews(e));

    _ul.appendChild(_li);

    if (index === 0) {
      _li.classList.add("selected-category");
      _li.children[2].style.display = "flex";
    }
  });
}

function getNews(e) {
  changeCurrentPage(e);
  //현재 카테고리 찾고,
  const currentCategory = document.querySelector(
    ".selected-category span"
  ).innerText;

  //e.elapsedTime === news_by_category[currentCategory][e]인걸로 change
  let currentNews;
  //press-info 변경
  //event가 클릭일 때랑 iteration일 때랑 구분
  if (e.type === "animationiteration") {
    currentNews =
      news_by_category[currentCategory][e.elapsedTime / ANIMATION_DURATON];
  } else {
    currentNews = news_by_category[currentCategory][0];
  }

  const press_info = document.querySelector(".press-info");
  press_info.children[0].setAttribute("src", `${currentNews.src}`);
  press_info.children[1].innerText = `${currentNews.editDate}`;

  //list-view-news변경
  const mainNews = document.querySelector(".list-view-main");
  mainNews.children[0].setAttribute("src", `${currentNews.thumbSrc}`);
  mainNews.children[1].innerText = `${currentNews.headTitle}`;
  const subNews = document.querySelector(".list-view-sub");
  subNews.innerHTML = ``;
  //sub news 추가
  const _ul = document.createElement("ul");
  currentNews.subTitle.forEach((item) => {
    const _li = document.createElement("li");
    _li.innerText = `${item}`;
    _ul.appendChild(_li);
  });
  //copyRight 추가
  const _li_sub = document.createElement("li");
  _li_sub.classList.add("sub-caption");
  _li_sub.innerText = currentNews.copyRight;
  _ul.appendChild(_li_sub);
  subNews.appendChild(_ul);
}

function changeCurrentPage(e) {
  const totalNum = document
    .querySelectorAll(".selected-category span")[1]
    .innerText.split("/")[1];

  document.querySelectorAll(".selected-category span")[1].innerText = `${
    e.elapsedTime / ANIMATION_DURATON + 1
  }/${totalNum}`;
}

/* 애니메이션 */

function addAniToCategory() {
  //이전에 selected-category 요소 찾고 있으면 지우고 추가
  const categoryList = document.querySelectorAll(".category li");
  categoryList.forEach((item) => {
    item.addEventListener("click", () => passAnimation("Clicked", item));
    item.addEventListener("animationend", () => passAnimation("Next", null));
    item.addEventListener("animationiteration", (e) => getNews(e));
    item.addEventListener("animationstart", (e) => getNews(e));
  });
}

function passAnimation(To, item) {
  //이전 요소 애니메이션 중지
  const prevSelected = document.querySelector(".selected-category");
  prevSelected.children[2].style.display = "none";
  prevSelected.classList.remove("selected-category");

  //자동으로 넘어갈 때
  if (To === "Next") {
    if (prevSelected.nextElementSibling === null) {
      document
        .querySelector(".category li:first-child")
        .classList.add("selected-category");
    } else {
      prevSelected.nextElementSibling.classList.add("selected-category");
    }
  }
  // 클릭 했을 때
  else if ("Clicked") {
    item.classList.add("selected-category");
    item.querySelector(".category-num").style.display = "flex";
  }
  document.querySelector(".selected-category").children[2].style.display =
    "flex";
}

function initListView() {
  makeCategory();
  addAniToCategory();
}
export { initListView };
