function fetchData(path) {
  return fetch(path).then((res) => {
    return res.json();
  });
}

export async function fetchHeadline(path) {
  const headline = await fetchData(path);
  return headline;
}
