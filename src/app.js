import getDate from "./header/getDate.js";
import { handleClickTitleIcon } from "./header/handleTitleIcon.js";
import {
    initNewsPressData,
    handleClickNextPageButton,
    handleClickPrevPageButton,
} from "./news-display/gridView.js";
import { setNewsBarRolling, infiniteRolling } from "./news-bar/rolling.js";
import { handleClickViewIcon } from "./news-display/setViewMode.js";
import { setCategories } from "./news-display/setCategory.js";

// header
handleClickTitleIcon();
getDate();

// news bar rolling
setNewsBarRolling();
infiniteRolling();

// news display
handleClickViewIcon();
initNewsPressData();
handleClickPrevPageButton();
handleClickNextPageButton();

setCategories();
