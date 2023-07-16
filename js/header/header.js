import { refreshPage } from "../utils/refreshPage.js";
import { getDate } from "../utils/getDate.js";

function initHeader() {
  getDate(".date", 60000);
  refreshPage(".title");
}
export { initHeader };
