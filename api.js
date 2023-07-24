import { shuffle_press } from "./module/utility/Shuffle.js";

export async function fetchNews(path) {
  const jsonData = await jsonfetch(path);
  return jsonData;
}

//////////
export async function fetchPressData(path) {
  const jsonData = await jsonfetch(path);
  return jsonData;
}

export async function fetchRollingArticle(path) {
  const jsonData = await jsonfetch(path);
  return jsonData;
}

export async function fetchCategoryNews(path) {
  const jsonData = await jsonfetch(path);
  jsonData.forEach((eachCategory) => {
    shuffle_press(eachCategory.press);
  });
  return jsonData;
}

async function jsonfetch(path) {
  return fetch(path).then((response) => {
    return response.json();
  });
}
