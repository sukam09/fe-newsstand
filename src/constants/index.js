import AllNewsNavigation from "../components/allNews/AllNewsNavigation.js";
import Categories from "../components/allNews/ListView/Categories.js";
import PressNews from "../components/allNews/ListView/PressNews.js";
import AllNews from "../components/allNews/index.js";

export const CATEGORIES_COUNT = 7;
export const PROGRESS_SPEED = 2000;
export const SNACKBAR_DURATION = 5000;
export const LATEST_NEWS_COUNT = 6;
export const ROLLING_SPEED = 5000;

export const pressObj = new PressNews();
export const categoriesObj = new Categories();
export const allNewsObj = new AllNews();
