import { initReload } from "./reload.js";
import { initDate } from "./getDate.js";

function initHeader() {
  initDate();
  initReload();
}
export { initHeader };
