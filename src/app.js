import getDate from "./header/getDate.js";
import { handleClickTitleIcon } from "./header/handleTitleIcon.js";
import {
    initNewsPressData,
    handleClickNextPageButton,
    handleClickPrevPageButton,
} from "./news-display/utils.js";
import { infiniteRolling } from "./news-bar/rolling.js";

getDate();
initNewsPressData();
handleClickTitleIcon();
handleClickPrevPageButton();
handleClickNextPageButton();
infiniteRolling();
