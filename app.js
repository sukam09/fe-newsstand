import { drawArrow, handleArrowClick } from "./script/view-utils/arrow.js";
import { drawDate } from "./script/date.js";
import { drawGrid} from "./script/grid-view/grid-view.js";
import { handleViewChange } from "./script/view-utils/change-view.js";
import {handleFilterChange} from "./script/view-utils/change-filter.js"
import { handleReload } from "./script/reload.js";
import { rollInit } from "./script/rolling-view.js";
import { shuffleArray } from "./util/shuffleArray.js";
import pressList from "../asset/data/pressList.js";
import { handleSubscribe } from "./script/view-utils/handle-subscribe.js";


let pressIdxArray = Array.from({length: pressList.length}, (_,i) => i+1); // create array of consecutive numbers [1...96]

function init () {
    console.log(pressIdxArray)
    shuffleArray(pressIdxArray); // shuffle grid only when reloading
    drawDate();
    drawGrid();
    drawArrow();
    rollInit();

    handleReload();
    handleArrowClick();
    handleViewChange();
    handleFilterChange();
    handleSubscribe();
}
window.onload = init;