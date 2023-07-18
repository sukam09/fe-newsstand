export async function fetchPressInfo() {
  const response = await fetch('../data/press-info.json');
  const json = await response.json();
  return json;
}

export async function fetchListView(index, present) {
  const response = await fetch('../data/list-view.json');
  const json = await response.json();
  const { materials, name, regDate } = json[index][present];
  return { materials, name, regDate };
}

export async function getPressLogo(name) {
  const response = await fetch('../data/press-info.json');
  const json = await response.json();
  const { logo } = json.find(pressInfo => pressInfo.name === name);
  return logo;
}
