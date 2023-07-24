import { fetchRollingArticle } from "../../api.js";
console.log("롤링");
const ARTICLE_CHANGE_TIME = 5000;
const ANIMATION_DELAY = 500;
const LEFT_RIGHT_ROLLING_GAP_TIME = 1000;
const ORIGIN_TOP_POSITION = "16.5px";

const news_bar = document.querySelector(".news-bar");
const [leftBar, rightBar] = news_bar.querySelectorAll(".news");
const leftRollingWrap = leftBar.querySelector(".wrap-rolling-news"); //position : absolute;
const rightRollingWrap = rightBar.querySelector(".wrap-rolling-news"); //position : absolute;

let leftArticles, rightArticles;
let IntervalId;

function RollingAnimation(rollingWrap) {
  rollingWrap.style.transition = "top 0.5s"; // 애니메이션
  rollingWrap.style.top = `-${ORIGIN_TOP_POSITION}`; // 5초 후 위로 롤링 (-)
}

function newArticleElement(articles) {
  let RollingHtmlElement = "";
  articles.slice(0, 2).forEach((article) => {
    RollingHtmlElement += `
                <div class="each-news">
                    <span class="press display-bold14">${article.press}</span>
                    <span class="news-title available-medium14">${article.title}</span>
                </div>
              `;
  });

  return RollingHtmlElement;
}

function HoverEventRegister(newsTitleElement) {
  newsTitleElement.addEventListener("mouseover", () => {
    clearInterval(IntervalId);
  });
  newsTitleElement.addEventListener("mouseout", () => {
    DoingRolling(leftArticles, rightArticles);
  });
}

function ChangeArticlesOrder(articles, rollingWrap) {
  const firstArticle = articles.shift(); // 배열 첫번째 요소 삭제 후
  articles.push(firstArticle); //맨 뒤에 붙이기

  // html & top position 리셋
  rollingWrap.innerHTML = newArticleElement(articles);
  rollingWrap.style.top = ORIGIN_TOP_POSITION;
  rollingWrap.style.transition = "unset";
  HoverEventRegister(rollingWrap.querySelector(".news-title"));
}

function DoingRolling(leftArticles, rightArticles) {
  function delay() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  }

  function rolling(wrapElement, articles) {
    return new Promise((resolve) => {
      RollingAnimation(wrapElement);
      setTimeout(() => {
        ChangeArticlesOrder(articles, wrapElement);
        resolve();
      }, ANIMATION_DELAY);
    });
  }

  IntervalId = setInterval(() => {
    rolling(leftRollingWrap, leftArticles)
      .then(delay)
      .then(() => rolling(rightRollingWrap, rightArticles));
  }, ARTICLE_CHANGE_TIME);
}

export async function RollingRender() {
  try {
    const articles = await fetchRollingArticle("./Data/news.json");
    leftArticles = articles.slice(0, 5);
    rightArticles = articles.slice(5, 10);

    leftRollingWrap.innerHTML = newArticleElement(leftArticles);
    rightRollingWrap.innerHTML = newArticleElement(rightArticles);

    DoingRolling(leftArticles, rightArticles);

    // Event Handler setting
    HoverEventRegister(leftRollingWrap.querySelector(".news-title"));
    HoverEventRegister(rightRollingWrap.querySelector(".news-title"));
  } catch (e) {
    console.error(e);
  }
}
