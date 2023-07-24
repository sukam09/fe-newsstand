import { fetchData } from "../../utils/fetchData.js";
import { manipulateSubPress } from "./manipulateSubPress.js";
import { getState } from "../../store/observer.js";
import { viewOption } from "../../store/store.js";
import { makeGridView } from "./makeGridView.js";

async function renderGridView() {
  const press = await fetchData(".././assets/news.json");
  if (getState(viewOption) === "all") {
    makeGridView(press);
  } else if (getState(viewOption) === "sub") {
    makeGridView(manipulateSubPress(press));
  }
}
export { renderGridView };
