import { store } from "../store/index.js";
import { nextPage, prevPage } from "../store/reducer/page.js";
import { $nextPageButton, $prevPageButton } from "./doms.js";

const handlePrevButtonClick = () => {
  store.dispatch(prevPage());
};

const handleNextButtonClick = () => {
  store.dispatch(nextPage());
};

export const addEventOnPaginationButton = () => {
  $prevPageButton.addEventListener("click", handlePrevButtonClick);
  $nextPageButton.addEventListener("click", handleNextButtonClick);
};
