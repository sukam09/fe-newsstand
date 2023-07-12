import { shuffle } from "../utils/util.js";
import { pressData } from "../fetchAPI.js";

let logoData = await pressData("./data/pressObj.json");

const NEWS_CONTENTS = 96;
const VIEWED_CONTENS = 24;
const FIRST_PAGE = 0;
const LAST_PAGE = 3;
let selectedPage = 0;

const rightBtn = document.querySelector(".newsstand--right-btn");
const leftBtn = document.querySelector(".newsstand--left-btn");

export async function paintGridNewsstand() {
  paintNews();
  pagination();
}

async function paintNews() {
  logoData = shuffle(logoData);
  const ul = document.querySelector(".newsstand-area—six-col-list");
  for (
    let idx = selectedPage * VIEWED_CONTENS;
    idx < selectedPage * VIEWED_CONTENS + VIEWED_CONTENS;
    idx++
  ) {
    const li = document.createElement("li");
    li.className = "newsstand—subscrtion-box";
    const img = document.createElement("img");
    const icon = logoData[idx].lightSrc;
    const alt = logoData[idx].name;
    img.src = icon;
    img.alt = alt;
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
    selectedPage += 1;
    paintNews();
    isBtnDisabled();
  });

  leftBtn.addEventListener("click", (e) => {
    removeChildElement(ul);
    selectedPage -= 1;
    paintNews();
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
