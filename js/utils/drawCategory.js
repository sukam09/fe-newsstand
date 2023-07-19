import { showListView } from "./makeListView.js";
import { store } from "../core/store.js";
import { getPage } from "../core/getter.js";

function checkProgress(current) {
  const progress = document.getElementById("play-animation");
  if (progress) {
    progress.addEventListener("animationend", () => {
      const _order = getPage();
      store.setState({ page: _order + 1 });
      showListView(current, "");
    });
  }
}

//all일 때 list는 category, subscribe일 때에는 subscribedPress를 받음
export function drawCategory(current, list, contents) {
  const main_list = document.querySelector(".main-list");
  let list_content = "";
  //카테고리 그리는 부분
  list.forEach((element) => {
    list_content +=
      current === element
        ? `<li class="category selected"><div class="progress-bar" id="play-animation"></div><div class="ctg-wrapper"><span class="ctg">${element}</span><div class="count"><span>${getPage()}</span><span>/</span><span class = "entire">${
            contents.length
          }</span></div></div></li>`
        : `<li class="category"><div class="progress-bar"></div><div class="ctg-wrapper"><span class="ctg">${element}</span></div></li>`;
  });
  main_list.innerHTML = `<div class="field-tab"><ul>${list_content}</ul></div>`;
  document.addEventListener("DOMContentLoaded", checkProgress(current));
}
