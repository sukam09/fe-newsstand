import {
  PRESS_VIEW_COUNT,
  PRESS_LOGO_IMG_PATH,
} from "../constants/constants.js";
import {
  getIndex,
  getPage,
  getSubscribedPress,
  getTabMode,
} from "../core/getter.js";
import { checkPage } from "./checkPage.js";
import { handleSubscribe, showSubscribeButton } from "./subscribePress.js";
import { getData } from "../core/api.js";
const grid_view = `
    <ul class="main-list-ul"></ul>
    `;

function handleEvent(event, img) {
  const li = img.parentNode;
  const button = img.nextElementSibling;
  // const button = document.querySelector("button");
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
          index: _index,
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
  /*
  - sub모드일 때 더이상 없으면 checkpage(true);로 오른쪽 버튼 hidden 처리
  - 1. 시작(getPage()-1) * press view count
  - 2. 만약, 구독한 언론사 길이가 i 보다 작다면 img 노노
  - 3. 그리고 마지막에 checkpage(hidden); 해주기
  //
  - all 모드일 때
  - 2번에서 전체 언론사 갯수를 상수로 일단 잡아봄 
   */

  let list;
  getTabMode() === "all"
    ? (list = getIndex())
    : (list = getSubscribedPress().map((item) => item.index));
  const main_list = document.querySelector(".main-list");
  main_list.innerHTML = grid_view;
  const main_list_ul = document.querySelector(".main-list-ul");
  main_list_ul.innerHTML = "";
  for (
    let i = PRESS_VIEW_COUNT * (getPage() - 1);
    i < PRESS_VIEW_COUNT * getPage();
    i++
  ) {
    const isSubscribed = getSubscribedPress().some(
      (press) => press.index === list[i]
    );
    const li = document.createElement("li");
    let img = document.createElement("img");
    img.setAttribute("class", "logo-img");
    main_list_ul.appendChild(li);
    if (list.length > i) {
      img.setAttribute("src", `${PRESS_LOGO_IMG_PATH}${list[i]}.svg`);
      li.append(img);
      li.innerHTML += showSubscribeButton(isSubscribed);
      img = li.querySelector("img");
      li.addEventListener("mouseover", () => handleEvent("over", img));
      li.addEventListener("mouseout", () => handleEvent("out", img));
      // button.addEventListener("click", () => handleEvent("click", img));
    } else {
      li.style.cursor = "default";
    }
  }
  checkPage(list.length < PRESS_VIEW_COUNT * getPage());
}
