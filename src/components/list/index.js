import {
  changeActivateCategory,
  changeCategory,
  initListPageState,
  initProgress,
  setCategoryBar,
  setPageActivateState,
  startProgress,
  updateCurrentPage,
} from "./ProgressBar.js";
import {
  categoryState,
  isDarkMode,
  isListActivateState,
  listPageState,
} from "../../store/store.js";
import {
  customFetch,
  shuffleArrayRandom,
  shuffleObject,
} from "../../utils/utils.js";
import { fillNewsList } from "./NewsList.js";
import { subscribe } from "../../observer/observer.js";
import { CATEGORY_LIST } from "../../constants/constants.js";

export const setList = async () => {
  const newsList = await customFetch(
    "../../../mocks/newsList.json",
    shuffleObject
  );

  const categoryList = shuffleArrayRandom(CATEGORY_LIST);

  subscribe(listPageState, changeCategory(newsList, categoryList));
  subscribe(listPageState, fillNewsList(newsList));
  subscribe(listPageState, updateCurrentPage);
  subscribe(listPageState, setPageActivateState(newsList));
  subscribe(listPageState, startProgress);

  subscribe(categoryState, changeActivateCategory(newsList, categoryList));
  subscribe(categoryState, startProgress);
  subscribe(categoryState, initListPageState);

  subscribe(isListActivateState, initProgress);

  subscribe(isDarkMode, fillNewsList(newsList));

  setCategoryBar(categoryList);
  fillNewsList(newsList)();
};
