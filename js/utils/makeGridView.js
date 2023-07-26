import {
  PRESS_VIEW_COUNT,
  PRESS_LOGO_IMG_PATH,
} from "../constants/constants.js";
import {
  getIndex,
  getPage,
  getSubscribedPress,
  getTabMode,
  getMode,
} from "../core/getter.js";
import { checkPage } from "./checkPage.js";
import { handleSubscribe, showSubscribeButton } from "./subscribePress.js";
import { getData } from "../core/api.js";
const grid_view = `
    <ul class="main-list-ul"></ul>
    `;

function handleEvent(event, img) {
  if (!img) return;
  const li = img.parentNode;
  const button = img.nextElementSibling;
  switch (event) {
    case "over":
      img.style.display = "none";
      button.style.display = "flex";
      li.style.backgroundColor = "var(--surface-alt)";
      break;
    case "out":
      img.style.display = "block";
      button.style.display = "none";
      li.style.backgroundColor = "var(--surface-default)";
      break;
    case "click":
      const pattern = /img(\d+)\.svg/; // 정규식 패턴
      const _index = img.src.match(pattern)[1];
      getPressName(_index).then((pressName) => {
        const press = {
          name: pressName,
          index: Number(_index),
        };
        handleSubscribe(press);
      });
      break;
    default:
      break;
  }
}

async function getPressName(index) {
  const pressList = await getData("press");
  const name = pressList.Press[index - 1].name;
  return name;
}
export function showGridView() {
  let list;
  const subscribedIndex = getSubscribedPress().map((item) => item.index);

  getTabMode() === "all"
    ? (list = getIndex("gridIndex"))
    : (list = subscribedIndex);

  const main_list = document.querySelector(".main-list");
  main_list.innerHTML = grid_view;
  const main_list_ul = document.querySelector(".main-list-ul");
  main_list_ul.innerHTML = "";
  for (
    let i = PRESS_VIEW_COUNT * (getPage() - 1);
    i < PRESS_VIEW_COUNT * getPage();
    i++
  ) {
    const isSubscribed = subscribedIndex.includes(list[i]);
    const li = document.createElement("li");
    let img = document.createElement("img");
    img.setAttribute("class", "logo-img");
    main_list_ul.appendChild(li);
    if (list.length > i) {
      img.setAttribute(
        "src",
        `${PRESS_LOGO_IMG_PATH}${getMode()}/img${list[i]}.svg`
      );
      li.append(img);
      li.innerHTML += showSubscribeButton(isSubscribed);
      img = li.querySelector("img");
      li.addEventListener("mouseover", () => handleEvent("over", img));
      li.addEventListener("mouseout", () => handleEvent("out", img));
      li.addEventListener("click", () => handleEvent("click", img));
    } else {
      li.style.cursor = "default";
    }
  }

  checkPage(list.length <= PRESS_VIEW_COUNT * getPage());
}
