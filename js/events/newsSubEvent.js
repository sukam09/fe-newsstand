import { subScribeStore } from '../store/subScribeStore.js';
import { subProgressBar } from '../utils/subProgress.js';

function initNewsSubEvent() {
  subScribeGrid();
  subScribeList();
}

function subScribeGrid() {
  const grid = document.querySelector('.newsstand__media-area');
  grid.addEventListener('click', (e) => GridHandler(e));
}

const GridHandler = (e) => {
  if (e.target.className === 'back') {
    const frontElement = e.target.closest('.inner').querySelector('.front');
    const data = frontElement.getAttribute('alt');
    hasSubStoreData(data, e.target);
  }
};

const hasSubStoreData = (data, element) => {
  const checkData = subScribeStore.getGetter('getsubscribeData').includes(data);
  if (!checkData) {
    subProgressBar();
    subScribeStore.commit('subscribe', data);
    element.textContent = '해제하기';
  } else {
    subScribeStore.commit('unsubscribe', data);
    element.textContent = '+ 구독하기';
  }
};

function subScribeList() {
  const list = document.querySelector('.newsstand__list-area');
  list.addEventListener('click', (e) => ListHandler(e));
}

const ListHandler = (e) => {
  const targetClassName = e.target.className;
  if (targetClassName === 'header-btn-subscribe') {
    const titleElement = e.target.closest('.list-header').querySelector('.list-header-title');
    const data = titleElement.textContent;
    if (!subScribeStore.getGetter('getsubscribeData').includes(data)) {
      subProgressBar();
      titleElement.closest('.list-header').querySelector('.header-btn-subscribe').textContent = 'X';
      subScribeStore.commit('subscribe', data);
    } else {
      titleElement.closest('.list-header').querySelector('.header-btn-subscribe').textContent = '+ 구독하기';
      subScribeStore.commit('unsubscribe', data);
    }
  }
};

export { initNewsSubEvent };
