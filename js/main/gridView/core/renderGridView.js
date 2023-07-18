// 랜덤 그리드 && 버튼
import { fetchData } from "../../../utils/fetchData.js";
import { makeGridView } from "./makeGridView.js";

async function renderGridView() {
  const press = await fetchData(".././assets/news.json");
  makeGridView(press);
}

export { renderGridView };
