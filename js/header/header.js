import { refreshPage } from "./refreshPage.js";
import { getDate } from "./getDate.js";


function initHeader() {
  getDate(".date", 60000);
  refreshPage(".title");
}
export { initHeader };
