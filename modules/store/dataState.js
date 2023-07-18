import { fetchData } from "../utils.js";

export let pressData;
export let categoryData;

export async function setPressData() {
  pressData = await fetchData("/data/press.json");
}

export async function setCategoryData() {
  categoryData = await fetchData("/data/category.json");
}
