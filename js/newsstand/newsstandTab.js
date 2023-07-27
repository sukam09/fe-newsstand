import { addGridButton, deleteGridButton } from "./newsstandGrid.js";
import { addListdButton, deleteListButton } from "./newsstandList.js";
import { EVENT, VIEW } from "../utils/constant.js";
import { setUserViewToList, setUserViewToGrid } from "../store/dispatch.js";
import { CustomQuery } from "../utils/customSelector/customQuery.js";

export function newsstandListTab() {
  const [listButton] =
    new CustomQuery().getElementWithClassName("newsstand-btn-list") || [];
  const [thumbButton] = new CustomQuery().getElementWithClassName(
    "newsstand-btn-thumb"
  );
  const [gridArea] = new CustomQuery().getElementWithClassName(
    "newsstand__media-area"
  );
  const [listArea] = new CustomQuery().getElementWithId("newsstand__news-area");

  // const [listButton] = document.getElementsByClassName("newsstand-btn-list");
  // const [thumbButton] = document.getElementsByClassName("newsstand-btn-thumb");
  // const [gridArea] = document.getElementsByClassName("newsstand__media-area");
  // const listArea = document.getElementById("newsstand__news-area");

  hanlderNewsTabListener(listButton, thumbButton, listArea, gridArea);
}

function hanlderNewsTabListener(listButton, thumbButton, listArea, gridArea) {
  // 뉴스 리스트 버튼 클릭됬을때.
  listButton.addEventListener(EVENT.CLICK, () => {
    switchToList(listButton, thumbButton, listArea, gridArea);
  });

  // 뉴스 그리드 버튼 클릭됬을때.
  thumbButton.addEventListener(EVENT.CLICK, () => {
    switchToGrid(listButton, thumbButton, listArea, gridArea);
  });
}

function switchToList(listButton, thumbButton, listArea, gridArea) {
  setUserViewToList();

  // 그리드 좌우 버튼 삭제
  deleteGridButton();
  addListdButton();
  // 버튼 색상 변경
  listButton.src = "./assets/basicIcon/list-symbol-selected.svg";
  thumbButton.src = "./assets//basicIcon/grid-symbol.svg";

  // display: none 속성 부여.
  listArea.classList.remove(VIEW.DISABLED);
  gridArea.classList.add(VIEW.DISABLED);
}

function switchToGrid(listButton, thumbButton, listArea, gridArea) {
  setUserViewToGrid();
  // 그리드 좌우 버튼 추가
  deleteListButton();
  addGridButton();
  // 버튼 색상 변경
  listButton.src = "./assets/basicIcon/list-symbol.svg";
  thumbButton.src = "./assets//basicIcon/grid-symbol-selected.svg";

  gridArea.classList.remove(VIEW.DISABLED);
  listArea.classList.add(VIEW.DISABLED);
}
