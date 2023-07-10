//새로 고침
function ReloadWrapper() {
  const mainLogo = document.querySelector(".title");
  function reload() {
    window.location.reload();
  }
  mainLogo.addEventListener("click", reload);
}

//날짜 생성
function DateWrapper() {
  const week = ["일", "월", "화", "수", "목", "금", "토"];
  const day = document.querySelector(".date");

  function makeDate() {
    const date = new Date();
    day.innerHTML = `${date.getFullYear()}. ${String(
      date.getMonth() + 1
    ).padStart(2, 0)}. ${String(date.getDate()).padStart(2, 0)}. ${
      week[date.getDay()]
    }요일`;
  }

  function getDateInterval() {
    setInterval(makeDate, 60000);
  }
  makeDate();
  getDateInterval();
}

// 랜덤 그리드 && 버튼
function GridWrapper() {
  const PRESS_NUM = 96;
  const GRID_NUM = 24;
  const MIN_PAGE = 1;
  const MAX_PAGE = 4;

  let main_list_page = MIN_PAGE;
  const main_list_ul = document.querySelector(".main-list-ul");
  const left_btn = document.getElementById("left-btn");
  const right_btn = document.getElementById("right-btn");

  const imgIndex = Array(PRESS_NUM)
    .fill()
    .map((arr, i) => i);

  function shuffleImgIndex() {
    return [...imgIndex].sort(() => Math.random() - 0.5);
  }
  const shuffledPress = shuffleImgIndex();

  function showMainList() {
    main_list_ul.innerHTML = "";
    for (
      let i = GRID_NUM * (main_list_page - 1);
      i < GRID_NUM * main_list_page;
      i++
    ) {
      const li = document.createElement("li");
      const img = document.createElement("img");
      img.setAttribute(
        "src",
        `../images/lightmode-media/asset ${shuffledPress[i]} 1.png`
      );
      main_list_ul.appendChild(li);
      li.appendChild(img);
    }
  }
  function changePage(e) {
    if (e.target.id === "left") {
      main_list_page--;
    } else {
      main_list_page++;
    }
    showMainList();
    checkPage();
  }

  function checkPage() {
    if (main_list_page === MIN_PAGE) left_btn.style.visibility = "hidden";
    else if (main_list_page === MAX_PAGE) right_btn.style.visibility = "hidden";
    else {
      left_btn.style.visibility = "visible";
      right_btn.style.visibility = "visible";
    }
  }

  right_btn.addEventListener("click", (e) => changePage(e));
  left_btn.addEventListener("click", (e) => changePage(e));
  showMainList();
  checkPage();
}

//롤링 뉴스바
let leftInterval, rightInterval;
function addEvent() {
  const newsList = document.querySelectorAll(".auto-rolling-news ul li");
  newsList.forEach((news) => {
    // 왼쪽, 오른쪽 뉴스 롤링 바 구분
    if (news.parentElement.id === "left-rolling") {
      news.addEventListener("mouseover", () => {
        clearInterval(leftInterval);
      });
      news.addEventListener("mouseout", () => {
        leftInterval = setInterval(rollingNewsBarLeft, 5000);
      });
    } else {
      news.addEventListener("mouseover", () => {
        clearInterval(rightInterval);
      });
      news.addEventListener("mouseout", () => {
        rightInterval = setInterval(rollingNewsBarRight, 5000);
      });
    }
  });
}
function rollingNewsBarLeft() {
  document.querySelector(".prev").classList.remove("prev");

  const current = document.querySelector(".current");
  current.classList.remove("current");
  current.classList.add("prev");

  const next = document.querySelector(".next");
  //마지막 요소 check
  if (next.nextElementSibling === null) {
    document
      .querySelector(".auto-rolling-news ul li:first-child")
      .classList.add("next");
  } else {
    next.nextElementSibling.classList.add("next");
  }
  next.classList.remove("next");
  next.classList.add("current");
}

function rollingNewsBarRight() {
  document.querySelectorAll(".prev")[1].classList.remove("prev");

  const current = document.querySelectorAll(".current")[1];
  current.classList.remove("current");
  current.classList.add("prev");

  const next = document.querySelectorAll(".next")[1];
  //마지막 요소 check
  if (next.nextElementSibling === null) {
    document
      .querySelectorAll(".auto-rolling-news ul li:first-child")[1]
      .classList.add("next");
  } else {
    next.nextElementSibling.classList.add("next");
  }
  next.classList.remove("next");
  next.classList.add("current");
}

//뷰 타입 변경
const view_type = document.querySelectorAll(".viewer-btn button");
view_type[0].addEventListener("click", () => {
  view_type[0].innerHTML = `<img
  src="../images/icon/List-view-checked.svg"
  alt="images"
/>`;
  view_type[1].innerHTML = `<img
  src="../images/icon/Grid-view-unchecked.svg"
  alt="images"
/>`;
});
view_type[1].addEventListener("click", () => {
  view_type[0].innerHTML = `<img
  src="../images/icon/List-view-unchecked.svg"
  alt="images"
/>`;
  view_type[1].innerHTML = `<img
  src="../images/icon/Grid-view-checked.svg"
  alt="images"
/>`;
});

window.addEventListener("DOMContentLoaded", () => {
  document.documentElement.setAttribute("color-theme", "light");
  ReloadWrapper();
  DateWrapper();
  GridWrapper();
  addEvent();
  leftInterval = setInterval(rollingNewsBarLeft, 5000);
  setTimeout(() => {
    rightInterval = setInterval(rollingNewsBarRight, 5000);
  }, 1000);
});
