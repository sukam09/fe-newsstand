import PressNews from "../components/allNews/ListView/PressNews.js";

export const CATEGORIES_COUNT = 7;
export const PROGRESS_SPEED = 2000;
export const SNACKBAR_DURATION = 5000;
export const LATEST_NEWS_COUNT = 6;
export const ROLLING_SPEED = 5000;

export const pressData = await fetchData();
export const pressObj = new PressNews(pressData);

async function fetchData() {
  const response = await fetch("/src/data/press-data.json");
  const pressData = await response.json();
  return pressData;
}
