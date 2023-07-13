import { addEventListener } from './eventListener.js';
import { initNewsStand } from '../main/newsstnad.js';

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

  const handleBtnList = () => {
    mediaArea.classList.add('disabled');
    listArea.classList.remove('disabled');

    btnList.src = './assets/list-view-on.svg';
    thumb.src = './assets/grid-view-off.svg';

    document.querySelector('.newsstand-area—six-col-list').innerHTML = '';
  };

  const handleBtnThumb = () => {
    initNewsStand();

    mediaArea.classList.remove('disabled');
    listArea.classList.add('disabled');

    btnList.src = './assets/list-view-off.svg';
    thumb.src = './assets/grid-view-on.svg';
  };

  addEventListener('click', btnList, handleBtnList);
  addEventListener('click', thumb, handleBtnThumb);

  // 버튼기능이 바뀜
};

export { initEvent };
