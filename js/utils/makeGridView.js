import {
  PRESS_CNT,
  PRESS_VIEW_COUNT,
  PRESS_LOGO_IMG_PATH,
  ICON_IMG_PATH,
} from "../constants/constants.js";
import { getPage } from "../core/getter.js";
const imgIndex = Array(PRESS_CNT)
  .fill()
  .map((arr, i) => i + 1);

const shuffledPress = shuffleImgIndex();

function shuffleImgIndex() {
  return [...imgIndex].sort(() => Math.random() - 0.5);
}

const grid_view = `
    <ul class="main-list-ul"></ul>
    `;

function handleEvent(event, img, button) {
  const li = img.parentNode;
  if (event === "over") {
    img.style.display = "none";
    button.style.display = "flex";
    li.style.backgroundColor = "var(--surface-alt)";
  } else {
    img.style.display = "block";
    button.style.display = "none";
    li.style.backgroundColor = "var(--surface-default)";
  }
}
export function showGridView() {
  const main_list = document.querySelector(".main-list");
  main_list.innerHTML = grid_view;
  const main_list_ul = document.querySelector(".main-list-ul");
  main_list_ul.innerHTML = "";
  for (
    let i = PRESS_VIEW_COUNT * (getPage() - 1);
    i < PRESS_VIEW_COUNT * getPage();
    i++
  ) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute("class", "logo-img");
    const button = document.createElement("button");
    button.setAttribute("class", "subscribe");
    button.innerHTML = `
    <img src="${ICON_IMG_PATH}plus.svg"/>
    <span>구독하기</span>
  `;
    img.setAttribute("src", `${PRESS_LOGO_IMG_PATH}${shuffledPress[i]}.svg`);
    main_list_ul.appendChild(li);
    li.append(img, button);
    li.addEventListener("mouseover", () => handleEvent("over", img, button));
    li.addEventListener("mouseout", () => handleEvent("out", img, button));
  }
}
