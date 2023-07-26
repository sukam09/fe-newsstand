import { refreshPage } from "./refreshPage.js";
import { getDate } from "./getDate.js";
import { REFRESH_DATE_TIME } from "../utils/constant.js";

function initHeader() {
  getDate(".date", REFRESH_DATE_TIME);
  refreshPage(".title");
}
export { initHeader };
