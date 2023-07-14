import { category, news_by_category } from "../../assets/news.js";

const ANIMATION_DURATON = 1.5;

/* 카테고리 생성 및 click 이벤트 등록*/
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

let randomNews;

//start랑 click 됐을 때 random 뉴스
function shuffleNews() {
  const currentCategory = document.querySelector(
    ".selected-category span"
  ).innerText;
  const shuffled = [...news_by_category[currentCategory]].sort(
    () => Math.random() - 0.5
  );
  return shuffled;
}

/* 뉴스 가져오기 */

function getNews(e) {
  changeCurrentPage(e);

  //클릭한 카테고리가 현재와 같다면 새로 뉴스를 가져오고, 애니메이션 새로 시작
  if (e.type === "animationstart" || e.type === "click") {
    randomNews = shuffleNews();
  }

  let currentNews;
  //event가 클릭일 때랑 iteration일 때랑 구분
  if (e.type === "animationiteration") {
    currentNews = randomNews[e.elapsedTime / ANIMATION_DURATON];
  } else {
    currentNews = randomNews[0];
  }

  //press-info
  changePressInfo(currentNews);

  //main news
  changeMain(currentNews);

  //sub news
  changeSub(currentNews);
  console.log(currentNews);
}

function changePressInfo(currentNews) {
  const press_info = document.querySelector(".press-info");
  press_info.children[0].setAttribute("src", `${currentNews.src}`);
  press_info.children[1].innerText = `${currentNews.editDate}`;
}

function changeMain(currentNews) {
  const mainNews = document.querySelector(".list-view-main");
  mainNews.children[0].setAttribute("src", `${currentNews.thumbSrc}`);
  mainNews.children[1].innerText = `${currentNews.headTitle}`;
}

function changeSub(currentNews) {
  const subNews = document.querySelector(".list-view-sub");
  //sub news
  subNews.innerHTML = ``;
  const _ul = document.createElement("ul");
  currentNews.subTitle.forEach((item) => {
    const _li = document.createElement("li");
    _li.innerText = `${item}`;
    _ul.appendChild(_li);
  });
  //copyRight
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

function passAnimation(type, item) {
  //이전 요소 애니메이션 중지
  const prevSelected = document.querySelector(".selected-category");
  // prevCategory = prevSelected.children[1].innerText;
  prevSelected.children[2].style.display = "none";
  prevSelected.classList.remove("selected-category");

  //자동으로 넘어갈 때
  if (type === "Next") {
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
  // 클릭 했을 때
  else if ("Clicked") {
    item.classList.add("selected-category");
    item.querySelector(".category-num").style.display = "flex";
  }
}

function initListView() {
  makeCategory();
  addAniToCategory();
}
export { initListView };
