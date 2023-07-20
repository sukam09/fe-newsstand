import { addObserver, getState, setState } from "../../../store/observer.js";
import { GRID, LIST } from "../../../store/pageState.js";
import { pageTypeState } from "../../../store/pageState.js";
import { qs } from "../../../utils.js";

export function createMainHeader() {
  return `
    <div class="main_header flex_row">
      <div class="main_title_container flex_row">
        <span class="mode_button all_mode_button mode_clicked">전체 언론사</span>
        <span class="mode_button my_mode_button">내가 구독한 언론사</span>
      </div>
      <div class="view_button_container flex_row">
        <img class="list_view_button" src="./assets/icons/list_off.png" alt="list view button">
        <img class="grid_view_button view_clicked" src="./assets/icons/grid_off.png" alt="grid view button">
      </div>
    </div>
    `;
}
