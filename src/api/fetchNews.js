const listUrl = "../../listView.json";
const pressUrl = "../../pressData.json";

function fetchNews() {
  return fetch(listUrl).then((response) => response.json());
}

function fetchPress() {
  return fetch(pressUrl).then((response) => response.json());
}

export { fetchNews, fetchPress };
