import { drawArrow, handleArrowClick } from "./script/arrow/arrow.js";
import { drawDate } from "./script/view-utils/date.js";
import { drawGrid} from "./script/grid-view/grid.js";
import { handleViewChange } from "./script/nav/change-view.js";
import {handleFilterChange} from "./script/nav/change-filter.js"
import { handleReload } from "./script/view-utils/reload.js";
import { rollInit } from "./script/rolling-section/rolling.js";
import { shuffleArray } from "./util/shuffleArray.js";
import pressList from "../asset/data/pressList.js";
import { handleSubscribe } from "./script/view-utils/handle-subscribe.js";
import { store } from "./store/store.js";
import { renderView } from "./script/view-utils/render-view.js";


let pressIdxArray = Array.from({length: pressList.length}, (_,i) => i+1); // create array of consecutive numbers [1...96]

function init () {
    shuffleArray(pressIdxArray); // shuffle grid only when reloading
    drawDate();
    drawGrid();
    drawArrow();
    rollInit();

    store.subscribe(renderView);
    store.subscribe(drawArrow);
    handleReload();
    handleArrowClick();
    handleViewChange();
    handleFilterChange();
    handleSubscribe();
}
window.onload = init;