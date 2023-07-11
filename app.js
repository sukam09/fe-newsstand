import { autoRolling } from "./rolling_banner.js";
import { initPress } from "./random_news.js";

function initApp() {
    autoRolling();
    initPress();
}

initApp();
