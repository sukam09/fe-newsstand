async function fetchPressInfos() {
  const response = await fetch("./assets/data/pressInfo.json");
  const jsonData = await response.json();
  return jsonData.pressInfoArr;
}

export {fetchPressInfos}