import { renderGridView } from "./main/gridView/core/renderGridView.js";
import { store } from "./store.js";

const GRID_NUM = 24;
function confirm(selectedPress, _img, view) {
  document.querySelector(".confirm").style.display = "block";
  document.querySelector(
    ".question"
  ).innerHTML = `<span><span>${selectedPress}</span>을(를)</span> 구독해지하시겠습니까?`;

  const _answer = document.querySelector(".answer");
  //YES
  _answer.children[0].addEventListener(
    "click",
    () => clickYes(selectedPress, _img, view),
    { once: true }
  );
  //NO
  _answer.children[1].addEventListener("click", clickNo);
}

function clickYes(selectedPress, _img, view) {
  //change local
  let SubscribePress = JSON.parse(localStorage.getItem("press"));
  SubscribePress = SubscribePress.filter((ele) => ele !== selectedPress);
  localStorage.setItem("press", JSON.stringify(SubscribePress));

  //hide confirm
  document.querySelector(".confirm").style.display = "none";
  if (view === "list") _img.setAttribute("src", "../images/icon/subscribe.svg");

  if (store.state.type === "grid-sub") {
    //마지막 요소라면
    if (SubscribePress.length % GRID_NUM === 0)
      store.setGridPage(store.state.grid_page - 1);
    renderGridView();
  }
}
function clickNo() {
  document.querySelector(".confirm").style.display = "none";
}
export { confirm };
