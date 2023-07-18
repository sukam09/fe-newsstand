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
import { createPressGrid } from "./pressGrid/pressGrid.js";
import { createCategory } from "./pressList/category.js";
import { createPressList } from "./pressList/pressList.js";

export function createContent() {
  const { pressList } = getState(pressDataState);
  const shuffledPressDataArr = shuffleArray(pressList);
  setState(pressDataState, {
    pressList: shuffledPressDataArr,
  });

  const { categoryList } = getState(categoryDataState);
  let allPressGridPage = "";
  let allPressListPage = "";

  for (let i = 0; i < MAX_GRID_PAGE; i++) {
    allPressGridPage += createPressGrid(pressList, i);
  }
  for (let categoryId = 0; categoryId < MAX_CATEGORY_ID; categoryId++) {
    for (let page = 0; page < MAX_LIST_PAGE[categoryId]; page++) {
      allPressListPage += createPressList(categoryId, page);
    }
  }
  return `
    <div class="content">
      <div id="list_container">
        ${createCategory(categoryList)}
        ${allPressListPage}
      </div>
      <div id="grid_container">
        ${allPressGridPage}
      </div>
    </div>
    `;
}
