import { initArrow } from "./script/arrow/arrow.js";
import { initGrid} from "./script/grid-view/grid.js";
import { initRoll } from "./script/rolling-section/rolling.js";
import { store } from "./store/store.js";
import { observer } from "./store/observer-master.js";
import { initHeader } from "./script/header/header.js";
import { initNav } from "./script/nav/nav.js";
import { getJSON } from "./util/getJSON.js";
import { URL } from "./asset/data/constants.js";


async function init () {
    store.setPressData(await getJSON(URL.PRESS_DATA));
    // following init- functions are executed only once when loaded
    initHeader();
    initRoll();
    initGrid();
    initArrow();
    initNav();

    store.subscribe(observer);
}

window.onload = init;