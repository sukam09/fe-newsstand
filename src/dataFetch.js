/**
 언론사 id, 로고 가져옴
 */
async function fetchPressInfos() {
  const response = await fetch("./assets/data/pressInfo.json");
  const jsonData = await response.json();
  return jsonData.pressInfoArr;
}

/**
 언론사 정보와 뉴스 데이터를 가져옴
 */
async function fetchpressNews() {
  const response = await fetch("./assets/data/pressNews.json");
  const jsonData = await response.json();
  return jsonData.pressNewsArr;
}

export {fetchPressInfos, fetchpressNews}