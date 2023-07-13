async function getNewsData() {
  return await fetch('./newsHeadData.json').then((response) => response.json());
}
async function getRollingData() {
  return await fetch('./rollingData.json').then((response) => response.json());
}
async function getNewsLIstData() {
  return await fetch('./newsListData.json').then((response) => response.json());
}

export { getNewsData, getRollingData, getNewsLIstData };
