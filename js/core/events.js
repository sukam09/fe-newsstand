import { clickEventListener } from './eventListener.js';

function initEvent() {
  eventRefreshHeaderTitle();
  eventNewsTabList();
}

const eventRefreshHeaderTitle = () => {
  const headerLogo = document.querySelector('.header—title');
  const handleTitleRefresh = () => window.location.reload();

  clickEventListener(headerLogo, handleTitleRefresh);
};

const eventNewsTabList = () => {
  const btnList = document.querySelector('.newsstand—btn-list');
  const thumb = document.querySelector('.newsstand-btn-thumb');
  const mediaArea = document.querySelector('.newsstand__media-area');
  const listArea = document.querySelector('.newsstand__list-area');

  const handleBtnList = () => {
    mediaArea.classList.add('disabled');
    listArea.classList.remove('disabled');

    btnList.src = './assets/list-view-on.svg';
    thumb.src = './assets/grid-view-off.svg';
  };

  const handleBtnThumb = () => {
    mediaArea.classList.remove('disabled');
    listArea.classList.add('disabled');

    btnList.src = './assets/list-view-off.svg';
    thumb.src = './assets/grid-view-on.svg';
  };

  clickEventListener(btnList, handleBtnList);
  clickEventListener(thumb, handleBtnThumb);
};

export { initEvent };
