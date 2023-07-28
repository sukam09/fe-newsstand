
import { handleFilterChange } from "./change-filter.js";
import { handleViewChange } from "./change-view.js";

function initNav() {
    handleViewChange();
    handleFilterChange();
}

export {initNav}