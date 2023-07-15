import { category, news_by_category } from "../../assets/news.js";

let currentPage = 0;

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

/* handleCategoryClick */
function handleCategoryClick(e) {
  currentPage = 0;
  removeAnimation();
  addAnimation(e.target, "Current");
}

function removeAnimation() {
  const prevSelected = document.querySelector(".selected-category");
  prevSelected.children[2].style.display = "none";
  prevSelected.classList.remove("selected-category");
}

function addAnimation(domObj, to) {
  if (to === "Next") {
    removeAnimation();
    if (domObj === null) {
      document
        .querySelector(".category li:first-child")
        .classList.add("selected-category");
    } else {
      domObj.classList.add("selected-category");
    }
  } else if (to === "Prev") {
    removeAnimation();
    domObj.classList.add("selected-category");
  } else if (to === "Current") {
    domObj.classList.add("selected-category");
  }
}

/* handleAniamtionStart */
function handleAniamtionStart(e) {
  chageNews(e);
}

/* handleAniamtionIteration */
function handleAniamtionIteration(e) {
  const totalPageNum = getPagesNum(e);
  if (currentPage + 1 < totalPageNum) {
    currentPage += 1;
    chageNews(e);
  }
  //다음 카테고리로 넘어갈 때
  else {
    currentPage = 0;
    addAnimation(e.target.parentElement.nextElementSibling, "Next");
  }
  //currentPage > totalNum => passAnimation
}

/* change */
function chageNews(e) {
  const news = getNews(e);
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
  }/${getPagesNum(e)}`;
}

/* GET */
function getNews(e) {
  return news_by_category[e.currentTarget.dataset.category];
}

function getPagesNum(e) {
  return getNews(e).length;
}

function addEventToBtn() {
  const left_btn = document.getElementById("list-left-btn");
  const right_btn = document.getElementById("list-right-btn");

  left_btn.addEventListener("click", () => handleBtnClick("Left"));
  right_btn.addEventListener("click", () => handleBtnClick("Right"));
}

function handleBtnClick(type) {
  //애니메이션 초기화
  const currentCategory = document.querySelector(".selected-category");
  currentCategory.classList.remove("selected-category");
  void currentCategory.offsetWidth;
  currentCategory.classList.add("selected-category");

  //depend on btn type
  //currentPage는 0부터 시작
  if (type === "Left") {
    //이전 카테고리로 넘어갈 때
    //첫번째 카테고리 1page에서 마지막 카테고리로
    if (currentPage - 1 < 0) {
      let prevCategory;
      if (currentCategory.previousElementSibling === null) {
        prevCategory = document.querySelector(".category li:last-child");
      } else {
        prevCategory = currentCategory.previousElementSibling;
      }

      const prevMaxPage = news_by_category[prevCategory.innerText].length;
      currentPage = prevMaxPage - 1;
      addAnimation(prevCategory, "Prev");
    } else {
      currentPage -= 1;
    }
  } else if (type === "Right") {
    const maxPage = currentCategory.children[2].innerText.split("/")[1];
    //다음 카테고리로 넘어갈 때
    if (currentPage + 1 >= maxPage) {
      currentPage = 0;
      addAnimation(currentCategory.nextElementSibling, "Next");
    } else {
      currentPage += 1;
    }
  }
}

function getClickedCategory(e) {
  // if (e.target.tagName !== "LI") {
  //   return e.target.innerText;
  // } else {
  //   return e.target.id;
  // }
  return e.target.innerText;
}
// let randomNews;
// let currentPage = 0;
// let isBtnClick = false;

/* 카테고리 생성 및 click 이벤트 등록*/
// function makeCategory() {
//   const _ul = document.querySelector(".category");

//   category.forEach((item, index) => {
//     const _li = document.createElement("li");

//     _li.innerHTML = `
//       <div style="animation-iteration-count:${news_by_category[item].length}"></div>
//       <span class="category-item">${item}</span>
//       <span class="category-num">1/${news_by_category[item].length}</span>
//     `;

//     _li.addEventListener("click", (e) => getNews(e));

//     _ul.appendChild(_li);

//     if (index === 0) {
//       _li.classList.add("selected-category");
//       _li.children[2].style.display = "flex";
//     }
//   });
// }

// //start랑 click 됐을 때 random 뉴스
// function shuffleNews() {
//   let currentCategory = document.querySelector(
//     ".selected-category span"
//   ).innerText;
//   const shuffled = [...news_by_category[currentCategory]].sort(
//     () => Math.random() - 0.5
//   );
//   return shuffled;
// }

// /* 뉴스 가져오기 */

// function getNews(e) {
//   changeCurrentPage(e);
//   let currentNews;

//   //버튼 클릭할 때랑 자동으로 넘어갈 때
//   if (e.type === "animationiteration" || e.type === "click") {
//     currentNews = randomNews[currentPage];
//   }
//   // 처음 시작할 때,  todo : but isBtnClick에 따라 cyrrentNews
//   else {
//     if (isBtnClick) {
//       currentNews = randomNews[currentPage];
//     } else {
//       currentNews = randomNews[0];
//     }
//   }
//   //press-info
//   changePressInfo(currentNews);

