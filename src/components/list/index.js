import { setState, subscribe } from "../../observer/observer.js";
import { fillNewsList, setPageActivateState } from "./NewsList.js";
import { categoryState, listPageState } from "../../store/store.js";
import { CATEGORY_LIST } from "../../constants/constants.js";
import { customFetch, shuffleArrayRandom } from "../../utils/utils.js";
import {
  changeActivateCategory,
  changeNextCategory,
  setCategoryBar,
  startProgress,
  updateCurrentPage,
} from "./ProgressBar.js";

export const setList = async () => {
  const newsList = await customFetch("../../../mocks/newsList.json");
  const categoryList = shuffleArrayRandom(CATEGORY_LIST);

  setState(categoryState, categoryList[0]);

  fillNewsList(newsList)();
  setCategoryBar(categoryList);
  changeActivateCategory(newsList, categoryList)();

  subscribe(listPageState, changeNextCategory(newsList, categoryList));
  subscribe(listPageState, fillNewsList(newsList));
  subscribe(listPageState, updateCurrentPage);
  subscribe(listPageState, setPageActivateState(newsList));

  subscribe(categoryState, startProgress);
  subscribe(categoryState, changeActivateCategory(newsList, categoryList));
};
