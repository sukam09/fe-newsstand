import { attachEventListener } from './core/eventListener.js';
import { initNewsStandGrid } from './main/newsstnadGrid.js';
import { initNewsStandList } from './main/newsstandList.js';
import { toggleGridEventListner } from './main/newsstnadGrid.js';
import { toggleListEventListner } from './main/newsstandList.js';

function initEvent() {
  eventRefreshHeaderTitle();
  eventNewsTabList();
}

const eventRefreshHeaderTitle = () => {
  const headerLogo = document.querySelector('.header—title');
  const handleTitleRefresh = () => window.location.reload();

  attachEventListener('click', headerLogo, handleTitleRefresh);
};

const btnList = document.querySelector('.newsstand—btn-list');
const thumb = document.querySelector('.newsstand-btn-thumb');
const mediaArea = document.querySelector('.newsstand__media-area');
const listArea = document.querySelector('.newsstand__list-area');
const tabList = document.querySelector('.newsstand__tab-list');
const thumbList = document.querySelector('.newsstand__tab-thumb');
const Rbtn = document.querySelector('.news-Rbtn');
const Lbtn = document.querySelector('.news-Lbtn');

const AssetsPATH = './assets/';
const NavBtn = {
  btnListOff: `${AssetsPATH}list-view-off.svg`,
  btnListOn: `${AssetsPATH}list-view-on.svg`,
  thumbOff: `${AssetsPATH}grid-view-off.svg`,
  thumbOn: `${AssetsPATH}grid-view-on.svg`,
};

const eventNewsTabList = () => {
  attachEventListener('click', btnList, handleBtnList);
  attachEventListener('click', thumb, handleBtnThumb);
};

function handleBtnList() {
  // if (!tabList.disabled) initNewsStandList();

  thumbList.disabled = false;
  tabList.disabled = true;

  mediaArea.classList.add('disabled');
  listArea.classList.remove('disabled');

  btnList.src = NavBtn.btnListOn;
  thumb.src = NavBtn.thumbOff;

  document.querySelector('.newsstand-area—six-col-list').innerHTML = '';
  Rbtn.classList.remove('newsstand--right-btn', 'disabled');
  Lbtn.classList.remove('newsstand--left-btn');
  Rbtn.classList.add('newslist--right-btn');
  Lbtn.classList.add('newslist--left-btn');

  toggleGridEventListner('detach');
  toggleListEventListner('attach');
}
function handleBtnThumb() {
  if (!thumbList.disabled) initNewsStandGrid();
  thumbList.disabled = true;
  tabList.disabled = false;

  mediaArea.classList.remove('disabled');
  listArea.classList.add('disabled');

  btnList.src = NavBtn.btnListOff;
  thumb.src = NavBtn.thumbOn;

  toggleListEventListner('detach');
  toggleGridEventListner('attach');

  Rbtn.classList.remove('newslist--right-btn');
  Lbtn.classList.remove('newslist--left-btn');
  Rbtn.classList.add('newsstand--right-btn');
  Lbtn.classList.add('newsstand--left-btn');
}

export { initEvent };
