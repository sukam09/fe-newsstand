import SubButton from "../components/allNews/Buttons/SubButton.js";
import Categories from "../components/allNews/ListView/AllListView/Categories.js";
import PressNews from "../components/allNews/ListView/AllListView/PressNews.js";
import SubCategories from "../components/allNews/ListView/SubListView/SubCategories.js";
import SubPressNews from "../components/allNews/ListView/SubListView/SubPressNews.js";
import AllNews from "../components/allNews/index.js";
import store from "../core/Store.js";

export const CATEGORIES_COUNT = 7;
export const PROGRESS_SPEED = 20000;
export const SNACKBAR_DURATION = 5000;
export const LATEST_NEWS_COUNT = 6;
export const ROLLING_SPEED = 5000;
export const GRID_COUNT = 24;

export const GRIDVIEW_ICON = "grid-view";
export const LISTVIEW_ICON = "list-view";

export const pressObj = new PressNews();
export const categoriesObj = new Categories();
export const allNewsObj = new AllNews();
export const subPressObj = new SubPressNews();
export const subCategoriesObj = new SubCategories();

store.subscribe(() => pressObj.render());
store.subscribe(() => subPressObj.newRender());
store.subscribeShowState(() => allNewsObj.callRender());
