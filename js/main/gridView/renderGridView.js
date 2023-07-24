// import { fetchData } from "../../../utils/fetchData.js";
import { fetchData } from "../../utils/fetchData.js";
import { manipulateSubPress } from "./manipulateSubPress.js";
import { getState, setState } from "../../observer.js";
import { viewOption, viewType } from "../../store.js";
import { gridView } from "./gridView.js";

async function renderGridView() {
  const press = await fetchData(".././assets/news.json");
  if (getState(viewOption) === "all") {
    gridView(press);
  } else {
    manipulateSubPress(press);
    gridView(press);
  }
}
export { renderGridView };
