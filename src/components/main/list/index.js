import {
  setDragSlider,
  setHeaderBar,
  setSubscribePressBar,
} from "./HeaderBar.js";
import {
  changeActivateCategory,
  changeActivatePress,
  changeCategory,
  changePress,
  initProgress,
  initSubscribeListPageState,
  setPageActivateState,
  startProgress,
  updateCurrentPage,
} from "./ProgressBar.js";
import {
  categoryState,
  isDarkMode,
  viewState,
  listPageState,
  subscribeState,
  viewOptionState,
  selectedSubscribeState,
  subscribeListPageState,
} from "../../../store/storeKey.js";
import {
  customFetch,
  newsObjectToArray,
  shuffleArrayRandom,
  shuffleObjectRandom,
} from "../../../utils/utils.js";
import { fillNewsList } from "./NewsList.js";
import { subscribe } from "../../../store/observer.js";
import { CATEGORY_LIST } from "../../../constants/constants.js";

export const setList = async () => {
  const newsList = await customFetch(
    "../../../../mocks/newsList.json",
    shuffleObjectRandom
  );
  const pressNewsList = newsObjectToArray(newsList);
  const categoryList = shuffleArrayRandom(CATEGORY_LIST);

  setDragSlider();

  subscribe(listPageState, changeCategory(newsList, categoryList));
  subscribe(listPageState, updateCurrentPage);
  subscribe(listPageState, setPageActivateState(newsList));
  subscribe(listPageState, startProgress);
  subscribe(listPageState, fillNewsList(newsList, pressNewsList));

  subscribe(subscribeListPageState, changePress(pressNewsList));
  subscribe(subscribeListPageState, startProgress);
  subscribe(subscribeListPageState, fillNewsList(newsList, pressNewsList));

  subscribe(categoryState, changeActivateCategory(newsList, categoryList));

  subscribe(selectedSubscribeState, changeActivatePress);
  subscribe(selectedSubscribeState, initSubscribeListPageState);

  subscribe(viewState, setHeaderBar(categoryList));
  subscribe(viewState, initProgress);
  subscribe(viewState, fillNewsList(newsList, pressNewsList));

  subscribe(isDarkMode, fillNewsList(newsList, pressNewsList));

  subscribe(subscribeState, setSubscribePressBar);
  subscribe(subscribeState, changePress(pressNewsList));
  subscribe(subscribeState, fillNewsList(newsList, pressNewsList));

  subscribe(viewOptionState, setHeaderBar(categoryList));
  subscribe(viewOptionState, changeActivateCategory(newsList, categoryList));
  subscribe(viewOptionState, fillNewsList(newsList, pressNewsList));
};
