import { fetchData } from "../../../../utils.js";
import { pressGrid } from "./pressGrid/pressGrid.js";

export async function mainContent() {
  const press = await fetchData("/data/press.json");
  const { data } = press;

  return `
    <div class="main_content">
      <div id="list_container">
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
