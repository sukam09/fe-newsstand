import { category, news_by_category } from "../../../../assets/news.js";
import {
  handleAniamtionIteration,
  handleAniamtionStart,
  handleCategoryClick,
} from "./handleEvent.js";
import { currentPage } from "./handlePage.js";

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

/* find */
function findCurrentCategory() {
  return document.querySelector(".selected-category");
}

/* change */
function chageNews(e) {
  const news = getNews(e.currentTarget.dataset.category);
  //press-info
  changePressInfo(news[currentPage]);

  //main news
  changeMain(news[currentPage]);

  //sub news
  changeSub(news[currentPage]);

  //pagenum info
  changePageInfo(e);
}

function changePressInfo(news) {
  const press_info = document.querySelector(".press-info");
  press_info.children[0].setAttribute("src", `${news.src}`);
  press_info.children[1].innerText = `${news.editDate}`;
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
    currentPage + 1
  }/${getPagesNum(e.currentTarget.dataset.category)}`;
}

/* GET */
function getNews(category) {
  return news_by_category[category];
}

function getPagesNum(category) {
  return getNews(category).length;
}

export {
  makeCategory,
  makeRandomNews,
  getPagesNum,
  findCurrentCategory,
  chageNews,
};
