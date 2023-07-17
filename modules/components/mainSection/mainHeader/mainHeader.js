import { addObserver, getState, setState } from "../../../core/observer.js";
import { GRID, LIST } from "../../../state/pageState.js";
import { pageTypeState } from "../../../state/pageState.js";
import { qs } from "../../../utils.js";

export function createMainHeader() {
  return `
    <div class="main_header flex_row">
      <div class="main_title_container flex_row">
        <h2>전체 언론사</h2>
        <span>내가 구독한 언론사</span>
      </div>
      <div class="view_button_container flex_row">
        <img class="list_view_button" src="./assets/icons/list_off.png" alt="list view button">
        <img class="grid_view_button view_clicked" src="./assets/icons/grid_off.png" alt="grid view button">
      </div>
    </div>
    `;
}

export function handleGirdViewButton(e) {
  const $listViewButton = qs(".list_view_button");
  e.currentTarget.classList.add("view_clicked");
  $listViewButton.classList.remove("view_clicked");
  setState(pageTypeState, GRID);
}

export function handleListViewButton(e) {
  const $gridViewButton = qs(".grid_view_button");
  e.currentTarget.classList.add("view_clicked");
  $gridViewButton.classList.remove("view_clicked");
  setState(pageTypeState, LIST);
}
