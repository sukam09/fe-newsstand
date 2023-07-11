/**
 * 최신 뉴스 불러오기
 */
const getLatestNews = () => {
  fetch("./assets/data/latest-news.json")
    .then((response) => response.json())
    .then((data) => {
      setLatestNews(data.latestNewsLeft, "left");
      setLatestNews(data.latestNewsRight, "right");
    })
    .catch((error) => {
      console.error("최신 뉴스를 불러오는 중에 오류가 발생했습니다.", error);
    });
};

/**
 * 최신 뉴스 Element 생성
 */
const getLatestNewsElement = (news) => {
  const $li = document.createElement("li");
  $li.classList.add("latest_news__li");

  const $h2 = document.createElement("h2");
  $h2.classList.add("latest_news__h2");
  $h2.innerText = news.press;

  const $p = document.createElement("p");
  $p.classList.add("latest_news__p");
  $p.innerText = news.title;

  $li.appendChild($h2);
  $li.appendChild($p);

  return $li;
};

/**
 * 최신 뉴스 Element 설정
 */
const setLatestNews = (latestNews, side) => {
  const newsWrapper = document.querySelector(`.latest_news__wrapper-${side}`);
  const $ul = document.createElement("ul");
  $ul.classList.add("rolling__wrapper");
  newsWrapper.appendChild($ul);

  latestNews.forEach((news) => {
    const $li = getLatestNewsElement(news);
    $ul.appendChild($li);
  });

  addRolling(side);
  startRolling(side);
};

/**
 * 최신 뉴스 롤링 추가
 */
const addRolling = (side) => {
  const rollingWrapper = document.querySelector(
    `.latest_news__wrapper-${side} .rolling__wrapper`
  );
  const liElements = rollingWrapper.querySelectorAll("li");

  liElements[0].classList.add("prev");
  liElements[1].classList.add("current");
  liElements[2].classList.add("next");
};

/**
 * 최신 뉴스 롤링 설정
 */
const setRolling = (side) => {
  setRollingPrev(side);
  setRollingCurrent(side);
  setRollingNext(side);
};

const setRollingPrev = (side) => {
  const prev = document.querySelector(`.latest_news__wrapper-${side} .prev`);
  prev.classList.remove("prev");
};

const setRollingCurrent = (side) => {
  const current = document.querySelector(
    `.latest_news__wrapper-${side} .current`
  );
  current.classList.remove("current");
  current.classList.add("prev");
};

const setRollingNext = (side) => {
  const next = document.querySelector(`.latest_news__wrapper-${side} .next`);
  if (next.nextElementSibling === null) {
    document
      .querySelector(`.latest_news__wrapper-${side} li:first-child`)
      .classList.add("next");
  }
  if (next.nextElementSibling !== null) {
    next.nextElementSibling.classList.add("next");
  }
  next.classList.remove("next");
  next.classList.add("current");
};

/**
 *  테스트 중
 */

window.addEventListener("load", () => {
  console.log("test");

  document
    .querySelectorAll(`.latest_news__wrapper-left .latest_news__h2`)
    .addEventListener("mouseover", () => {
      console.log("올렸다");
      window.clearInterval(interval);
    });
  document
    .querySelector(`.latest_news__wrapper-${side}`)
    .addEventListener("mouseout", () => {
      startInterval(interval, side);
    });
});

const startRolling = (side) => {
  let interval;

  //   document.addEventListener("DOMContentLoaded", () => {
  //     console.log("test");

  //     document
  //       .querySelector(`.latest_news__wrapper-${side} .current`)
  //       .addEventListener("mouseover", () => {
  //         console.log("올렸다");
  //         window.clearInterval(interval);
  //       });
  //     document
  //       .querySelector(`.latest_news__wrapper-${side}`)
  //       .addEventListener("mouseout", () => {
  //         startInterval(interval, side);
  //       });
  //   });

  if (side === "right") setTimeout(startInterval, 1000, interval, side);
  if (side === "left") startInterval(interval, side);
};

const startInterval = (interval, side) => {
  interval = window.setInterval(setRolling, 5000, side);
};

const stopInterval = (interval) => {
  window.clearInterval(interval);
  setTimeout(startInterval, 1000); // 1초 후에 다시 setInterval 시작
};

export { getLatestNews };
