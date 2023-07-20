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
    globalStore.commit('updateKey', '전체언론_리스트');
  },
  grid: () => {
    newsList.disabled = true;
    newsGrid.disabled = false;
    newsList.src = Tab_Imgs.btnListOff;
    newsGrid.src = Tab_Imgs.thumbOn;
    mediaArea.classList.remove('disabled');
    listArea.classList.add('disabled');
    globalStore.commit('updateKey', '전체언론_그리드_인덱스');
  },
};

function initNewsTabEvent() {
  // 탭을 누르면
  // 그리드 또는 리스트로 화면이 전환됨 display:none
  newsList.addEventListener('click', () => handleListTab());
  newsGrid.addEventListener('click', () => handleGridTab());
}

function handleListTab() {
  changeTabButton('list');
}
function handleGridTab() {
  changeTabButton('grid');
}

function changeTabButton(type) {
  if (type === 'list') UI_Type.list();
  else if (type === 'grid') UI_Type.grid();
}

export { initNewsTabEvent };
