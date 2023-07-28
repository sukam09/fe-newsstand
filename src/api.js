export async function fetchPressInfo() {
  const response = await fetch('../data/press-info.json');
  const data = await response.json();
  return data;
}

export async function fetchListView() {
  const response = await fetch('../data/list-view.json');
  const data = await response.json();
  return data;
}
