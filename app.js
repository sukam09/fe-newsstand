import { initArrow } from "./script/arrow/arrow.js";
import { initGrid} from "./script/grid-view/grid.js";
import { initRoll } from "./script/rolling-section/rolling.js";
import { handleSubscribe } from "./script/view-utils/handle-subscribe.js";
import { store } from "./store/store.js";
import { observer } from "./store/observer-master.js";
import { initHeader } from "./script/header/header.js";
import { initNav } from "./script/nav/nav.js";


function init () {
    // following init- functions are executed only once when loaded
    initHeader();
    initRoll();
    initGrid();
    initArrow();
    initNav();

    store.subscribe(observer);
    handleSubscribe();
}

window.onload = init;