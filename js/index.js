document.documentElement.setAttribute("color-theme", "light");

//변수
const week = ["일", "월", "화", "수", "목", "금", "토"];
const imgIndex = Array(96)
  .fill()
  .map((arr, i) => i);
let main_list_page = 1;

const mainLogo = document.querySelector(".title");
const day = document.querySelector(".date");
const main_list_ul = document.querySelector(".main-list-ul");
const left_btn = document.getElementById("left-btn");
const right_btn = document.getElementById("right-btn");

//함수
function reload() {
  window.location.reload();
}

function makeDate() {
  const date = new Date();
  day.innerHTML = `${date.getFullYear()}. ${String(
    date.getMonth() + 1
  ).padStart(2, 0)}. ${String(date.getDate()).padStart(2, 0)}. ${
    week[date.getDay()]
  }요일`;
}

function shuffleImgIndex() {
  return [...imgIndex].sort(() => Math.random() - 0.5);
}

//todo padstart
function getDateInterval() {
  setInterval(makeDate, 60000);
}

function showMainList() {
  main_list_ul.innerHTML = "";
  for (let i = 24 * (main_list_page - 1); i < 24 * main_list_page; i++) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `../images/lightmode-media/asset ${shuffleImgIndex()[i]} 1.png`
    );
    main_list_ul.appendChild(li);
    li.appendChild(img);
  }
  console.log(main_list_page);
}

function changePage(e) {
  if (e.target.id === "left") {
    main_list_page--;
    showMainList();
    checkPage();
  } else {
    main_list_page++;
    showMainList();
    checkPage();
  }
}
function checkPage() {
  if (main_list_page === 1) left_btn.style.visibility = "hidden";
  else if (main_list_page === 4) right_btn.style.visibility = "hidden";
  else {
    left_btn.style.visibility = "visible";
    right_btn.style.visibility = "visible";
  }
}
//이벤트 리스너
mainLogo.addEventListener("click", reload);
right_btn.addEventListener("click", (e) => changePage(e));
left_btn.addEventListener("click", (e) => changePage(e));

//default
console.log(shuffleImgIndex());
makeDate();
getDateInterval();
showMainList();
checkPage();
