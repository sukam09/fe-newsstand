import { getSubscribedPress } from "../core/getter.js";
import { store } from "../core/store.js";
import { ICON_IMG_PATH } from "../constants/constants.js";
import { showListView } from "./makeListView.js";

export function showSubscribeButton(isSubscribed) {
  return isSubscribed
    ? `
        <button class="sub cancel">
          <img src="${ICON_IMG_PATH}/closed.svg" />
        </button>
      `
    : `
        <button class="sub subscribe">
          <img src="${ICON_IMG_PATH}/plus.svg" />
          <span>구독하기</span>
        </button>
        `;
}

function checkAnswer(e, _press) {
  let button = document.querySelector(".sub");
  const target = e.target.closest("button");
  const alert = document.querySelector(".alert");
  alert.style.display = "none";
  if (target.classList.contains("btn-yes")) {
    console.log("yes");
    const currentIndex = getSubscribedPress().findIndex(
      (press) => press.name === _press.name
    );
    const updatedSubscribedPress = getSubscribedPress().filter(
      (item) => item.name !== _press.name
    );

    store.setState({ subscribedPress: updatedSubscribedPress });
    const isSubscribed = getSubscribedPress().some(
      (press) => press.name === _press.name
    );
    button = showSubscribeButton(isSubscribed);

    showListView(currentIndex + 1);
  } else {
    console.log("no");
  }
}
export function handleSubscribe(press) {
  //   let btn_target = e.target.closest("button");
  const button = document.querySelector(".sub");
  const press_news = document.querySelector(".press-news");
  const newDiv = document.createElement("div");

  let isSubscribed = getSubscribedPress().includes(press);
  //구독한 상태에서 누를 경우
  if (isSubscribed) {
    newDiv.classList.add("popup", "alert");
    newDiv.innerHTML = `
        <div class="message"><span class="press">${press.name}</span>을(를)\n구독해지하시겠습니까?</div>
        <div class="buttons">
          <button class="btn-yes">예, 해지합니다</button>
          <button class="btn-no">아니오</button>
        </div>`;
    press_news.appendChild(newDiv);
    const btn = document.querySelector(".buttons");
    btn.addEventListener("click", (e) => checkAnswer(e, press));
  }
  //구독하지 않았을 때 => 구독됨
  else {
    const updatedSubscribedPress = [...getSubscribedPress(), press];
    store.setState({ subscribedPress: updatedSubscribedPress });
    //스낵바
    // newDiv.classList.add("popup", "snackbar");
    // newDiv.textContent = "내가 구독한 언론사에 추가되었습니다.";
    // press_news.appendChild(newDiv);
    //구독한 상태로 바뀜
    //버튼 변경
    button.innerHTML = showSubscribeButton(!isSubscribed);
  }
}
