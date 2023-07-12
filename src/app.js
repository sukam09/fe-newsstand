import getDate from "./header/getDate.js";
import { handleClickTitleIcon } from "./header/handleTitleIcon.js";
import {
    shuffleNewsPress,
    handleClickNextPageButton,
    handleClickPrevPageButton,
} from "./news-display/gridView.js";
import { setNewsBarRolling, infiniteRolling } from "./news-bar/rolling.js";
import { handleClickViewIcon } from "./news-display/setViewMode.js";
import { setCategories } from "./news-display/setCategory.js";
import { setListView } from "./news-display/listView.js";

// header
handleClickTitleIcon();
getDate();

// news bar rolling
setNewsBarRolling();
infiniteRolling();

// news display
handleClickViewIcon();
// initNewsPressData();
shuffleNewsPress();
handleClickPrevPageButton();
handleClickNextPageButton();

setCategories();
setListView();
