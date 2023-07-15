async function fetchData(path) {
  return (await fetch(path)).json();
}
export { fetchData };
