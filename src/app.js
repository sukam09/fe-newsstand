import getDate from "./getDate.js";
import {
    initNewsPressData,
    handleClickTitleIcon,
    handleClickPrevPageButton,
    handleClickNextPageButton,
} from "./utils.js";
import { infiniteRolling } from "./rolling.js";

getDate();
initNewsPressData();
handleClickTitleIcon();
handleClickPrevPageButton();
handleClickNextPageButton();
infiniteRolling();
