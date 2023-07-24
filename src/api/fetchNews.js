const listUrl = "../../listView.json";
const pressUrl = "../../pressData.json";

async function fetchNews() {
  return fetch(listUrl).then((response) => response.json());
}

async function fetchPress() {
  return fetch(pressUrl).then((response) => response.json());
}
export { fetchNews, fetchPress };
