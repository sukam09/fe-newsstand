import { globalStore } from '../store/globalVarStore.js';
const newsList = document.querySelector('.newsstand__tab-list img');
const newsGrid = document.querySelector('.newsstand__tab-thumb img');
const mediaArea = document.querySelector('.newsstand__media-area');
const listArea = document.querySelector('.newsstand__list-area');
const assetsPath = './assets/';
const Tab_Imgs = {
  btnListOff: `${assetsPath}list-view-off.svg`,
  btnListOn: `${assetsPath}list-view-on.svg`,
  thumbOff: `${assetsPath}grid-view-off.svg`,
  thumbOn: `${assetsPath}grid-view-on.svg`,
};
const UI_Type = {
  list: () => {
    newsList.disabled = false;
    newsGrid.disabled = true;
    newsList.src = Tab_Imgs.btnListOn;
    newsGrid.src = Tab_Imgs.thumbOff;
    mediaArea.classList.add('disabled');
    listArea.classList.remove('disabled');
    if (globalStore.state.OPTION === '전체_언론사') globalStore.commit('updateKey', '전체언론_리스트');
    if (globalStore.state.OPTION === '구독_언론사') globalStore.commit('updateKey', '구독언론_리스트');
  },
  grid: () => {
    newsList.disabled = true;
    newsGrid.disabled = false;
    newsList.src = Tab_Imgs.btnListOff;
    newsGrid.src = Tab_Imgs.thumbOn;
    mediaArea.classList.remove('disabled');
    listArea.classList.add('disabled');
    if (globalStore.state.OPTION === '전체_언론사') globalStore.commit('updateKey', '전체언론_그리드_인덱스');
    if (globalStore.state.OPTION === '구독_언론사') globalStore.commit('updateKey', '구독언론_그리드_인덱스');
  },
};

function initNewsTabEvent() {
  newsList.addEventListener('click', () => changeTabButton('list'));
  newsGrid.addEventListener('click', () => changeTabButton('grid'));
}

function changeTabButton(type) {
  if (type === 'list') UI_Type.list();
  else if (type === 'grid') UI_Type.grid();
}

export { initNewsTabEvent };
