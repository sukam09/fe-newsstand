import { setGrid } from "./components/grid/index.js";
import { setList } from "./components/list/index.js";
import { setHeader } from "./components/header/index.js";
import { setNavigationButtons } from "./components/NavigationButton.js";
import { setViewToggleButton } from "./components/ViewToggleButton.js";

(function init() {
  setHeader();
  setGrid();
  setList();
  setNavigationButtons();
  setViewToggleButton();
})();
