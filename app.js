import { renderDate } from "./components/date.js";
import { renderBanner } from "./components/banner.js";
import { renderGridNews } from "./components/gridNews.js";
import { rederProgressBtn } from "./components/progressBtn.js";
import { renderMainNav } from "./components/mainNav.js";

(function () {
    renderDate();
    renderBanner();
    renderMainNav();
    renderGridNews();
    rederProgressBtn();
})();
