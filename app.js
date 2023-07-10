import { autoRolling } from "./rolling_banner.js";
import { renderPress } from "./random_news.js";

function initApp() {
    autoRolling();
    renderPress();
}

initApp();
