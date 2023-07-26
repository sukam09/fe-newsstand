import { getState } from "../store/observer.js";
import { renderGridView } from "./gridView/renderGridView.js";
import { renderListView } from "./listView/renderListView.js";
import { viewType } from "../store/store.js";
import { LIST_VIEW, GRID_VIEW } from "../constant.js";

function render() {
  if (getState(viewType) === GRID_VIEW) {
    renderGridView();
  } else if (getState(viewType) === LIST_VIEW) {
    renderListView();
  }
}
export { render };
