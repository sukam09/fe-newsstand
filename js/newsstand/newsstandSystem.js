import { shuffle } from "../utils/util.js";

const NEWS_CONTENTS = 96;
const VIEWED_CONTENS = 24;
const FIRST_PAGE = 0;
const LAST_PAGE = 3;

let selectedPage = 0;
let newsstandList = Array.from({ length: NEWS_CONTENTS }, () => 1).map(
  (_, index) => `${++index}.png`
);
const rightBtn = document.querySelector(".newsstand--right-btn");
const leftBtn = document.querySelector(".newsstand--left-btn");

export function paintRandomNewsstand() {
  newsstandList = shuffle(newsstandList);

  paintNews();
  pagination();
}

function paintNews() {
  const ul = document.querySelector(".newsstand-area—six-col-list");
  for (
    let idx = selectedPage * VIEWED_CONTENS;
    idx < selectedPage * VIEWED_CONTENS + VIEWED_CONTENS;
    idx++
  ) {
    const li = document.createElement("li");
    li.className = "newsstand—subscrtion-box";
    const img = document.createElement("img");
    const icon = newsstandList[idx];
    img.src = `./assets/newsIcon/light/${icon}`;
    li.appendChild(img);
    ul.appendChild(li);
  }
}

function pagination() {
  const ul = document.querySelector(".newsstand-area—six-col-list");
  const rightBtn = document.querySelector(".newsstand--right-btn");
  const leftBtn = document.querySelector(".newsstand--left-btn");
  rightBtn.addEventListener("click", (e) => {
    removeChildElement(ul);
    paintNews(++selectedPage, newsstandList);
    isBtnDisabled();
  });

  leftBtn.addEventListener("click", (e) => {
    removeChildElement(ul);
    paintNews(--selectedPage, newsstandList);
    isBtnDisabled();
  });
}

function removeChildElement(parent) {
  while (parent.firstChild) {
    parent.firstChild.remove();
  }
}

function isBtnDisabled() {
  selectedPage === FIRST_PAGE
    ? leftBtn.classList.add("btn-disabled")
    : leftBtn.classList.remove("btn-disabled");
  selectedPage === LAST_PAGE
    ? rightBtn.classList.add("btn-disabled")
    : rightBtn.classList.remove("btn-disabled");
}
