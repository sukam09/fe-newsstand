export async function fetchPressInfo() {
  const response = await fetch('../data/press-info.json');
  const json = await response.json();
  return json;
}

export async function fetchListView() {
  const response = await fetch('../data/list-view.json');
  const json = await response.json();
  return json;
}
