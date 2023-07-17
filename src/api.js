export async function fetchNewsPress() {
  const res = await fetch('../data/list-view.json');
  const json = await res.json();
  return json;
}

export async function fetchListView(index, present) {
  const res = await fetch('../data/list-view.json');
  const json = await res.json();
  const { materials, name, regDate } = json[index][present];
  return { materials, name, regDate };
}

export async function getPressLogo(name) {
  const res = await fetch('../data/press-info.json');
  const json = await res.json();
  const { logo } = json.find(pressInfo => pressInfo.name === name);
  return logo;
}
