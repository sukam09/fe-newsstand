import { getState, subscribe } from "../observer.js";
import { renderGridView } from "./gridView/renderGridView.js";
import { renderListView } from "./listView/renderListView.js";
import { viewType } from "../store.js";

function render() {
  if (getState(viewType) === "grid") {
    renderGridView();
  } else {
    renderListView();
  }
}
export { render };
