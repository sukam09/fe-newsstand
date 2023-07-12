import { category, news_by_category } from "../assets/news.js";

let now_category = "종합/경제";

const total_pages = {};
let page_count = {};
category.forEach(item => {
  total_pages[item] = news_by_category[item].length;
  page_count[item] = 0;
});

function getNews(category) {
  return news_by_category[category];
}

function drawArrow() {
  console.log(page_count[now_category], total_pages[now_category]);
  if (page_count[now_category] === total_pages[now_category] - 1) {
    document.querySelector(".right-btn").classList.add("hidden");
    document.querySelector(".left-btn").classList.remove("hidden");
  } else if (page_count[now_category] === 0) {
    document.querySelector(".left-btn").classList.add("hidden");
    document.querySelector(".right-btn").classList.remove("hidden");
  } else {
    document.querySelector(".right-btn").classList.remove("hidden");
    document.querySelector(".left-btn").classList.remove("hidden");
  }
}

function drawNews(category, page) {
  const news = getNews(category);
  document.querySelector(".press-brandmark").src = news[page].src;
  document.querySelector(".edit-date").textContent = news[page].editDate;
  document.querySelector(".thumbnail").src = news[page].thumbSrc;
  document.querySelector(".news-main .font-init").textContent = news[page].headTitle;
  const subList = document.querySelector(".news-sub-list");
  subList.innerHTML = "";
  news[page].subTitle.forEach(subnews => {
    const $li = document.createElement("li");
    $li.innerText = subnews;

    subList.append($li);
  });
  const caption = document.createElement("li");
  caption.classList.add("caption");
  caption.innerText = `${news[page].name} 언론사에서 직접 편집한 뉴스입니다.`;
  subList.append(caption);
}

function restartAnimation() {
  const $animation = document.querySelector(".progress-bar");
  $animation.classList.remove("progress-bar");
  void $animation.offsetWidth; // Reflow를 유발하여 애니메이션 재시작을 위한 트리거
  $animation.classList.add("progress-bar");
}

function clickListRightBtn(category) {
  if (page_count[category] + 1 === total_pages[category] - 1) {
    page_count[category] += 1;
    drawNews(category, page_count[category]);
    document.querySelector(".right-btn").classList.add("hidden");
  } else {
    page_count[category] += 1;
    drawNews(category, page_count[category]);
  }
  document.querySelector(".left-btn").classList.remove("hidden");
  restartAnimation();
  setNowCount();
}

function clickListLeftBtn(category) {
  if (page_count[category] - 1 === -1) {
    return;
  } else if (page_count[category] - 1 === 0) {
    page_count[category] -= 1;
    drawNews(category, page_count[category]);
    document.querySelector(".left-btn").classList.add("hidden");
  } else {
    page_count[category] -= 1;
    drawNews(category, page_count[category]);
  }
  document.querySelector(".right-btn").classList.remove("hidden");
  restartAnimation();
  setNowCount();
}

function clickCategory(target) {
  if (now_category === target.firstElementChild.textContent.trim()) {
    return;
  }
  page_count[target.firstElementChild.innerText.trim()] = 0;
  now_category = target.querySelector(".nav-item").innerText.trim();
  document.querySelector(".right-btn").classList.remove("hidden");
  document.querySelector(".left-btn").classList.add("hidden");
  document.querySelector(".progress-bar").classList.remove("progress-bar");
  target.classList.add("progress-bar");
  document.querySelector(".progress-bar").addEventListener("animationiteration", nextNewsWhenProgressEnd);
  document.querySelector(".count").remove();
  setCount(document.querySelector(".progress-bar"));
  drawNews(now_category, page_count[now_category]);
}

function initCategoryClass() {
  const categories = document.querySelectorAll(".list-nav li");
  categories.forEach(category => category.addEventListener("click", e => clickCategory(e.target)));
  document.querySelector(".progress-bar").insertAdjacentHTML(
    "beforeend",
    `
  <div class="count font-init"><span class="now-count">${page_count[now_category] + 1}</span> <span>/</span><span class="total-count">${
      total_pages[now_category]
    }</span></div>
  `,
  );

  document.querySelector(".progress-bar").addEventListener("animationiteration", nextNewsWhenProgressEnd);
}

function setCount(target) {
  target.insertAdjacentHTML(
    "beforeend",
    `
  <div class="count font-init"><span class="now-count">${page_count[now_category] + 1}</span> <span>/</span><span class="total-count">${
      total_pages[now_category]
    }</span></div>
  `,
  );
}

function nextNewsWhenProgressEnd() {
  if (page_count[now_category] === total_pages[now_category] - 1) {
    page_count[now_category] = 0;
    document.querySelector(".progress-bar").removeEventListener("animationiteration", console.log("erase!"));
    now_category = category[category.indexOf(now_category) + 1];
    removeProgressStatus();
    document.querySelectorAll(".nav-item").forEach(nav => {
      if (nav.textContent === now_category) {
        nav.parentElement.classList.add("progress-bar");
        setCount(nav.parentElement);
        nav.parentElement.addEventListener("animationiteration", nextNewsWhenProgressEnd);
      }
    });
    drawNews(now_category, page_count[now_category]);
    setNowCount();
    drawArrow();
  } else {
    page_count[now_category] += 1;
    drawNews(now_category, page_count[now_category]);
    setNowCount();
    drawArrow();
  }
}

function removeProgressStatus() {
  document.querySelector(".progress-bar").classList.remove("progress-bar");
  document.querySelector(".count").remove();
}

function setNowCount() {
  document.querySelector(".now-count").textContent = page_count[now_category] + 1;
}

export { now_category, drawNews, clickListRightBtn, clickListLeftBtn, clickCategory, initCategoryClass };
