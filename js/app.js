import { constants } from "./constants.js";
import { setHeaderDate } from "./headerDate.js";
import { setRolling } from "./rolling.js";
import { renderNewspaper } from "./newspaper.js";
import { setPageButton } from "./pageButton.js";

const main = () => {
  setHeaderDate();
  setRolling();
  renderNewspaper(constants.MIN_PAGE, constants.LIGHT_MODE);
  setPageButton();
};

main();
