import { globalStore } from './store/globalVarStore.js';
import { reRenderComponent } from './utils/reRenderComponent.js';

const Rbtn = document.querySelector('.news-Rbtn');
const Lbtn = document.querySelector('.news-Lbtn');

function initNavEvent(KEY) {
  let currentClass = getBtnClass(KEY);
  changeBtnClass(currentClass);
  Rbtn.addEventListener('click', () => nextBtn(KEY));
  Lbtn.addEventListener('click', () => prevBtn(KEY));
}

function getBtnClass(KEY) {
  switch (KEY) {
    case '전체언론_리스트_인덱스':
      return ['newslist--left-btn', 'newslist--right-btn'];
    case '전체언론_그리드_인덱스':
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
  reRenderComponent('GRID_ALL');
  isDisableBtn(KEY);
}

function prevBtn(KEY) {
  globalStore.commit('prevIndex', KEY);
  reRenderComponent('GRID_ALL');
  isDisableBtn(KEY);
}

function isDisableBtn(KEY) {
  const pageNum = globalStore.state[KEY];
  pageNum ? Lbtn.classList.remove('disabled') : Lbtn.classList.add('disabled');
  pageNum === 3 ? Rbtn.classList.add('disabled') : Rbtn.classList.remove('disabled');
}

export { initNavEvent };
