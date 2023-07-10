import { setHeaderDate } from "./headerDate.js";
import { setRolling } from "./rolling.js";
import { renderNewspaper } from "./newspaper.js";
import { setPageButton } from "./pageButton.js";

const main = () => {
  setHeaderDate();
  setRolling();
  renderNewspaper(0, "light");
  setPageButton();
};

main();
