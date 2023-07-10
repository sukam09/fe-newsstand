async function getNewsData() {
  return await fetch('./newsData.json').then((response) => {
    return response.json();
  });
}
async function getRollingData() {
  return await fetch('./rollingData.json').then((response) => {
    return response.json();
  });
}
export { getNewsData, getRollingData };
