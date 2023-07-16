import { addEventListener, removeEventListener } from './eventListener.js';
import { initNewsStand } from '../main/newsstnad.js';
import { removeGridBtn, addGridBtn } from '../main/newsstnad.js';
import { addListBtn, removeListBtn } from '../main/newsstandList.js';
function initEvent() {
  eventRefreshHeaderTitle();
  eventNewsTabList();
}

const eventRefreshHeaderTitle = () => {
  const headerLogo = document.querySelector('.header—title');
  const handleTitleRefresh = () => window.location.reload();

  addEventListener('click', headerLogo, handleTitleRefresh);
};

const eventNewsTabList = () => {
  const btnList = document.querySelector('.newsstand—btn-list');
  const thumb = document.querySelector('.newsstand-btn-thumb');
  const mediaArea = document.querySelector('.newsstand__media-area');
  const listArea = document.querySelector('.newsstand__list-area');
  const tabList = document.querySelector('.newsstand__tab-list');
  const thumbList = document.querySelector('.newsstand__tab-thumb');

  function handleBtnList() {
    thumbList.disabled = false;
    tabList.disabled = true;

    mediaArea.classList.add('disabled');
    listArea.classList.remove('disabled');

    btnList.src = './assets/list-view-on.svg';
    thumb.src = './assets/grid-view-off.svg';

    document.querySelector('.newsstand-area—six-col-list').innerHTML = '';
    document.querySelector('.news-Rbtn').classList.remove('newsstand--right-btn');
    document.querySelector('.news-Lbtn').classList.remove('newsstand--left-btn');
    document.querySelector('.news-Rbtn').classList.add('newslist--right-btn');
    document.querySelector('.news-Lbtn').classList.add('newslist--left-btn');

    removeGridBtn();
    addListBtn();
  }

  function handleBtnThumb() {
    if (!thumbList.disabled) initNewsStand();
    thumbList.disabled = true;

    mediaArea.classList.remove('disabled');
    listArea.classList.add('disabled');

    btnList.src = './assets/list-view-off.svg';
    thumb.src = './assets/grid-view-on.svg';

    removeListBtn();
    addGridBtn();

    document.querySelector('.news-Rbtn').classList.add('newsstand--right-btn');
    document.querySelector('.news-Lbtn').classList.add('newsstand--left-btn');
  }

  addEventListener('click', btnList, handleBtnList);
  addEventListener('click', thumb, handleBtnThumb);
};

export { initEvent };
