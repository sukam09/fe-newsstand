import { autoRolling } from "./src/views/rolling_views.js";
import { handleEvents } from "./src/events.js";

function initApp() {
    autoRolling();
    handleEvents();
}

initApp();
