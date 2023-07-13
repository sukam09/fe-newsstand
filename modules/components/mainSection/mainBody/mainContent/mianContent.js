import { fetchData } from "../../../../utils.js";
import { pressGrid } from "./pressGrid/pressGrid.js";
import { category } from "./pressList/category/category.js";
import { pressList } from "./pressList/pressList.js";

export async function mainContent() {
  const press = await fetchData("/data/press.json");
  const { data } = press;
  const newsList = await fetchData("/data/news.json");

  return `
    <div class="main_content">
      <div id="list_container">
        ${category(newsList)}
        ${pressList(newsList[0], 0)}
        ${pressList(newsList[0], 1)}
        ${pressList(newsList[0], 2)}
        ${pressList(newsList[1], 0)}
        ${pressList(newsList[1], 1)}
      </div>
      <div id="grid_container">
        ${pressGrid(data, 0)}
        ${pressGrid(data, 1)}
        ${pressGrid(data, 2)}
        ${pressGrid(data, 3)}
      </div>
    </div>
    `;
}
