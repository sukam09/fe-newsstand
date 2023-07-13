async function getNewsData() {
  return await fetch('./newsHeadData.json').then((response) => {
    return response.json();
  });
}
async function getRollingData() {
  return await fetch('./rollingData.json').then((response) => {
    return response.json();
  });
}

export { getNewsData, getRollingData };
