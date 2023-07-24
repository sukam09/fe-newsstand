import { getSubscribedPress, getTabMode, getView } from "../core/getter.js";
import { store } from "../core/store.js";
import { ICON_IMG_PATH, SNACKBAR_WAIT_TIME } from "../constants/constants.js";
import { showListView } from "./makeListView.js";
import { showGridView } from "./makeGridView.js";
import { changeView } from "./changeView.js";

export function showSubscribeButton(isSubscribed) {
  return isSubscribed
    ? getView() === "grid"
      ? `
        <button class="sub cancel">
          <img src="${ICON_IMG_PATH}closed.svg" />
          <span>해지하기</span>
        </button>
      `
      : `
      <button class="sub cancel">
        <img src="${ICON_IMG_PATH}closed.svg" />
      </button>
    `
    : `
        <button class="sub subscribe">
          <img src="${ICON_IMG_PATH}plus.svg" />
          <span>구독하기</span>
        </button>
        `;
}

function checkAnswer(e, _press) {
  const view_content = document.querySelector(".view-content");
  const currentIndex = getSubscribedPress().findIndex(
    (press) => press.name === _press.name
  );
  const target = e.target.closest("button");
  const alert = document.querySelector(".alert");
  alert.style.display = "none";
  if (target.classList.contains("btn-yes")) {
    const updatedSubscribedPress = getSubscribedPress().filter(
      (item) => item.name !== _press.name
    );
    store.setState({ subscribedPress: updatedSubscribedPress });
    const isSubscribed = getSubscribedPress().some(
      (press) => press.name === _press.name
    );
    const popup = view_content.querySelector(".popup");
    if (popup) popup.parentNode.removeChild(popup);

    getView() === "grid" ? showGridView() : showListView(currentIndex + 1);
  } else {
  }
}

function handleAnimationEnd(e, _press) {
  const view_content = document.querySelector(".view-content");

  const currentIndex = getSubscribedPress().findIndex(
    (press) => press.name === _press.name
  );
  if (e.animationName === "fade-out") {
    setTimeout(() => {
      const popup = view_content.querySelector(".popup");
      if (popup) popup.parentNode.removeChild(popup);
      store.setState({ tabMode: "subscribe" });
      changeView("list");
      showListView(currentIndex);
    }, 1000);
  }
}

export function handleSubscribe(_press) {
  const view_content = document.querySelector(".view-content");
  const newDiv = document.createElement("div");
  const isSubscribed = getSubscribedPress().some(
    (press) => press.name === _press.name
  );
  //구독한 상태에서 누를 경우
  if (isSubscribed) {
    newDiv.classList.add("popup", "alert");
    newDiv.innerHTML += `
        <div class="message"><span class="press">${_press.name}</span>을(를)\n구독해지하시겠습니까?</div>
        <div class="buttons">
          <button class="btn-yes">예, 해지합니다</button>
          <button class="btn-no">아니오</button>
        </div>`;
    view_content.appendChild(newDiv);
    const btn = document.querySelector(".buttons");
    btn.addEventListener("click", (e) => checkAnswer(e, _press));
  }
  //구독하지 않았을 때 => 구독됨
  else {
    const updatedSubscribedPress = [...getSubscribedPress(), _press];
    store.setState({ subscribedPress: updatedSubscribedPress });
    document.addEventListener("animationend", (e) =>
      handleAnimationEnd(e, _press)
    );
    //스낵바
    newDiv.classList.add("popup", "snackbar");
    newDiv.textContent = "내가 구독한 언론사에 추가되었습니다.";
    view_content.appendChild(newDiv);
    //구독한 상태로 바뀜
    getView() === "grid" ? showGridView() : showListView();
  }
}
