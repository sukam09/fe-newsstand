import { appStore } from "../store/index.js";
import { nextPage, prevPage } from "../store/reducer/page.js";
import { $nextPageButton, $prevPageButton } from "./doms.js";

function handlePrevButtonClick() {
  appStore.dispatch(prevPage());
}

function handleNextButtonClick() {
  appStore.dispatch(nextPage());
}

export const addEventHandlerOnPaginationButton = () => {
  $prevPageButton.addEventListener("click", handlePrevButtonClick);
  $nextPageButton.addEventListener("click", handleNextButtonClick);
};
