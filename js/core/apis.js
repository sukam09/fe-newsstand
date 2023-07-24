async function getNewsData() {
  return await fetch('./newsHeadData.json').then((response) => response.json());
}
async function getRollingData() {
  return await fetch('./rollingData.json').then((response) => response.json());
}
async function getNewsListData() {
  return await fetch('./newsListData.json').then((response) => response.json());
}
// fetch가 중복이기 때문에 함수 만들기
// 명시적인 선언 api관리
export { getNewsData, getRollingData, getNewsListData };
