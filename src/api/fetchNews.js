const url = "../../listView.json";

async function fetchNews() {
  return fetch(url).then((response) => response.json());
}

export default fetchNews;
