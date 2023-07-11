import getDate from "./header/getDate.js";
import { handleClickTitleIcon } from "./header/handleTitleIcon.js";
import {
    initNewsPressData,
    handleClickNextPageButton,
    handleClickPrevPageButton,
} from "./news-display/utils.js";
import { setNewsBarRolling, infiniteRolling } from "./news-bar/rolling.js";

// header
handleClickTitleIcon();
getDate();

// news bar rolling
setNewsBarRolling();
infiniteRolling();

// news display
initNewsPressData();
handleClickPrevPageButton();
handleClickNextPageButton();
