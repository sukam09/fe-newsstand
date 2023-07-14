import { fetchData } from "../../../../utils.js";
import { createPressGrid } from "./pressGrid/pressGrid.js";
import { createCategory } from "./pressList/category/category.js";
import { createPressList } from "./pressList/pressList.js";

export async function createMainContent() {
  const press = await fetchData("/data/press.json");
  const newsList = await fetchData("/data/news.json");
  const { data } = press;
  let listContainerInnerHTML = "";

  for (let i = 0; i < newsList.length; i++) {
    newsList[i];
    for (let j = 0; j < newsList[i].data.length; j++) {
      listContainerInnerHTML += createPressList(newsList[i], j);
    }
  }

  return `
    <div class="main_content">
      <div id="list_container">
        ${createCategory(newsList)}
        ${listContainerInnerHTML}
      </div>
      <div id="grid_container">
        ${createPressGrid(data, 0)}
        ${createPressGrid(data, 1)}
        ${createPressGrid(data, 2)}
        ${createPressGrid(data, 3)}
      </div>
    </div>
    `;
}
