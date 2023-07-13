function fetchData(path) {
  return fetch(path).then((res) => {
    return res.json();
  });
}

export async function getHeadline(path) {
  const headline = await fetchData(path);
  return headline;
}

export async function getPressData(path) {
  const press = await fetchData(path);
  return press;
}

export async function getCategoryData(path) {
  const category = await fetchData(path);
  return category;
}
