import { getNewsListData } from '../core/apis.js';
import { createCategoryHtml } from '../components/newsCategory.js.js';
import { createNewsListHtml } from '../components/newsStandList.js';
import { shuffle } from '../utils/utils.js';
import { subScribeStore } from '../store/subScribeStore.js';
import { globalStore } from '../store/globalVarStore.js';
import { reRenderComponent } from '../utils/reRenderComponent.js';

let EntireCateGoryCount = 0;

async function initNewsStandList() {
  const datas = await getNewsListData();
  if (globalStore.state.KEY === '전체언론_리스트') {
    const [category, categorysList] = getCategoryDataPaser(datas);
    EntireCateGoryCount = category.length;
    const KEY = category[globalStore.state.전체언론_리스트.카테고리_인덱스];

    const categoryCount = categorysList.filter((name) => name === KEY).length;
    globalStore.commit('updateCateGoryCount', categoryCount);

    createCategoryHtml(category, KEY);
    const NEWS_LIST = getCurrentNewsList(category, datas);
    createNewsListHtml(
      NEWS_LIST[globalStore.state.전체언론_리스트.카테고리_인덱스][globalStore.state.전체언론_리스트.뉴스_인덱스]
    );
    isProgressBarFinish();
    moveSelectedCategory(category);
  } else if (globalStore.state.KEY === '구독언론_리스트') {
    const scribeNews = subScribeStore.state.subscribeData;
    if (scribeNews.length === globalStore.state.구독언론_리스트.카테고리_인덱스) {
      globalStore.commit('updateCategoryIndex', { key: globalStore.state.KEY, val: scribeNews.length - 1 });
    }
    const KEY = scribeNews[globalStore.state.구독언론_리스트.카테고리_인덱스];
    const newsDatas = datas.filter((data) => scribeNews.includes(data.name));
    createCategoryHtml(scribeNews, KEY);
    createNewsListHtml(newsDatas[globalStore.state.구독언론_리스트.카테고리_인덱스]);
  }
}

function getCurrentNewsList(category, datas) {
  const newsList = [];
  category.forEach((d) => newsList.push(datas.filter((data) => data.category === d)));
  return newsList;
}

function getCategoryDataPaser(datas) {
  const categorys = datas.map((data) => data.category);
  const newData = [...new Set(categorys)];
  return [newData, categorys]; // [카테고리, 중복제거 안한 카테고리]
}

function isProgressBarFinish() {
  const progressBar = document.querySelector('.select-category');
  progressBar.addEventListener('animationiteration', () => progressBarHandler());
}

const progressBarHandler = () => {
  globalStore.commit('nextIndex', '전체언론_리스트');
  if (globalStore.state.전체언론_리스트.뉴스_인덱스 >= globalStore.state.전체언론_리스트.전체카테고리) {
    globalStore.commit('nextCategoryIndex');
    if (EntireCateGoryCount - 1 < globalStore.state.전체언론_리스트.카테고리_인덱스)
      globalStore.commit('resetNewsList');
  }
  reRenderComponent('LIST_ALL');
};

function moveSelectedCategory(category) {
  const categoryElement = document.querySelector('.newsstand__category');
  categoryElement.addEventListener('click', (e) => moveSelectedCategoryHandler(e, category));
}

const moveSelectedCategoryHandler = (e, category) => {
  const text = e.target.textContent;
  globalStore.commit('resetNewsIndex');
  globalStore.commit('updateCategoryIndex', { key: globalStore.state.KEY, val: category.indexOf(text) });
  reRenderComponent('LIST_ALL');
};
export { initNewsStandList };
