import {
  categoryDataState,
  pressDataState,
} from "../../../../store/dataState.js";
import { getState, setState } from "../../../../store/observer.js";
import {
  MAX_CATEGORY_ID,
  MAX_GRID_PAGE,
  MAX_LIST_PAGE,
} from "../../../../store/pageState.js";
import { shuffleArray } from "../../../../utils.js";
import {
  createEmptyPressGrid,
  createPressGrid,
} from "./pressGrid/pressGrid.js";
import { createCategory } from "./pressList/category.js";
import { createPressList } from "./pressList/pressList.js";

export function createContent() {
  const { pressList } = getState(pressDataState);
  const shuffledPressDataArr = shuffleArray(pressList);
  setState(pressDataState, {
    pressList: shuffledPressDataArr,
  });

  const { categoryList } = getState(categoryDataState);
  let allGrid = "";
  let allList = "";
  let allEmptyGrid = "";
  let allEmptyList = "";

  for (let page = 0; page < MAX_GRID_PAGE; page++) {
    allGrid += createPressGrid(pressList, page);
    allEmptyGrid += createEmptyPressGrid(page);
  }
  for (let categoryId = 0; categoryId < MAX_CATEGORY_ID; categoryId++) {
    for (let page = 0; page < MAX_LIST_PAGE[categoryId]; page++) {
      allList += createPressList(categoryId, page);
    }
  }
  return `
    <div class="content">
      <div id="mode_all_list_container">
        ${createCategory(categoryList)}
        ${allList}
      </div>
      <div id="mode_all_grid_container">
        ${allGrid}
      </div>
      <div id="mode_my_grid_container">
        ${allEmptyGrid}
      </div>
      <div id="mode_my_list_container">
        ${createCategory()}
        ${allEmptyList}
      </div>
    </div>
    `;
}
