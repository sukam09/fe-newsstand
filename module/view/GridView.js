import { fetchPressData } from "../../api.js";
import { GRID_PAGE } from "../../global.js";

let news_icon;
const ICONS_PER_PAGE = 24;

function createSubscribeDiv(li) {
  const subscribeModeDiv = `
  <div class="subscribe-wrap">

    <button class="subscribe-btn">
        <img class="plus-btn" src="../../asset/button/plus.png">
        <span class="scribe-text available-medium12">구독하기</span>
    </button>
  </div>`;

  li.innerHTML += subscribeModeDiv;
}

function pressMouseOver(li) {
  const subscribeMode = li.querySelector("div");
  if (!subscribeMode) {
    createSubscribeDiv(li);
    const pressLogo = li.querySelector(".press-logo");
    pressLogo.classList.add("hidden");
  }
}
function pressMouseOut(li) {
  const subscribeModeDiv = li.querySelector("div");
  if (subscribeModeDiv) {
    li.removeChild(subscribeModeDiv);
    const pressLogo = li.querySelector(".press-logo");
    pressLogo.classList.remove("hidden");
  }
}

export function updateGrid() {
  try {
    if (news_icon) {
      let icon_idx = GRID_PAGE.CURRENT_PAGE * ICONS_PER_PAGE;
      const grid_row = document.querySelectorAll(".grid ul");
      grid_row.forEach((ul) => {
        const grid_li = ul.querySelectorAll("li");
        grid_li.forEach((li) => {
          const press_logo = li.querySelector(".press-logo");
          press_logo.src = news_icon[icon_idx++].path;
          li.addEventListener("mouseenter", () => pressMouseOver(li));
          li.addEventListener("mouseleave", () => pressMouseOut(li));
        });
      });
    } else {
      throw Error("empty data!");
    }
  } catch (e) {
    console.log(e);
  }
}

export async function printGrid(mode = "") {
  try {
    news_icon = await fetchPressData("./Data/grid_icon.json");
    const grid = document.querySelector(".grid");
    let icon_idx = GRID_PAGE.CURRENT_PAGE * ICONS_PER_PAGE;
    for (let i = 0; i < 4; i++) {
      const grid_row = document.createElement("ul");
      grid_row.className = "grid-row";
      for (let j = 0; j < 6; j++) {
        const grid_li = document.createElement("li");
        const press_logo = document.createElement("img");
        press_logo.className = "press-logo";

        //수정한 부분
        if (news_icon.length > icon_idx) press_logo.src = news_icon[icon_idx++].path;

        grid_li.appendChild(press_logo);
        grid_row.appendChild(grid_li);
      }
      grid.appendChild(grid_row);
    }
    updateGrid();
    const left_btn = document.querySelector(".left-btn");
    left_btn.style.display = "none";
  } catch (e) {
    console.error(e);
  }
}

export async function printSubscribeGrid() {}
