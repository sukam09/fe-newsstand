import { fetchData } from "../../utils/fetchData.js";
import { manipulateSubPress } from "./manipulateSubPress.js";
import { getState } from "../../store/observer.js";
import { viewOption } from "../../store/store.js";
import { makeGridView } from "./makeGridView.js";
import { ALL_PRESS, SUB_PRESS } from "../../utils/constant.js";

async function renderGridView() {
  const press = await fetchData(".././assets/news.json");
  if (getState(viewOption) === ALL_PRESS) {
    makeGridView(press);
  } else if (getState(viewOption) === SUB_PRESS) {
    makeGridView(manipulateSubPress(press));
  }
}
export { renderGridView };
