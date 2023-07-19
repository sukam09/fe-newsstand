import {
  changeActivateCategory,
  changeActivatePress,
  changeCategory,
  changePress,
  initListPageState,
  initProgress,
  initSubscribeListPageState,
  setHeaderBar,
  setPageActivateState,
  setSubscribePressBar,
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
} from "../../../store/store.js";
import {
  customFetch,
  objectToMap,
  shuffleArrayRandom,
  shuffleObjectRandom,
} from "../../../utils/utils.js";
import { fillNewsList } from "./NewsList.js";
import { subscribe } from "../../../observer/observer.js";
import { CATEGORY_LIST } from "../../../constants/constants.js";

export const setList = async () => {
  const newsList = await customFetch(
    "../../../../mocks/newsList.json",
    shuffleObjectRandom
  );
  const pressNewsList = objectToMap(newsList);

  const categoryList = shuffleArrayRandom(CATEGORY_LIST);

  subscribe(listPageState, changeCategory(newsList, categoryList));
  subscribe(listPageState, updateCurrentPage);
  subscribe(listPageState, setPageActivateState(newsList));
  subscribe(listPageState, startProgress);
  subscribe(listPageState, fillNewsList(newsList, pressNewsList));

  subscribe(subscribeListPageState, changePress(pressNewsList));
  subscribe(subscribeListPageState, startProgress);
  subscribe(subscribeListPageState, fillNewsList(newsList, pressNewsList));

  subscribe(categoryState, changeActivateCategory(newsList, categoryList));
  subscribe(categoryState, initListPageState);

  subscribe(selectedSubscribeState, changeActivatePress);
  subscribe(selectedSubscribeState, startProgress);
  subscribe(selectedSubscribeState, initSubscribeListPageState);

  subscribe(viewState, setHeaderBar(categoryList));
  subscribe(viewState, initProgress);
  subscribe(viewState, fillNewsList(newsList, pressNewsList));

  subscribe(isDarkMode, fillNewsList(newsList, pressNewsList));

  subscribe(subscribeState, setSubscribePressBar);
  subscribe(subscribeState, changePress(pressNewsList));
  subscribe(subscribeState, fillNewsList(newsList, pressNewsList));

  subscribe(viewOptionState, setHeaderBar(categoryList));
  subscribe(viewOptionState, changeActivatePress);
  subscribe(viewOptionState, changeActivateCategory(newsList, categoryList));
  subscribe(viewOptionState, fillNewsList(newsList, pressNewsList));
};
