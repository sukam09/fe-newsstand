import { getNewsListData } from '../../core/apis.js';
import { categoryView } from '../../components/categoryView.js';
import { listView } from '../../components/listView.js';
import { shuffle } from '../../utils/utils.js';
import { subScribeStore } from '../../store/subScribeStore.js';
import { globalStore } from '../../store/globalVarStore.js';

subScribeStore.subscribe(() => initNewsStandList());
globalStore.subscribe(() => initNewsStandList());

async function initNewsStandList() {
  const datas = await getNewsListData();
  if (globalStore.state.KEY === '전체언론_리스트') 전체_언론사(datas);
  else if (globalStore.state.KEY === '구독언론_리스트') 구독_언론사(datas);
}

function 전체_언론사(datas) {
  const [category, categorysList] = getCategoryDataPaser(datas);
  const newsDatas = getCurrentNewsList(category, datas);
  const KEY = category[globalStore.state.전체언론_리스트.카테고리_인덱스];
  const categoryCount = categorysList.filter((name) => name === KEY).length;

  if (globalStore.state.전체언론_리스트.뉴스_인덱스 === categoryCount) globalStore.commit('nextCategory');

  categoryView(category, KEY, categoryCount);
  listView(newsDatas[globalStore.state.전체언론_리스트.카테고리_인덱스][globalStore.state.전체언론_리스트.뉴스_인덱스]);

  progressBar(categoryCount, category.length);
  moveSelectedCategory(category);
}

function 구독_언론사(datas) {
  const scribeNews = subScribeStore.state.subscribeData;
  const KEY = scribeNews[globalStore.state.구독언론_리스트.카테고리_인덱스];
  const newsDatas = getSubscribeNewsList(scribeNews, datas);

  categoryView(scribeNews, KEY);
  listView(newsDatas[globalStore.state.구독언론_리스트.카테고리_인덱스]);

  SubProgressBar(scribeNews.length);
  moveSelectedSub(scribeNews);
}

function getSubscribeNewsList(scribeNews, datas) {
  const newsList = [];
  scribeNews.forEach((category) => newsList.push(...datas.filter((d) => d.name === category)));
  return newsList;
}

function getCurrentNewsList(category, datas) {
  const newsList = [];
  category.forEach((d) => newsList.push(datas.filter((data) => data.category === d)));
  return newsList;
}

function getCategoryDataPaser(datas) {
  const categorys = datas.map((data) => data.category);
  const newData = [...new Set(categorys)];
  return [newData, categorys];
}

function progressBar(categoryCount, entireCateGoryCount) {
  const progressBar = document.querySelector('.select-category');
  progressBar.addEventListener('animationiteration', () =>
    globalStore.commit('categoryProgress', { len: categoryCount, total: entireCateGoryCount }, { once: true })
  );
}

function SubProgressBar(len) {
  const progressBar = document.querySelector('.select-category');
  if (!len) return;
  progressBar.addEventListener('animationiteration', () => globalStore.commit('categoryProgress', len), { once: true });
}

function moveSelectedCategory(category) {
  const categoryElement = document.querySelector('.newsstand__category');
  categoryElement.addEventListener('click', (e) => moveSelectedCategoryHandler(e, category), { once: true });
}

const moveSelectedCategoryHandler = (e, category) => {
  const text = e.target.textContent;
  globalStore.commit('categorySelect', { val: category.indexOf(text) });
};

function moveSelectedSub(scribeNews) {
  const categoryElement = document.querySelector('.newsstand__category');
  categoryElement.addEventListener('click', (e) => moveSelectedSubHandler(e, scribeNews), { once: true });
}

const moveSelectedSubHandler = (e, scribeNews) => {
  const text = e.target.textContent;
  globalStore.commit('categorySelect', { val: scribeNews.indexOf(text) });
};
export { initNewsStandList };
