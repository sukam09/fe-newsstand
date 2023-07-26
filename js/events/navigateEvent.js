import { globalStore } from '../store/globalVarStore.js';
import { subScribeStore } from '../store/subScribeStore.js';

const Rbtn = document.querySelector('.news-Rbtn');
const Lbtn = document.querySelector('.news-Lbtn');

function initNavEvent() {
  Rbtn.addEventListener('click', () => nextBtn(globalStore.state.KEY));
  Lbtn.addEventListener('click', () => prevBtn(globalStore.state.KEY));
}

function nextBtn(KEY) {
  globalStore.commit('nextIndex', KEY);

  if (KEY === '구독언론_리스트') {
    const scribeNews = subScribeStore.state.subscribeData;
    if (scribeNews.length === globalStore.state.구독언론_리스트.카테고리_인덱스) {
      globalStore.commit('updateCategoryIndex', { key: globalStore.state.KEY, val: scribeNews.length - 1 });
    }
    if (scribeNews.length === 1) globalStore.commit('updateCategoryIndex', { key: globalStore.state.KEY, val: 0 });
  }

  isDisableBtn(KEY);
}

function prevBtn(KEY) {
  globalStore.commit('prevIndex', KEY);

  if (KEY === '전체언론_리스트') {
    if (globalStore.state.전체언론_리스트.뉴스_인덱스 < 0) globalStore.commit('prevCategory');
  }

  isDisableBtn(KEY);
}

function isDisableBtn(KEY) {
  if (KEY === '전체언론_그리드_인덱스') {
    const pageNum = globalStore.state[KEY];
    pageNum ? Lbtn.classList.remove('disabled') : Lbtn.classList.add('disabled');
    pageNum === 3 ? Rbtn.classList.add('disabled') : Rbtn.classList.remove('disabled');
  } else if (KEY === '전체언론_리스트') {
    const pageNum1 = globalStore.state[KEY].카테고리_인덱스;
    const pageNum2 = globalStore.state[KEY].뉴스_인덱스;
    !(pageNum1 || pageNum2) ? Lbtn.classList.add('disabled') : Lbtn.classList.remove('disabled');
  } else if (KEY === '구독언론_리스트') {
    const pageNum = globalStore.state[KEY].카테고리_인덱스;
    pageNum ? Lbtn.classList.remove('disabled') : Lbtn.classList.add('disabled');
    pageNum === subScribeStore.state.subscribeData.length - 1
      ? Rbtn.classList.add('disabled')
      : Rbtn.classList.remove('disabled');
  }
}

export { initNavEvent };
