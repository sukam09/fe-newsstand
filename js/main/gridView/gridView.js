import { GRID_NUM, MIN_PAGE, MAX_PAGE } from "../../constant.js";
import { gridPage, viewOption } from "../../store.js";
import { getState, setState } from "../../observer.js";

function gridView(press) {
  const imgIndex = Array(press.length)
    .fill()
    .map((arr, i) => i);
  function shuffleImgIndex() {
    return [...imgIndex].sort(() => Math.random() - 0.5);
  }

  const shuffledPress = shuffleImgIndex(imgIndex);

  let _press;

  function showMainList(press) {
    if (press !== null) {
      _press = press;
    }

    const main_list_ul = document.querySelector(".grid-view-ul");

    main_list_ul.innerHTML = "";
    for (
      let i = GRID_NUM * (getState(gridPage) - 1);
      i < GRID_NUM * getState(gridPage);
      i++
    ) {
      let _li, _img;
      if (getState(viewOption) === "all") {
        [_li, _img] = makeGrid(_press[shuffledPress[i]]);
      } else {
        [_li, _img] = makeGrid(_press[i]);
      }

      //   //구독하기 && 해제하기 클릭 시
      //   _img.addEventListener("click", (e) =>
      //     clickSubscribe(e.target.parentElement.dataset.press, "grid", _img)
      //   );

      main_list_ul.appendChild(_li);
      _li.appendChild(_img);
    }
  }

  function makeGrid(pressinfo) {
    const _li = document.createElement("li");
    const _img = document.createElement("img");

    if (pressinfo !== undefined) {
      _li.setAttribute("data-press", `${pressinfo.name}`);
      _img.setAttribute("src", `${pressinfo.lightSrc}`);

      //   /* li hover 이벤트 리스너 */
      //   _li.addEventListener("mouseover", () =>
      //     handleMouseOver(_img, _li.dataset.press)
      //   );

      //   _li.addEventListener("mouseout", () =>
      //     handleMouseOut(_img, ` ${pressinfo.lightSrc}`)
      //   );
    }
    return [_li, _img];
  }
  function changePage(e) {
    if (e.target.id === "grid-left") {
      setState(gridPage, getState(gridPage) - 1);
    } else {
      setState(gridPage, getState(gridPage) + 1);
    }

    showMainList(null);
    checkPage();
  }

  function checkPage() {
    const left_btn = document.getElementById("grid-left-btn");
    const right_btn = document.getElementById("grid-right-btn");

    //   left_btn.style.visibility = "visible";
    //   right_btn.style.visibility = "visible";

    if (getState(gridPage) === MIN_PAGE) {
      left_btn.style.visibility = "hidden";
    } else if (getState(gridPage) === MAX_PAGE) {
      right_btn.style.visibility = "hidden";
    } else {
      left_btn.style.visibility = "visible";
      right_btn.style.visibility = "visible";
    }
    //   if (store.state.type === "grid-all") {
    //     if (getState(gridPage) === MIN_PAGE)
    //       left_btn.style.visibility = "hidden";
    //     else if (getState(gridPage) === MAX_PAGE)
    //       right_btn.style.visibility = "hidden";
    //   } else {
    //     const subPress = JSON.parse(localStorage.getItem("press"));

    //     if (
    //       getState(gridPage) <= MIN_PAGE &&
    //       getState(gridPage) === Math.ceil(subPress.length / 24)
    //     ) {
    //       right_btn.style.visibility = "hidden";
    //       left_btn.style.visibility = "hidden";
    //     } else if (getState(gridPage) === Math.ceil(subPress.length / 24))
    //       right_btn.style.visibility = "hidden";
    //     else if (getState(gridPage) === MIN_PAGE) {
    //       left_btn.style.visibility = "hidden";
    //     }
    //   }
  }

  function addEventToGridBtn() {
    const left_btn = document.getElementById("grid-left-btn");
    const right_btn = document.getElementById("grid-right-btn");

    right_btn.addEventListener("click", (e) => changePage(e));
    left_btn.addEventListener("click", (e) => changePage(e));
  }
  showMainList(press);
  addEventToGridBtn();
  checkPage();
}

export { gridView };
