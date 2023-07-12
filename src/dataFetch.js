async function fetchPressInfos() {
  const response = await fetch("./assets/data/pressInfo.json");
  const jsonData = await response.json();
  return jsonData.pressInfoArr;
}

export {fetchPressInfos}




function initImgs() {
  const $sectionNewsList = document.querySelector('.press-lists');
  const pressList = [];
  const page = [[], [], [], []];
  const ONE_PRESS_CNT = 24;
  const FIRST_PAGE_IDX = 0;

  async function fetchPressInfos() {
    const response = await fetch("./assets/data/pressInfo.json");
    const jsonData = await response.json();
    return jsonData.pressInfoArr;
  }

  async function randomizeImgs(){
    const pressInfoArr = await fetchPressInfos();
    pressInfoArr.forEach(pressInfo => {
      pressList.push({ "id": pressInfo["id"] })
    })

    const shuffledArray = [...pressList].sort(() => Math.random() - 0.5);
    shuffledArray.forEach((pressId, idx) => {
      const pageIndex = Math.floor(idx / ONE_PRESS_CNT);
      page[pageIndex].push(pressId);
    })
  
    $sectionNewsList.innerHTML = `
        ${page[FIRST_PAGE_IDX].map(arr => `<li><img class="pointer" src="./assets/logo/light/img${arr["id"]}.svg"</li>`).join('')};
      `
    turnPage(page);
  }

  randomizeImgs();
}