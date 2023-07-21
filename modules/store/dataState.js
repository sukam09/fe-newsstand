import { fetchData } from "../utils.js";
import { initState } from "./observer.js";

export let pressDataState;
export let categoryDataState;

export async function initPressData() {
  const pressData = await fetchData("/data/press.json");
  pressDataState = initState({
    key: "pressData",
    value: pressData,
  });
}

export async function initCategoryData() {
  const categoryData = await fetchData("/data/category.json");
  categoryDataState = initState({
    key: "categoryData",
    value: categoryData,
  });
}
