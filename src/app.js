import { setNavigationButtons } from "./components/navigation-button.js";
import { setViewToggleButton } from "./components/view-toggle-button.js";
import { setHeader } from "./components/header/index.js";
import { setGrid } from "./components/grid/index.js";
import { setList } from "./components/list/index.js";

(function init() {
  setHeader();
  setGrid();
  setList();
  setNavigationButtons();
  setViewToggleButton();
})();
