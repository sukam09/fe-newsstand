import { autoRolling } from "./src/views/rolling_views.js";
import { initPress } from "./src/views/grid_views.js";

function initApp() {
    autoRolling();
    initPress();
}

initApp();
