import { listenArrow, updateArrow } from "./script/arrow.js";
import { drawDate } from "./script/date.js";
import { drawPress } from "./script/grid-view.js";
import rollingList from "./asset/data/rollingList.js";
import { rollHeadline } from "./script/rolling-view.js";
import { listenViewChange } from "./script/view-change.js";
import { listenReload } from "./script/reload.js";

const rollingContent = document.querySelectorAll(".rolling-content");

function init () {
    listenReload();
    drawDate();
    drawPress();
    updateArrow();
    listenArrow();
    rollingContent.forEach((item, index) => {
        const isFirstRoll = true;
        rollHeadline(item, rollingList.length, index, isFirstRoll);
    })
    listenViewChange();
}
window.onload = init;