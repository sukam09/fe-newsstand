const newsWrapper = document.querySelector(".news-wrapper");
const systemDate = document.querySelector(".system-date");

let idList = Array.from({ length: 96 }, (_, idx) => idx);
let isLightMode = true;
let pageNum = 0;

const shuffleIdList = (idList) => {
  idList.sort(() => Math.random() - 0.5);
};

const makeGrid = () => {
  for (let i = 0; i < 24; i++) {
    const gridItem = document.createElement("li");
    const imgSrc = isLightMode
      ? `./img/light-media/${idList[i]}.png`
      : `./img/dark-media/${idList[i]}.png`;

    let checkImg = new Image();
    checkImg.src = imgSrc;
    checkImg.onload = function () {
      const img = document.createElement("img");
      img.classList.add(`img${i}`);
      img.src = imgSrc;
      img.style.height = "20px";
      gridItem.appendChild(img);
    };

    newsWrapper.append(gridItem);
  }
};

const changeImgSrc = () => {
  let newImg = idList.slice(pageNum * 24, pageNum * 24 + 24);

  for (let i = 0; i < 24; i++) {
    const $img = document.querySelector(`.img${i}`);
    const imgSrc = isLightMode
      ? `./img/light-media/${newImg[i]}.png`
      : `./img/dark-media/${newImg[i]}.png`;

    let checkImg = new Image();
    checkImg.src = imgSrc;
    checkImg.onload = function () {
      $img.src = imgSrc;
    };
    checkImg.onerror = function () {
      $img.remove();
    };
  }
};

const setArrowVisible = () => {
  const leftArrow = document.querySelector(".left-arrow");
  const rightArrow = document.querySelector(".right-arrow");

  if (pageNum === 0) {
    leftArrow.classList.add("hidden");
  } else if (pageNum > 0 && pageNum < 3) {
    leftArrow.classList.remove("hidden");
    rightArrow.classList.remove("hidden");
  } else if (pageNum === 3) {
    rightArrow.classList.add("hidden");
  }
};

const movePage = (className) => {
  if (className === "left-arrow") {
    pageNum--;
  }
  if (className === "right-arrow") {
    pageNum++;
  }
  changeImgSrc();
  setArrowVisible();
};

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
  let month = today.getMonth() + 1;
  let date = today.getDate();
  let day = today.getDay();

  if (month < 10) month = String(month).padStart(2, "0");
  if (date < 10) date = String(date).padStart(2, "0");

  const saveDate =
    year + ". " + month + ". " + date + ". " + WEEKDAY[Number(day)];

  return saveDate;
};

window.onload = () => {
  const dateItem = document.createElement("p");
  const dateText = document.createTextNode(getSystemDate());
  dateItem.appendChild(dateText);
  systemDate.append(dateItem);
};

/* 로고를 클릭하면 새로고침 */
function reloadPage() {
  location.reload();
}

function init() {
  shuffleIdList(idList);
  setArrowVisible();
  makeGrid();
}

init();
