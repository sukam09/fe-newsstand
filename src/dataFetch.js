async function fetchPressInfos() {
  const response = await fetch("./assets/data/pressInfo.json");
  const jsonData = await response.json();
  return jsonData.pressInfoArr;
}

async function fetchpressNews() {
  const response = await fetch("./assets/data/pressNews.json");
  const jsonData = await response.json();
  return jsonData.pressNewsArr;
}

export {fetchPressInfos, fetchpressNews}