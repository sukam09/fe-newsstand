import { setNewsGrid } from "./grid.js";
import { pagesStore } from "./store.js";
import { setHeaderLogo, setHeaderDate, setHeadline } from "./header.js";

(async function init() {
  const currentPages = pagesStore.getInstance();

  setHeaderLogo();
  setHeaderDate();
  setNewsGrid(currentPages);
  setHeadline();
})();
