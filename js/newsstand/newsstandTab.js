import { restartProgressBar } from "./newsCategory.js";

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
  listButton.addEventListener("click", () => {
    // 버튼 색상 변경
    listButton.src = "./assets/basicIcon/list-symbol-selected.svg";
    thumbButton.src = "./assets//basicIcon/grid-symbol.svg";

    // 리스트 뷰로 선택되면 맨 처음 카테고리부터 시작되게 만듬.
    listArea.className === VIEW_DISABLED ? restartProgressBar() : () => {};

    // display: none 속성 부여.
    listArea.classList.remove(VIEW_DISABLED);
    gridArea.classList.add(VIEW_DISABLED);
  });

  // 뉴스 리스트 버튼 클릭됬을때.
  thumbButton.addEventListener("click", () => {
    // 버튼 색상 변경
    listButton.src = "./assets/basicIcon/list-symbol.svg";
    thumbButton.src = "./assets//basicIcon/grid-symbol-selected.svg";

    gridArea.classList.remove(VIEW_DISABLED);
    listArea.classList.add(VIEW_DISABLED);
  });
}
