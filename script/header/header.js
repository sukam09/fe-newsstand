import { drawDate } from "./date.js";
import { handleReload } from "./reload.js";

function initHeader() {
    drawDate();
    handleReload();
}

export {initHeader}