async function fetchData(path) {
  return fetch(path)
    .then((res) => res.json())
    .then((data) => {
      return data;
    });
}
export { fetchData };
