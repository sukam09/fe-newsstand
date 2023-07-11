import getDate from "./header/getDate.js";
import { handleClickTitleIcon } from "./header/handleTitleIcon.js";
import {
    initNewsPressData,
    handleClickNextPageButton,
    handleClickPrevPageButton,
} from "./news-display/utils.js";
import { setNewsBarRolling, infiniteRolling } from "./news-bar/rolling.js";
import { handleClickViewIcon } from "./news-display/setViewMode.js";
import { setCurrentCategory } from "./news-display/setCurrentCategory.js";

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

setCurrentCategory();
