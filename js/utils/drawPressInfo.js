import { store } from "../core/store.js";
import { ICON_IMG_PATH, SNACKBAR_WAIT_TIME } from "../constants/constants.js";
import { getPage, getSubscribedPress } from "../core/getter.js";
import { handleSubscribe, showSubscribeButton } from "./subscribePress.js";

// function handleAnimationEnd() {
//   const main_list = document.querySelector(".main-list");
//   setTimeout(() => {
//     main_list.innerHTML = ""; //TODO 내가 구독한 언론사 탭으로 이동
//   }, SNACKBAR_WAIT_TIME);
// }

export function drawPressInfo(list_content) {
  const press_news = document.querySelector(".press-news");
  const isSubscribed = getSubscribedPress().some(
    (press) => press.name === list_content[getPage() - 1].name
  );

  const button = showSubscribeButton(isSubscribed);
  press_news.innerHTML = `<div class="press-info">
    <img
      id="press-logo"
      alt="press-logo"
      src="${list_content[getPage() - 1].src}"
    />
    <span class="edit-date">${list_content[getPage() - 1].edit_date} 편집</span>
    <div class="sub">${button}</div>
  </div>`;
  const newDiv = document.createElement("div");
  newDiv.classList.add("news-content");
  press_news.appendChild(newDiv);
  const sub_btn = document.querySelector(".press-info .sub");
  sub_btn.addEventListener("click", (e) => {
    handleSubscribe(list_content[getPage() - 1]);
  });
}
