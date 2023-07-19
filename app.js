import { drawArrow, handleArrowClick } from "./script/arrow.js";
import { drawDate } from "./script/date.js";
import { drawPress } from "./script/grid-view.js";
import { handleViewChange } from "./script/view-change.js";
import {handleFilterChange} from "./script/filter-change.js"
import { handleReload } from "./script/reload.js";
import { rollInit } from "./script/rolling-view.js";
import { shuffleArray } from "./util/shuffleArray.js";
import pressList from "../asset/data/pressList.js";


let pressIdxArray = Array.from(Array(pressList.length).keys()); // create array of consecutive numbers [0...95] - to be used in drawPress()

function init () {
    drawDate();
    shuffleArray(pressIdxArray); // shuffle grid only when reloading
    drawPress();
    drawArrow();
    rollInit();
    handleReload();
    handleArrowClick();
    handleViewChange();
    handleFilterChange();
}
window.onload = init;