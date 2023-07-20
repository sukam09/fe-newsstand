import { subScribeStore } from '../store/subScribeStore.js';
import { reRenderComponent } from '../utils/reRenderComponent.js';
import { subProgressBar } from '../utils/subProgress.js';

function initNewsSubEvent() {
  //그리드 구독 영역
  subNewsGrid();
  //리스트 구독 영역
  subNewsList();
}

function subNewsGrid() {
  const gird = document.querySelector('.newsstand__media-area');
  gird.addEventListener('click', (e) => GridBoxHandler(e));
  //reRenderComponent('LIST_ALL');
}

const GridBoxHandler = (e) => {
  if (e.target.className === 'back') {
    const frontElement = e.target.closest('.inner').querySelector('.front');
    const data = frontElement.getAttribute('alt');
    hasSubStoreData(data, e.target);
    reRenderComponent('LIST_ALL');
  }
};

const hasSubStoreData = (data, element) => {
  const checkData = subScribeStore.getGetter('getsubscribeData').includes(data);
  if (!checkData) {
    subProgressBar();
    subScribeStore.commit('setState', data);
    element.textContent = '해제하기';
  } else {
    subScribeStore.commit('updateState', data);
    element.textContent = '+ 구독하기';
  }
};

function subNewsList() {
  const list = document.querySelector('.newsstand__list-area');
  list.addEventListener('click', (e) => NewsBoxHandler(e));
}

const NewsBoxHandler = (e) => {
  const targetClassName = e.target.className;
  if (targetClassName === 'header-btn-subscribe') {
    const titleElement = e.target.closest('.list-header').querySelector('.list-header-title');
    const data = titleElement.textContent;
    if (!subScribeStore.getGetter('getsubscribeData').includes(data)) {
      subScribeStore.commit('setState', data);
      titleElement.closest('.list-header').querySelector('.header-btn-subscribe').textContent = 'X';
    } else {
      subScribeStore.commit('updateState', data);
      titleElement.closest('.list-header').querySelector('.header-btn-subscribe').textContent = '+ 구독하기';
    }
    reRenderComponent('GRID_ALL');
  }
};

export { initNewsSubEvent };
