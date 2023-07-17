import { App } from "./app.js";
import { render } from "./core/index.js";
import { setHeaderDate } from "./Components/Header/Function/headerDate.js";
import { renderNewspaper } from "./Components/NewsGrid/newspaper.js";
import { setGridPageButton } from "./Components/NewsGrid/pageButton.js";
import { constants } from "./Data/constants.js";
import { setListPageButton } from "./Components/NewsList/pageButton.js";
import { setFieldTab } from "./Components/NewsList/fieldTab.js";
import { setViewerEvent } from "./Components/NavBar/newsViewer.js";

const $root = document.querySelector("#root");

// observer
const observer = new MutationObserver((mutations) => {
  setHeaderDate();
  renderNewspaper(constants.MIN_PAGE, constants.LIGHT_MODE);
  setGridPageButton();
  setListPageButton();
  setFieldTab();
  setViewerEvent();
});

const option = {
  childList: true,
};

observer.observe($root, option);

// 렌더링
render(App, $root);
