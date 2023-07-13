import { PRESS_CNT, PRESS_VIEW_COUNT } from "../constants/constants.js";
const imgIndex = Array(PRESS_CNT)
  .fill()
  .map((arr, i) => i + 1);

const shuffledPress = shuffleImgIndex();

function shuffleImgIndex() {
  return [...imgIndex].sort(() => Math.random() - 0.5);
}

const grid_view = `
    <div class="grid-view">
              <button id="left-btn">
                <img id="left" src="../assets/icons/left-btn.svg" />
              </button>
              <div class="main-list">
                <ul class="main-list-ul"></ul>
              </div>
              <button id="right-btn">
                <img id="right" src="../assets/icons/right-btn.svg" />
              </button>
            </div>
    `;

export function showGridView(page) {
  const view_content = document.querySelector(".view-content");
  view_content.innerHTML = grid_view;
  const main_list_ul = document.querySelector(".main-list-ul");
  main_list_ul.innerHTML = "";
  for (
    let i = PRESS_VIEW_COUNT * (page - 1);
    i < PRESS_VIEW_COUNT * page;
    i++
  ) {
    const li = document.createElement("li");
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      `../assets/images/logo/light/img${shuffledPress[i]}.svg`
    );
    main_list_ul.appendChild(li);
    li.appendChild(img);
  }
}
