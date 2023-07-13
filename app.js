import { renderDate } from "./components/date.js";
import { renderBanner } from "./components/banner.js";
import { renderGridNews } from "./components/gridNews.js";
import { rederProgressBtn } from "./components/progressBtn.js";
import { renderMainNav } from "./components/mainNav.js";
import { renderTab } from "./components/categoryTab.js";
import { renderListNews } from "./components/listNews.js";
import { list_news_data } from "./data/list_news_data.js";
import { listArrowEvent } from "./components/listArrow.js";

(function () {
    renderDate();
    renderBanner();
    renderMainNav();
    renderGridNews();
    renderTab();
    rederProgressBtn();
    renderListNews(list_news_data[0].news[0]);
    listArrowEvent();
})();
