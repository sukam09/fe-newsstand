import { subScribeStore } from '../store/subScribeStore.js';
import { reRenderComponent } from '../utils/reRenderComponent.js';
import { subProgressBar } from '../utils/subProgress.js';

function initNewsSubEvent() {
  //그리드 구독 영역
  subScribeGrid();
  //리스트 구독 영역
  subScribeList();
}

function subScribeGrid() {
  const gird = document.querySelector('.newsstand__media-area');
  gird.addEventListener('click', (e) => GridHandler(e));
  //reRenderComponent('LIST_ALL');
}

const GridHandler = (e) => {
  if (e.target.className === 'back') {
    const frontElement = e.target.closest('.inner').querySelector('.front');
    const data = frontElement.getAttribute('alt');
    hasSubStoreData(data, e.target);
    //reRenderComponent('LIST_ALL');
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
  //reRenderComponent('GRID_ALL');
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
      subScribeStore.commit('subscribe', data);
      titleElement.closest('.list-header').querySelector('.header-btn-subscribe').textContent = 'X';
    } else {
      subScribeStore.commit('unsubscribe', data);
      titleElement.closest('.list-header').querySelector('.header-btn-subscribe').textContent = '+ 구독하기';
    }
    //reRenderComponent('GRID_ALL');
    //reRenderComponent('LIST_ALL');
  }
};

export { initNewsSubEvent };
