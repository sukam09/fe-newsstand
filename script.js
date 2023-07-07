let presses = [];
let grid_page_count = 0;
let grid_view_selected = true;
let date = new Date();
const day = ["일", "월", "화", "수", "목", "금", "토"];

for (let i = 1; i < 97; i++) {
  presses.push({
    id: i,
    src: `${i}.png`,
  });
}

function appendPressInGrid(press) {
  let image = document.createElement("img");
  image.src = `./icons/press_logo/${press.src}`;
  let sub = document.createElement("img");
  image.classList.add("original");
  sub.src = `./icons/Button.svg`;
  sub.classList.add("sub");
  let list = document.createElement("li");
  list.classList.add("press-item");
  list.appendChild(image);
  list.appendChild(sub);
  document.getElementById("press-list").appendChild(list);
}

function initDisplayNone() {
  document.querySelector(".list-selected").style.display = "none";
  document.querySelector(".press-list-section").style.display = "none";
  document.getElementById("grid-prev").style.display = "none";
}

function setDate() {
  document.querySelector(".date").textContent = `${date.getFullYear()}. ${
    date.getMonth() + 1
  }. ${date.getDate()}. ${day[date.getDay()]}요일`;
}

function changeToGrid() {
  document.getElementsByClassName("grid-selected")[0].style.display = "flex";
  document.getElementsByClassName("list-selected")[0].style.display = "none";
  document.getElementsByClassName("press-list-section")[0].style.display =
    "none";
  document.getElementsByClassName("press-grid")[0].style.display = "block";
  grid_view_selected = true;
}

function changeToList() {
  document.getElementsByClassName("grid-selected")[0].style.display = "none";
  document.getElementsByClassName("list-selected")[0].style.display = "flex";
  document.getElementsByClassName("press-list-section")[0].style.display =
    "block";
  document.getElementsByClassName("press-grid")[0].style.display = "none";
  grid_view_selected = false;
}

const shuffle = () => Math.random() - 0.5;
let shuffled_presses = [...presses].sort(shuffle);

document.getElementById("grid-next").addEventListener("click", () => {
  if (grid_page_count + 1 === parseInt(presses.length / 24) - 1) {
    document.getElementById("grid-next").style.display = "none";
  }
  if (grid_page_count + 1 < parseInt(presses.length / 24)) {
    document.getElementById("grid-prev").style.display = "block";
    document.getElementById("press-list").innerHTML = "";
    grid_page_count += 1;
    const slice_shuffled_presses = shuffled_presses.slice(
      grid_page_count * 24,
      (grid_page_count + 1) * 24
    );
    slice_shuffled_presses.forEach((press) => {
      appendPressInGrid(press);
    });
  }
});

document.getElementById("grid-prev").addEventListener("click", () => {
  if (grid_page_count - 1 === 0) {
    document.getElementById("grid-prev").style.display = "none";
  }
  if (grid_page_count - 1 >= 0) {
    document.getElementById("grid-next").style.display = "block";
    document.getElementById("press-list").innerHTML = "";
    grid_page_count -= 1;
    const slice_shuffled_presses = shuffled_presses.slice(
      grid_page_count * 24,
      grid_page_count * 24 + 24
    );
    slice_shuffled_presses.forEach((press) => {
      appendPressInGrid(press);
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  initDisplayNone();
  setDate();
  const slice_shuffled_presses = shuffled_presses.slice(0, 24);
  slice_shuffled_presses.forEach((press) => {
    appendPressInGrid(press);
  });

  var interval = window.setInterval(firstRollingCallback, 5000);
  setTimeout(function () {
    var interval2 = window.setInterval(secondRollingCallback, 5000);
  }, 2000);
});

function firstRollingCallback() {
  //.prev 클래스 삭제
  document.querySelector(".rollingbanner .prev").classList.remove("prev");

  //.current -> .prev
  let current = document.querySelector(".rollingbanner .current");
  current.classList.remove("current");
  current.classList.add("prev");

  //.next -> .current
  let next = document.querySelector(".rollingbanner .next");
  //다음 목록 요소가 널인지 체크
  if (next.nextElementSibling == null) {
    document
      .querySelector(".rollingbanner ul li:first-child")
      .classList.add("next");
  } else {
    //목록 처음 요소를 다음 요소로 선택
    next.nextElementSibling.classList.add("next");
  }
  next.classList.remove("next");
  next.classList.add("current");
}

function secondRollingCallback() {
  //.prev 클래스 삭제
  const prev = document.querySelectorAll(".rollingbanner .prev");
  prev[1].classList.remove("prev");

  //.current -> .prev
  const current = document.querySelectorAll(".rollingbanner .current");
  current[1].classList.remove("current");
  current[1].classList.add("prev");

  //.next -> .current
  const next = document.querySelectorAll(".rollingbanner .next");

  //다음 목록 요소가 널인지 체크
  if (next[1].nextElementSibling == null) {
    document
      .querySelectorAll(".rollingbanner ul li:first-child")[1]
      .classList.add("next");
  } else {
    //목록 처음 요소를 다음 요소로 선택
    next[1].nextElementSibling.classList.add("next");
  }
  next[1].classList.remove("next");
  next[1].classList.add("current");
}

let list_symbol = document.querySelectorAll(".list-symbol");
list_symbol.forEach((symbol) => {
  symbol.addEventListener("click", () => {
    if (grid_view_selected) {
      // grid 상태이면
      changeToList();
    }
  });
});

let grid_symbol = document.querySelectorAll(".grid-symbol");
grid_symbol.forEach((symbol) => {
  symbol.addEventListener("click", () => {
    if (!grid_view_selected) {
      // grid 상태 아니면
      changeToGrid();
    }
  });
});
