import getDate from "./header/getDate.js";
import { handleClickTitleIcon } from "./header/handleTitleIcon.js";
import { setGridView } from "./news-display/gridView.js";
import { setNewsBarRolling, infiniteRolling } from "./news-bar/rolling.js";
import { handleClickViewIcon } from "./news-display/setViewMode.js";
import { setCategories } from "./news-display/setCategory.js";
import { setListView } from "./news-display/listView.js";
import { initNewsPressData } from "./news-display/initNewsPressData.js";
import {
    handleClickGridNextButton,
    handleClickGridPrevButton,
    handleClickListNextButton,
    handleClickListPrevButton,
} from "./news-display/handlePageButton.js";

let newsPressData = [];
export let gridPage = 1;
export let pageIndex = 0;

const setGridPage = (num) => {
    gridPage = num;
};
const setListPageIndex = (num) => {
    pageIndex = num;
};

(async function () {
    newsPressData = await initNewsPressData();
    // header
    handleClickTitleIcon();
    getDate();

    // news bar rolling
    setNewsBarRolling();
    infiniteRolling();

    // news display
    handleClickViewIcon();

    setGridView();

    setCategories();
    setListView();

    handleClickGridPrevButton();
    handleClickGridNextButton();
    handleClickListPrevButton();
    handleClickListNextButton();
})();

export { newsPressData, setGridPage, setListPageIndex };
