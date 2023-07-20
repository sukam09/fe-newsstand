import { fetchPressData } from "../../api.js";
import { GRID_PAGE } from "../../global.js";
import { EventHandlerRegister } from "../components/SubscribeBtn.js";
import { SubscribeState } from "../components/SubscribeBtn.js";
import { VIEW_MODE, SUBSCRIBE } from "../../global.js";
import { store } from "../../store.js";
import { shuffle_id } from "../utility/Shuffle.js";

let news_icon;
const press_names = [];

const ICONS_PER_PAGE = 24;

function createSubscribeDiv(li, pressID) {
  let SubscribeBtn;
  const isSubscribe = SubscribeState(pressID);
  const UnSubscribeModeDiv = `
  <div class="subscribe-wrap">
    <button class="subscribe-btn">
        <img class="plus-btn" src="../../asset/button/${isSubscribe ? "closed" : "plus"}.png">
        <span class="subscribe-text available-medium12">${isSubscribe ? "해지하기" : "구독하기"}</span>
    </button>
  </div>`;

  li.innerHTML += UnSubscribeModeDiv;
  SubscribeBtn = li.querySelector(".subscribe-btn");
  EventHandlerRegister(SubscribeBtn, pressID, press_names);
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

export async function FetchData() {
  news_icon = await fetchPressData("./Data/grid_icon.json");

  //언론사 이름 저장
  press_names.length = 0;
  news_icon.forEach((press) => {
    press_names.push(press.name);
  });

  if (VIEW_MODE.CURRENT_TAB === SUBSCRIBE) {
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

    const grid = document.querySelector("main");
    grid.className = "grid";
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
