export async function fetchData() {
  const response = await fetch("./json/news.json");
  const json = await response.json();
  return json;
}
