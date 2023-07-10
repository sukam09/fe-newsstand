import getDate from "./header/getDate.js";
import { initNewsPressData } from "./news-display/grid-view/setNewsPressGrid.js";
import { infiniteRolling } from "./news-bar/rolling.js";
import {
    handleClickNextPageButton,
    handleClickPrevPageButton,
} from "./news-display/pageButton.js";
import { handleClickTitleIcon } from "./header/handleTitleIcon.js";

getDate();
initNewsPressData();
handleClickTitleIcon();
handleClickPrevPageButton();
handleClickNextPageButton();
infiniteRolling();
