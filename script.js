const newsWrapper = document.querySelector(".news-wrapper");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");

const makeGrid = (isLightMode, pageNum) => {
  for (let i = pageNum * 24; i < pageNum * 24 + 24; i++) {
    const gridItem = document.createElement("li");
    const imgSrc = isLightMode
      ? `./img/light-media/img${String(i).padStart(2, "0")}.png`
      : `./img/dark-media/img${String(i).padStart(2, "0")}.png`;

    let checkImg = new Image();
    checkImg.src = imgSrc;
    checkImg.onload = function () {
      const img = document.createElement("img");
      img.src = imgSrc;
      gridItem.appendChild(img);
    };

    newsWrapper.append(gridItem);
  }
};

const movePrevPage = (page) => {};

const systemDate = document.querySelector(".system-date");

/* 시스템 날짜로 표시하기 */
const getSystemDate = () => {
  const WEEKDAY = [
    "일요일",
    "월요일",
    "화요일",
    "수요일",
    "목요일",
    "금요일",
    "토요일",
  ];
  let today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth() + 1; // 월은 0부터 시작
  let date = today.getDate();
  let day = today.getDay();

  // 한자리 숫자 앞에 0을 추가
  if (month < 10) {
    month = "0" + month;
  }
  if (date < 10) {
    date = "0" + date;
  }

  const saveDate =
    year + ". " + month + ". " + date + ". " + WEEKDAY[Number(day)];

  return saveDate;
};

window.onload = function () {
  const dateItem = document.createElement("p");
  const dateText = document.createTextNode(getSystemDate());
  dateItem.appendChild(dateText);
  systemDate.append(dateItem);
};

function init() {
  makeGrid(true, 3);
}

init();
