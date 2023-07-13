import { constants } from "./Data/constants.js";
import { setHeaderDate } from "./Components/Header/headerDate.js";
import { setRolling } from "./Components/Headline/rolling.js";
import { renderNewspaper } from "./Components/NewsGrid/newspaper.js";
import { setGridPageButton } from "./Components/NewsGrid/pageButton.js";
import { setViewerEvent } from "./Components/NavBar/newsViewer.js";
import { setListPageButton } from "./Components/NewsList/pageButton.js";

const main = () => {
  setHeaderDate();
  setRolling();
  renderNewspaper(constants.MIN_PAGE, constants.LIGHT_MODE);
  setGridPageButton();
  setViewerEvent();
  setListPageButton();
};

main();
