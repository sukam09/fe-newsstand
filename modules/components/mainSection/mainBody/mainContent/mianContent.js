import { fetchData } from "../../../../utils.js";
import { pressGrid } from "./pressGrid/pressGrid.js";
import { category } from "./pressList/category/category.js";
import { pressList } from "./pressList/pressList.js";

export async function mainContent() {
  const press = await fetchData("/data/press.json");
  const { data } = press;
  const newsList = await fetchData("/data/news.json");
  let listContainerInnerHTML = "";

  newsList.length;
  for (let i = 0; i < newsList.length; i++) {
    newsList[i];
    for (let j = 0; j < newsList[i].data.length; j++) {
      listContainerInnerHTML += pressList(newsList[i], j);
    }
  }

  return `
    <div class="main_content">
      <div id="list_container">
        ${category(newsList)}
        ${listContainerInnerHTML}
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
