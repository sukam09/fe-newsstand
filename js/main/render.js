import { getState } from "../store/observer.js";
import { renderGridView } from "./gridView/renderGridView.js";
import { renderListView } from "./listView/renderListView.js";
import { viewOption, viewType } from "../store/store.js";

function render() {
  if (getState(viewType) === "grid") {
    renderGridView();
  } else {
    renderListView();
  }
}
export { render };
