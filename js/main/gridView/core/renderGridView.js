// 랜덤 그리드 && 버튼
import { fetchData } from "../../../utils/fetchData.js";
import { makeGridView } from "./makeGridView.js";
import { store } from "../../../store.js";
import { manipulateSubPress } from "../feature/manipulateSubPress.js";

async function renderGridView() {
  console.log(store.state.grid_page);
  const press = await fetchData(".././assets/news.json");
  if (store.state.type === "grid-all") {
    makeGridView(press);
  } else if (store.state.type === "grid-sub") {
    //sub-press 가져와서 조작 후 넘겨주기
    makeGridView(manipulateSubPress(press));
  }
}

export { renderGridView };
