import { autoRolling } from "./src/views/rolling_views.js";
import { initPress } from "./src/views/grid_views.js";
import { initNews } from "./src/views/list_views.js";
import { handleEvents } from "./src/events.js";

function initApp() {
    autoRolling();
    initPress();
    initNews();
    handleEvents();
}

initApp();
