import { category, news_by_category } from "./manipulateNews.js";
import {
  handleAniamtionIteration,
  handleAniamtionStart,
  handleCategoryClick,
} from "./handleCategoryEvent.js";
import { store } from "../../../store.js";
import { checkPressInLocal } from "../../../checkPressInLocal.js";
import { clickSubscribe } from "../../../clickSubscribe.js";

function makeRandomNews() {
  category.forEach((cate) => {
    news_by_category[cate].sort(() => Math.random() - 0.5);
  });
}

function makeCategory() {
  const _ul = document.querySelector(".category");
  category.forEach((item, index) => {
    const _li = document.createElement("li");
    _li.innerHTML = `
       <div></div>
       <span class="category-item">${item}</span> 
       <span class="category-num"></span>
     `;

    _ul.appendChild(_li);

    _li.dataset.category = item;

    _li.addEventListener("click", (e) => handleCategoryClick(e));
    _li.addEventListener("animationstart", (e) => handleAniamtionStart(e));
    _li.addEventListener("animationiteration", (e) =>
      handleAniamtionIteration(e)
    );

    //span 클릭 시 li 클릭으로 처리
    _li.children[1].addEventListener("click", (e) => {
      e.stopPropagation();
      _li.click();
    });

    //default로 첫번째 카테고리
    if (index === 0) {
      _li.classList.add("selected-category");
      _li.children[2].style.display = "flex";
    }
  });
}

/* change */
function chageNews(e) {
  const news = getNews(e.currentTarget.dataset.category);
  //press-info
  changePressInfo(news[store.state.list_page]);

  //main news
  changeMain(news[store.state.list_page]);

  //sub news
  changeSub(news[store.state.list_page]);

  //pagenum info
  changePageInfo(e);
}

function changePressInfo(news) {
  const press_info = document.querySelector(".press-info");
  press_info.children[0].setAttribute("src", `${news.src}`);
  press_info.children[0].setAttribute("data-press", `${news.name}`);
  press_info.children[1].innerText = `${news.editDate}`;

  const _img = press_info.children[2].children[0];
  if (checkPressInLocal(news.name)) {
    _img.setAttribute("src", `../images/icon/Unsubscribe2.svg`);
  } else {
    _img.setAttribute("src", "../images/icon/Subscribe.svg");
  }
}

function changeMain(news) {
  const mainNews = document.querySelector(".list-view-main");
  mainNews.children[0].setAttribute("src", `${news.thumbSrc}`);
  mainNews.children[1].innerText = `${news.headTitle}`;
}

function changeSub(news) {
  const subNews = document.querySelector(".list-view-sub");
  //sub news
  subNews.innerHTML = ``;
  const _ul = document.createElement("ul");
  news.subTitle.forEach((item) => {
    const _li = document.createElement("li");
    _li.innerText = `${item}`;
    _ul.appendChild(_li);
  });

  //copyRight
  const _li_sub = document.createElement("li");
  _li_sub.classList.add("sub-caption");
  _li_sub.innerText = news.copyRight;
  _ul.appendChild(_li_sub);
  subNews.appendChild(_ul);
}

function changePageInfo(e) {
  //e.target => span (class = category-num)
  //e.target.parentElement => li
  e.target.parentElement.children[2].style.display = "flex";
  e.target.parentElement.children[2].innerText = `${
    store.state.list_page + 1
  }/${getPagesNum(e.currentTarget.dataset.category)}`;
}

/* GET */
function getNews(category) {
  return news_by_category[category];
}

function getPagesNum(category) {
  return getNews(category).length;
}

/* find */
function findCurrentCategory() {
  return document.querySelector(".selected-category");
}

/* transform */

function transformMainNews() {
  const mainNews = document.querySelector(".list-view-main");
  mainNews.addEventListener("mouseover", () =>
    handleMouseOverAndOut(mainNews, "over")
  );
  mainNews.addEventListener("mouseout", () =>
    handleMouseOverAndOut(mainNews, "out")
  );
}

/* main news eventlisteners */

function handleMouseOverAndOut(mainNews, type) {
  if (type === "over") {
    mainNews.children[0].style.transform = `scale(1.05)`;
    mainNews.children[1].style.textDecoration = "underline";
  } else {
    mainNews.children[0].style.transform = `scale(1)`;
    mainNews.children[1].style.textDecoration = "none";
  }
}

/* press Info */
function addEventPressInfo() {
  const _img = document.querySelector(".press-info button img");
  _img.addEventListener("click", () => {
    clickSubscribe(
      document.querySelector(".press-info-img").dataset.press,
      "list",
      _img
    );
  });
}

export {
  makeCategory,
  makeRandomNews,
  transformMainNews,
  getPagesNum,
  findCurrentCategory,
  chageNews,
  addEventPressInfo,
};
