const newsList = document.querySelector('.newsstand__tab-list img');
const newsGrid = document.querySelector('.newsstand__tab-thumb img');
const mediaArea = document.querySelector('.newsstand__media-area');
const listArea = document.querySelector('.newsstand__list-area');
const assetsPath = './assets/';
const tabImgs = {
  btnListOff: `${assetsPath}list-view-off.svg`,
  btnListOn: `${assetsPath}list-view-on.svg`,
  thumbOff: `${assetsPath}grid-view-off.svg`,
  thumbOn: `${assetsPath}grid-view-on.svg`,
};

function initNewsTabEvent() {
  // 탭을 누르면
  // 그리드 또는 리스트로 화면이 전환됨 display:none
  newsList.addEventListener('click', () => handleListTab());
  newsGrid.addEventListener('click', () => handleGridTab());
}

function handleListTab() {
  console.log('list');
  changeTabButton('list');
}
function handleGridTab() {
  console.log('grid');
  changeTabButton('grid');
}

function changeTabButton(type) {
  if (type === 'list') {
    newsList.disabled = false;
    newsGrid.disabled = true;
    newsList.src = tabImgs.btnListOn;
    newsGrid.src = tabImgs.thumbOff;
    mediaArea.classList.add('disabled');
    listArea.classList.remove('disabled');
  } else if (type === 'grid') {
    newsList.disabled = true;
    newsGrid.disabled = false;
    newsList.src = tabImgs.btnListOff;
    newsGrid.src = tabImgs.thumbOn;
    mediaArea.classList.remove('disabled');
    listArea.classList.add('disabled');
  }
}

export { initNewsTabEvent };
