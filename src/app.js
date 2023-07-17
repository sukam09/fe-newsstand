import { createHeader } from "./container/headerTemplate.js";
import { createBanner } from "./container/bannerTemplate.js";
import { createMainNav } from "./container/mainNavTemplate.js";
import { gridView } from "./container/gridViewTemplate.js";
import { listView } from "./container/listViewTemplate.js";

(function render() {
    createHeader();
    createBanner();
    createMainNav();
    gridView();
    listView();
})();
