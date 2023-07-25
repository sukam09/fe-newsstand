import {
  getCurrentPress,
  getSubscribedPress,
  getTabMode,
  getView,
} from "../core/getter.js";
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
    getView() === "grid" ? showGridView() : showListView(currentIndex + 1);
  } else {
  }
}
function handleAnimationEnd(e, _press) {
  const view_content = document.querySelector(".view-content");
  const snackbar = view_content.querySelector(".snackbar");
  const currentIndex = getSubscribedPress().findIndex(
    (press) => press.name === _press.name
  );
  if (e.animationName === "fade-out") {
    snackbar.style.display = "none";

    setTimeout(() => {
      store.setState({ tabMode: "subscribe" });
      changeView("list");
      showListView(currentIndex);
    }, 1000);
  }
}

export function handleSubscribe(_press) {
  const isSubscribed = getSubscribedPress().some(
    (press) => press.name === _press.name
  );
  //구독한 상태에서 누를 경우
  if (isSubscribed) {
    store.setState({ currentPress: _press });
    const alert = document.querySelector(".alert");
    const press_msg = alert.querySelector(".press");
    press_msg.innerHTML = `${getCurrentPress().name}`;
    alert.style.display = "block";

    const btn = document.querySelector(".buttons");
    btn.addEventListener("click", (e) => {
      alert.style.display = "none";
      checkAnswer(e, _press);
    });
  }
  //구독하지 않았을 때 => 구독됨
  else {
    const updatedSubscribedPress = [...getSubscribedPress(), _press];
    store.setState({ subscribedPress: updatedSubscribedPress });
    const snackbar = document.querySelector(".snackbar");
    snackbar.style.display = "block";
    document.addEventListener("animationend", (e) =>
      handleAnimationEnd(e, _press)
    );

    //구독한 상태로 바뀜
    getView() === "grid" ? showGridView() : showListView();
  }
}
