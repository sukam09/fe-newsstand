import { createHeader } from "./container/headerTemplate.js";
import { createBanner } from "./container/bannerTemplate.js";
import { createMainNav } from "./container/mainNavTemplate.js";
import { createGridView } from "./container/gridViewTemplate.js";
import { createListView } from "./container/listViewTemplate.js";
import { list_news_data } from "../data/list_news_data.js";

(function render() {
    createHeader();
    createBanner();
    createMainNav();
    createListView(list_news_data[0].news[0]);
    createGridView();
})();