//   //main news
//   changeMain(currentNews);

//   //sub news
//   changeSub(currentNews);

//   if (e.type === "animationiteration" || e.type === "animationstart")
//     currentPage += 1;
// }

// function changePressInfo(currentNews) {
//   const press_info = document.querySelector(".press-info");
//   press_info.children[0].setAttribute("src", `${currentNews.src}`);
//   press_info.children[1].innerText = `${currentNews.editDate}`;
// }

// function changeMain(currentNews) {
//   const mainNews = document.querySelector(".list-view-main");
//   mainNews.children[0].setAttribute("src", `${currentNews.thumbSrc}`);
//   mainNews.children[1].innerText = `${currentNews.headTitle}`;
// }

// function changeSub(currentNews) {
//   const subNews = document.querySelector(".list-view-sub");
//   //sub news
//   subNews.innerHTML = ``;
//   const _ul = document.createElement("ul");
//   currentNews.subTitle.forEach((item) => {
//     const _li = document.createElement("li");
//     _li.innerText = `${item}`;
//     _ul.appendChild(_li);
//   });
//   //copyRight
//   const _li_sub = document.createElement("li");
//   _li_sub.classList.add("sub-caption");
//   _li_sub.innerText = currentNews.copyRight;
//   _ul.appendChild(_li_sub);
//   subNews.appendChild(_ul);
// }

// function changeCurrentPage(e) {
//   const totalNum = document
//     .querySelectorAll(".selected-category span")[1]
//     .innerText.split("/")[1];

//   document.querySelectorAll(".selected-category span")[1].innerText = `${
//     // e.elapsedTime / ANIMATION_DURATON + 1
//     currentPage + 1
//   }/${totalNum}`;
// }

// /* 애니메이션 */

// function addAniToCategory() {
//   //이전에 selected-category 요소 찾고 있으면 지우고 추가
//   const categoryList = document.querySelectorAll(".category li");
//   categoryList.forEach((item) => {
//     item.addEventListener("click", () => passAnimation("Clicked", item));
//     item.addEventListener("animationend", () => passAnimation("Next", null));
//     item.addEventListener("animationiteration", (e) => getNews(e));
//     item.addEventListener("animationstart", (e) => handleAniStart(e));
//   });
// }

// function handleAniStart(e) {
//   if (!isBtnClick) {
//     currentPage = 0;
//     randomNews = shuffleNews();
//   }

//   getNews(e);
//   isBtnClick = false;
// }

// function passAnimation(type, item) {
//   //이전 요소 애니메이션 중지
//   const prevSelected = document.querySelector(".selected-category");
//   prevSelected.children[2].style.display = "none";
//   prevSelected.classList.remove("selected-category");

//   //자동으로 넘어갈 때
//   if (type === "Next") {
//     if (prevSelected.nextElementSibling === null) {
//       document
//         .querySelector(".category li:first-child")
//         .classList.add("selected-category");
//     } else {
//       prevSelected.nextElementSibling.classList.add("selected-category");
//     }
//     document.querySelector(".selected-category").children[2].style.display =
//       "flex";
//   } else if (type === "Prev") {
//     if (prevSelected.previousElementSibling === null) {
//       document
//         .querySelector(".category li:last-child")
//         .classList.add("selected-category");
//     } else {
//       prevSelected.previousElementSibling.classList.add("selected-category");
//     }
//   }

//   // 클릭 했을 때
//   else if ("Clicked") {
//     item.classList.add("selected-category");
//     //클릭요소 카테고리 iteration 초기화
//     item.style.animationIterationCount =
//       news_by_category[item.children[1].innerText].length;

//     item.querySelector(".category-num").style.display = "flex";
//   }
// }

// /* 버튼 */
// const right_btn = document.getElementById("list-right-btn");
// const left_btn = document.getElementById("list-left-btn");

// right_btn.addEventListener("click", (e) => handleBtnClick(e, "right"));
// left_btn.addEventListener("click", (e) => handleBtnClick(e, "left"));

// function handleBtnClick(e, type) {
//   const _div = document.querySelector(".selected-category div");
//   let leftedCount;
//   //오른쪽
//   if (type === "right") {
//     if (
//       currentPage + 1 >
//       news_by_category[
//         document.querySelector(".selected-category span").innerText
//       ].length
//     ) {
//       passAnimation("Next", null);
//     }
//     leftedCount = _div.style.animationIterationCount - 1;
//   }
//   //왼쪽
//   else {
//     if (currentPage - 1 < 1) {
//       //이전 카테고리한테 애니메이션 pass
//       passAnimation("Prev", null);
//     }
//     currentPage -= 2;
//     leftedCount = _div.style.animationIterationCount + 1;
//   }
//   getNews(e);
//   const selectedCategory = document.querySelector(".selected-category");

//   //애니메이션 초기화
//   selectedCategory.classList.remove("selected-category");
//   void selectedCategory.offsetWidth;
//   isBtnClick = true;
//   selectedCategory.classList.add("selected-category");

//   selectedCategory.children[0].style.animationIterationCount = leftedCount;
// }

function initListView() {
  makeRandomNews();
  makeCategory();
  addEventToBtn();
}

export { initListView };
