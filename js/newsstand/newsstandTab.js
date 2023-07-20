import { paintNewsCategory } from "./newsCategory.js";
import { addGridButton, deleteGridButton } from "./newsstandGrid.js";
import { addListdButton, deleteListButton } from "./newsCategory.js";
import { EVENT } from "../utils/constant.js";
import { View } from "../store/viewState.js";
const VIEW_DISABLED = "view-disabled";

export function newsstandListTab() {
  const [listButton] = document.getElementsByClassName("newsstand—btn-list");
  const [thumbButton] = document.getElementsByClassName("newsstand-btn-thumb");
  const [gridArea] = document.getElementsByClassName("newsstand__media-area");
  const listArea = document.getElementById("newsstand__news-area");

  hanlderNewsTabListener(listButton, thumbButton, listArea, gridArea);
}

function hanlderNewsTabListener(listButton, thumbButton, listArea, gridArea) {
  // 뉴스 리스트 버튼 클릭됬을때.
  listButton.addEventListener(EVENT.CLICK, () => {
    View.setUserView("list");
    // 그리드 버튼 삭제
    deleteGridButton();
    addListdButton();
    // 버튼 색상 변경
    listButton.src = "./assets/basicIcon/list-symbol-selected.svg";
    thumbButton.src = "./assets//basicIcon/grid-symbol.svg";

    paintNewsCategory();

    // display: none 속성 부여.
    listArea.classList.remove(VIEW_DISABLED);
    gridArea.classList.add(VIEW_DISABLED);
  });

  // 뉴스 그리드 버튼 클릭됬을때.
  thumbButton.addEventListener(EVENT.CLICK, () => {
    View.setUserView("grid");
    // 그리드 버튼 추가
    deleteListButton();
    addGridButton();
    // 버튼 색상 변경
    listButton.src = "./assets/basicIcon/list-symbol.svg";
    thumbButton.src = "./assets//basicIcon/grid-symbol-selected.svg";

    gridArea.classList.remove(VIEW_DISABLED);
    listArea.classList.add(VIEW_DISABLED);
  });
}
