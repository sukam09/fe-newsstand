async function getNewsData() {
  return await fetch('./newsData.json').then((response) => {
    return response.json();
  });
}

export { getNewsData };
