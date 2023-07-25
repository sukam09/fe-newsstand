import { makeGridView } from "./main/gridView/makeGridView.js";
import { checkPressInLocal } from "./subscribe.js";
import { setState, getState } from "./store/observer.js";
import { gridAllPage, viewOption, viewType, subPress } from "./store/store.js";
import { GRID_NUM } from "./constant.js";
import { renderGridView } from "./main/gridView/renderGridView.js";

/* grid View */
function changePage(e) {
  if (e.target.id === "grid-left") {
    setState(gridAllPage, getState(gridAllPage) - 1);
  } else {
    setState(gridAllPage, getState(gridAllPage) + 1);
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
  setState(subPress, SubscribePress);
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

  if (getState(viewType) === "grid" && getState(viewOption) === "sub") {
    if (SubscribePress.length % GRID_NUM === 0) {
      setState(gridAllPage, getState(gridAllPage) - 1);
    }

    renderGridView();
  }
}
function clickNo() {
  document.querySelector(".confirm").style.display = "none";
}

/* viewType Btn*/
function changeViewTypeToList(listViewBtn, gridViewBtn) {
  setState(viewType, "list");
  listViewBtn.innerHTML = `<img
    src="../images/icon/List-view-checked.svg"
    alt="images"
  />`;
  gridViewBtn.innerHTML = `<img
src="../images/icon/Grid-view-unchecked.svg"
alt="images"
/>`;
  displayView();
}
function changeViewTypeToGrid(listViewBtn, gridViewBtn) {
  setState(viewType, "grid");
  listViewBtn.innerHTML = `<img
  src="../images/icon/List-view-unchecked.svg"
  alt="images"
/>`;
  gridViewBtn.innerHTML = `<img
src="../images/icon/Grid-view-checked.svg"
  alt="images"
/>`;
  displayView();
}
function displayView() {
  const gridView = document.querySelector(".grid-view");
  const listView = document.querySelector(".list-view");
  const listViewLeftBtn = document.getElementById("list-left-btn");
  const listViewRightBtn = document.getElementById("list-right-btn");
  const gridLeftBtn = document.getElementById("grid-left-btn");
  const gridRightBtn = document.getElementById("grid-right-btn");

  if (getState(viewType) === "list") {
    gridView.style.display = "none";
    listView.style.display = "block";
    listViewLeftBtn.style.display = "block";
    listViewRightBtn.style.display = "block";
    gridLeftBtn.style.display = "none";
    gridRightBtn.style.display = "none";
  } else if (getState(viewType) === "grid") {
    listView.style.display = "none";
    gridView.style.display = "flex";
    listViewLeftBtn.style.display = "none";
    listViewRightBtn.style.display = "none";
    gridLeftBtn.style.display = "block";
    gridRightBtn.style.display = "block";
  }
}

export {
  changePage,
  handleMouseOut,
  handleMouseOver,
  changeViewOptionToAll,
  changeViewOptionToSub,
  clickYes,
  clickNo,
  changeViewTypeToList,
  changeViewTypeToGrid,
};
