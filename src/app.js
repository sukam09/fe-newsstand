import { setNewsGrid } from "./grid.js";
import { gridPagesStore, listPagesStore } from "./store.js";
import { setHeaderLogo, setHeaderDate, setHeadline } from "./header.js";
import { setViewToggleButton } from "./view-toggle-button.js";
import { setCategoryBar, setList } from "./list.js";

(async function init() {
  const gridCurrentPages = gridPagesStore.getInstance();
  const listCurrentPages = listPagesStore.getInstance();

  setHeaderLogo();
  setHeaderDate();
  setNewsGrid(gridCurrentPages);
  setHeadline();
  setViewToggleButton();

  setCategoryBar();
  setList(listCurrentPages);
})();
