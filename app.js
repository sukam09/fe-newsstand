import { drawArrow, handleArrowClick } from "./script/arrow.js";
import { drawDate } from "./script/date.js";
import { drawPress } from "./script/grid-view.js";
import rollingList from "./asset/data/rollingList.js";
import { rollHeadline } from "./script/rolling-view.js";
import { handleViewChange } from "./script/view-change.js";
import {handleFilterChange} from "./script/filter-change.js"
import { handleReload } from "./script/reload.js";

const rollingContent = document.querySelectorAll(".rolling-content");

function init () {
    handleReload();
    drawDate();
    drawPress();
    drawArrow();
    rollingContent.forEach((item, index) => {
        const isFirstRoll = true;
        rollHeadline(item, rollingList.length, index, isFirstRoll);
    })
    handleArrowClick();
    handleViewChange();
    handleFilterChange();
}
window.onload = init;