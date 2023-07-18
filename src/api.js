export async function fetchPressInfo() {
  const response = await fetch('../data/press-info.json');
  const json = await response.json();
  return json;
}

export async function fetchListView(index, present) {
  const response = await fetch('../data/list-view.json');
  const json = await response.json();
  const entire = json[index].length;
  const { materials, pid, regDate } = json[index][present];
  return { entire, materials, pid, regDate };
}

export async function fetchPressItem(pid) {
  const response = await fetch('../data/press-info.json');
  const json = await response.json();
  const { name, logo } = json.find(item => item.id === pid);
  return { name, logo };
}
