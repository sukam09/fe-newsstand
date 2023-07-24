import { makeGridView } from "./main/gridView/makeGridView.js";
import { checkPressInLocal } from "./subscribe.js";
import { setState, getState } from "./store/observer.js";
import { gridPage, viewOption, viewType } from "./store/store.js";
import { GRID_NUM } from "./constant.js";

/* grid View */
function changePage(e) {
  if (e.target.id === "grid-left") {
    setState(gridPage, getState(gridPage) - 1);
  } else {
    setState(gridPage, getState(gridPage) + 1);
  }

  makeGridView(null);
}
function handleMouseOver(_img, press) {
  if (checkPressInLocal(press)) {
    _img.setAttribute("src", `../images/icon/Unsubscribe.svg`);
  } else {
    _img.setAttribute("src", "../images/icon/Subscribe.svg");
  }
}

function handleMouseOut(_img, originImg) {
  _img.setAttribute("src", originImg);
}

/* change view */
function changeViewOptionToSub() {
  if (getState(viewOption) === "all") {
    setState(viewOption, "sub");
  }
}
function changeViewOptionToAll() {
  if (getState(viewOption) === "sub") {
    setState(viewOption, "all");
  }
}

/* confirm modal */
function clickYes(selectedPress, _img) {
  //change local
  let SubscribePress = JSON.parse(localStorage.getItem("press"));
  SubscribePress = SubscribePress.filter((ele) => ele !== selectedPress);
  localStorage.setItem("press", JSON.stringify(SubscribePress));

  //hide confirm
  document.querySelector(".confirm").style.display = "none";
  if (getState(viewType) === "list") {
    _img.setAttribute("src", "../images/icon/subscribe.svg");
    // if (store.state.type === "list-press") {
    //   //다음 카테고리로 ?
    //   // selectedPress인 li 삭제
    //   const lists = document.querySelectorAll(".category li");
    //   lists.forEach((list) => {
    //     if (list.dataset.category === selectedPress) {
    //       addAnimation(list.nextElementSibling, "Next");
    //       lists[0].parentElement.removeChild(list);
    //     }
    //   });
    //   //li 삭제 후 애미메이션 넘겨주기 && 뉴스 가져오기
    // }
  }

  // if (store.state.type === "grid-sub") {
  //   //페이지의 마지막 요소라면
  //   if (SubscribePress.length % GRID_NUM === 0)
  //     store.setGridPage(store.state.grid_page - 1);
  //   renderGridView();
  // }

  if (getState(viewType) === "grid" && getState(viewOption) === "sub") {
    if (SubscribePress.length % GRID_NUM === 0)
      setState(gridPage, getState(gridPage) - 1);
  }
}
function clickNo() {
  document.querySelector(".confirm").style.display = "none";
}

export {
  changePage,
  handleMouseOut,
  handleMouseOver,
  changeViewOptionToAll,
  changeViewOptionToSub,
  clickYes,
  clickNo,
};
