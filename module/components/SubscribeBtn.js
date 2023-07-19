import { store, actionCreator } from "../../store.js";
import { updateGrid } from "../view/GridView.js";

function snackBar() {
  const snackBarElement = document.createElement("div");
  snackBarElement.className = "snack-bar";
  snackBarElement.innerHTML = `<span class="snack-bar-text display-medium16">내가 구독한 언론사에 추가되었습니다.</span>`;
  const gridMain = document.querySelector(".grid");
  gridMain.appendChild(snackBarElement);

  setTimeout(() => {
    gridMain.removeChild(snackBarElement);
  }, 5000);
}

function alertElement(pressID) {
  const alertEle = `
        <div class="alert">
            <div class="alert-contents">
                <span class="alert-contents-text">을(를)<br/>구독하시겠습니까?</span>
            </div>
            <div class="alert-buttons">
            </div>
        </div>
    `;
}

export function DoSubScribe(btnElement, pressID) {
  btnElement.addEventListener("click", (e) => {
    snackBar(e);
    store.dispatch(actionCreator("subscribe", { pressID }));
    btnElement.querySelector(".subscribe-text").innerHTML = "해지하기";
  });
}

export function DoUnsubscribe(btnElement, pressID) {
  btnElement.addEventListener("click", (e) => {
    alertElement(pressID);
    store.dispatch(actionCreator("unsubscribe", { pressID }));
    updateGrid();
    btnElement.querySelector(".subscribe-text").innerHTML = "구독하기";
  });
}

export function SubscribeState(pressID) {
  return store.getIsSubscribe(pressID);
}
