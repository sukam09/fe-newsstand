const newsWrapper = document.querySelector(".news-wrapper");
const leftArrow = document.querySelector(".left-arrow");
const rightArrow = document.querySelector(".right-arrow");
const systemDate = document.querySelector(".system-date");

let idList = Array.from({ length: 96 }, (_, idx) =>
  String(idx).padStart(2, "0")
);

const shuffleIdList = (idList) => {
  idList.sort(() => Math.random() - 0.5);
};

const makeGrid = (isLightMode, pageNum) => {
  for (let i = pageNum * 24; i < pageNum * 24 + 24; i++) {
    const gridItem = document.createElement("li");
    const imgSrc = isLightMode
      ? `./img/light-media/img${idList[i]}.png`
      : `./img/dark-media/img${idList[i]}.png`;

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

  // 한자리 숫자 앞에 0을 추가
  if (month < 10) month = "0" + month;
  if (date < 10) date = "0" + date;

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
  makeGrid(true, 3);
}

init();
