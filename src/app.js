import { setGrid } from "./components/grid/index.js";
import { setList } from "./components/list/index.js";
import { setHeader } from "./components/header/index.js";
import { setNavigateButton } from "./components/navigate-button/index.js";
import { setViewToggleButton } from "./components/view-toggle-button/index.js";

(function init() {
  setHeader();
  setGrid();
  setList();
  setNavigateButton();
  setViewToggleButton();
})();
