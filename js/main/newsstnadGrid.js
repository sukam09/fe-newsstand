import { shuffle } from '../utils/utils.js';
import { getNewsData } from '../core/apis.js';
import { paintNewsstand } from '../components/newStandGrid.js';
import { globalStore } from '../store/globalVarStore.js';
import { subScribeStore } from '../store/subScribeStore.js';
let datas = [];

async function initNewsStandGrid() {
  const newsData = await getNewsData();
  if (globalStore.state.OPTION === '전체_언론사') 전체_언론사(newsData);
  else if (globalStore.state.OPTION === '구독_언론사') 내가_구독한_언론사(newsData);
}

function 전체_언론사(newsData) {
  datas = newsDataPaser(newsData);
  paintNewsstand(datas, globalStore.state.전체언론_그리드_인덱스);
}

function 내가_구독한_언론사(newsData) {
  const subscribeData = subScribeStore.state.subscribeData;
  datas = newsData.filter((data) => subscribeData.includes(data.name));
  datas = newsDataPaser(datas);
  while (datas.length < 96) datas.push(['', '']);
  paintNewsstand(datas, globalStore.state.구독언론_그리드_인덱스);
}

function newsDataPaser(datas) {
  return datas.map((data) => [data.name, data.src]);
}
export { initNewsStandGrid };
