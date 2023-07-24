import { globalStore } from '../store/globalVarStore.js';
import { reRenderComponent } from '../utils/reRenderComponent.js';
import { subScribeStore } from '../store/subScribeStore.js';
const Rbtn = document.querySelector('.news-Rbtn');
const Lbtn = document.querySelector('.news-Lbtn');

Rbtn.addEventListener('click', () => nextBtn(globalStore.state.KEY));
Lbtn.addEventListener('click', () => prevBtn(globalStore.state.KEY));

function initNavEvent() {
  let currentClass = getBtnClass(globalStore.state.KEY);
  changeBtnClass(currentClass);
}

function getBtnClass(KEY) {
  switch (KEY) {
    case '전체언론_리스트':
      return ['newslist--left-btn', 'newslist--right-btn'];
    case '전체언론_그리드_인덱스':
      return ['newsgrid--left-btn', 'newsgrid--right-btn'];
    case '구독언론_리스트':
      return ['newslist--left-btn', 'newslist--right-btn'];
    case '구독언론_그리드_인덱스':
      return ['newsgrid--left-btn', 'newsgrid--right-btn'];
  }
}

function changeBtnClass(currentClass) {
  const [left, right] = currentClass;

  Lbtn.classList.replace(Lbtn.classList.item(1), left);
  Rbtn.classList.replace(Lbtn.classList.item(1), right);
}

function nextBtn(KEY) {
  globalStore.commit('nextIndex', KEY);
  if (KEY === '전체언론_그리드_인덱스' || KEY === '구독언론_그리드_인덱스') reRenderComponent('GRID_ALL');
  if (KEY === '전체언론_리스트') {
    if (globalStore.state.전체언론_리스트.뉴스_인덱스 >= globalStore.state.전체언론_리스트.전체카테고리)
      globalStore.commit('nextCategoryIndex');
    reRenderComponent('LIST_ALL');
  }
  if (KEY === '구독언론_리스트') {
    reRenderComponent('LIST_ALL');
  }
  isDisableBtn(KEY);
}

function prevBtn(KEY) {
  globalStore.commit('prevIndex', KEY);
  if (KEY === '전체언론_그리드_인덱스' || KEY === '구독언론_그리드_인덱스') reRenderComponent('GRID_ALL');
  if (KEY === '전체언론_리스트') {
    if (globalStore.state.전체언론_리스트.뉴스_인덱스 < 0) globalStore.commit('prevCategoryIndex');
    reRenderComponent('LIST_ALL');
  }
  if (KEY === '구독언론_리스트') {
    reRenderComponent('LIST_ALL');
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
