import { fetchPressData } from "../../api.js";
import { GRID_PAGE } from "../../global.js";
import { DoSubScribe, DoUnsubscribe } from "../components/SubscribeBtn.js";
import { SubscribeState } from "../components/SubscribeBtn.js";
import { SUBSCRIBE_VIEW } from "../../global.js";
import { store } from "../../store.js";
import { shuffle_id } from "../utility/Shuffle.js";
let news_icon;

const ICONS_PER_PAGE = 24;

function createSubscribeDiv(li, pressID) {
  if (SubscribeState(pressID)) {
    const UnSubscribeModeDiv = `
    <div class="subscribe-wrap">
      <button class="subscribe-btn">
          <img class="plus-btn" src="../../asset/button/plus.png">
          <span class="subscribe-text available-medium12">해지하기</span>
      </button>
    </div>`;

    li.innerHTML += UnSubscribeModeDiv;
    const SubscribeBtn = li.querySelector(".subscribe-btn");
    DoUnsubscribe(SubscribeBtn, pressID);
  } else {
    const subscribeModeDiv = `
    <div class="subscribe-wrap">
      <button class="subscribe-btn">
          <img class="plus-btn" src="../../asset/button/plus.png">
          <span class="subscribe-text available-medium12">구독하기</span>
      </button>
    </div>`;

    li.innerHTML += subscribeModeDiv;
    const SubscribeBtn = li.querySelector(".subscribe-btn");
    DoSubScribe(SubscribeBtn, pressID);
  }
}

function pressMouseOver(li) {
  const ID = li.getAttribute("data-id");

  const subscribeMode = li.querySelector("div");
  if (!subscribeMode) {
    createSubscribeDiv(li, ID);
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

async function FetchData() {
  news_icon = await fetchPressData("./Data/grid_icon.json");
  if (SUBSCRIBE_VIEW.CURRENT_VIEW) {
    const subscribe_icon_IDs = store.getSubscribe();
    const subscribe_icon_data = [];

    subscribe_icon_IDs.forEach((id) => {
      subscribe_icon_data.push(news_icon[id - 1]);
    });

    news_icon = subscribe_icon_data;
  } else {
    shuffle_id(news_icon);
  }
}

export function updateGrid() {
  try {
    if (news_icon) {
      // FetchData();

      let icon_idx = GRID_PAGE.CURRENT_PAGE * ICONS_PER_PAGE;
      const grid_row = document.querySelectorAll(".grid ul");
      grid_row.forEach((ul) => {
        const grid_li = ul.querySelectorAll("li");
        grid_li.forEach((li) => {
          const press_logo = li.querySelector(".press-logo");
          if (icon_idx < news_icon.length) {
            const ID = news_icon[icon_idx].id;
            li.setAttribute("data-id", ID);
            press_logo.src = news_icon[icon_idx++].path;
          } else {
            li.setAttribute("data-id", null);
            press_logo.src = "";
          }
        });
      });
    } else {
      throw Error("empty data!");
    }
  } catch (e) {
    console.log(e);
  }
}

export async function printGrid() {
  try {
    await FetchData();

    const grid = document.querySelector(".grid");
    grid.innerHTML = ``;

    let icon_idx = GRID_PAGE.CURRENT_PAGE * ICONS_PER_PAGE;

    for (let i = 0; i < 4; i++) {
      const grid_row = document.createElement("ul");
      grid_row.className = "grid-row";
      for (let j = 0; j < 6; j++) {
        const grid_li = document.createElement("li");
        const press_logo = document.createElement("img");
        press_logo.className = "press-logo";

        if (icon_idx < news_icon.length) {
          const ID = news_icon[icon_idx].id;
          grid_li.setAttribute("data-id", ID);
          press_logo.src = news_icon[icon_idx++].path;
          grid_li.addEventListener("mouseenter", pressMouseOver.bind(this, grid_li));
          grid_li.addEventListener("mouseleave", pressMouseOut.bind(this, grid_li));
        }

        grid_li.appendChild(press_logo);
        grid_row.appendChild(grid_li);
      }
      grid.appendChild(grid_row);
    }
    const left_btn = document.querySelector(".left-btn");
    left_btn.style.display = "none";
  } catch (e) {
    console.error(e);
  }
}

export async function printSubscribeGrid() {}
