import { shuffle } from '../utils/utils.js';
import { getNewsData } from '../core/apis.js';
import { paintNewsstand } from '../components/newStandGrid.js';
import { attachEventListener, detachEventListener } from '../core/eventListener.js';
import { store } from '../store.js';

let SELECTED_PAGE = 0;
const $ul = document.querySelector('.newsstand-area—six-col-list');
const $rightBtn = document.querySelector('.newsstand--right-btn');
const $leftBtn = document.querySelector('.newsstand--left-btn');
let datas = [];

async function initNewsStandGrid() {
  SELECTED_PAGE = 0;
  toggleGridEventListner('detach');

  const newsData = await getNewsData();
  datas = newsDataPaser(shuffle(newsData));
  paintNewsstand(datas, SELECTED_PAGE);
  pagination();
  isSubscribe();
  SubScribeNews();
}

function SubScribeNews() {
  const back = document.querySelectorAll('.back');
  back.forEach((item) => item.addEventListener('click', (e) => isSubscribeIncludeHandler(e)));

  const isSubscribeIncludeHandler = (e) => {
    const tartgetParent = e.target.parentElement.parentElement;
    const data = tartgetParent.querySelector('.front').getAttribute('alt');

    if (!store.getGetter('getsubscribeData').includes(data)) store.commit('setState', data);
    else {
      store.commit('updateState', data);
      tartgetParent.querySelector('.back').textContent = '+ 구독하기';
    }
  };
}

function isSubscribe() {
  const subscrtionBox = document.querySelectorAll('.newsstand—subscrtion-box');

  subscrtionBox.forEach((item) => {
    const inner = item.querySelector('.inner');
    item.addEventListener('mouseover', (e) => isIncludeSubScribeHandler(e));
    inner.addEventListener('mouseover', (e) => e.stopPropagation());
  });

  const isIncludeSubScribeHandler = (e) => {
    const currentTargetChildren = e.currentTarget.children[0];
    const data = currentTargetChildren.querySelector('.front').getAttribute('alt');
    if (store.getGetter('getsubscribeData').includes(data))
      currentTargetChildren.querySelector('.back').textContent = '해제하기';
  };
}

function pagination() {
  isBtnDisabled();
  attachEventListener('click', $rightBtn, handleRightBtn);
  attachEventListener('click', $leftBtn, handleLeftBtn);
}

function toggleGridEventListner(type) {
  if (type === 'attach') {
    attachEventListener('click', $rightBtn, handleRightBtn);
    attachEventListener('click', $leftBtn, handleLeftBtn);
  } else if (type === 'detach') {
    detachEventListener('click', $rightBtn, handleRightBtn);
    detachEventListener('click', $leftBtn, handleLeftBtn);
  }
}

function handleRightBtn() {
  ++SELECTED_PAGE;
  rePaintNewsStand();
}

function handleLeftBtn() {
  --SELECTED_PAGE;
  rePaintNewsStand();
}

function rePaintNewsStand() {
  $ul.innerHTML = '';
  paintNewsstand(datas, SELECTED_PAGE);
  isBtnDisabled();
  isSubscribe();
  SubScribeNews();
}

function isBtnDisabled() {
  SELECTED_PAGE ? $leftBtn.classList.remove('disabled') : $leftBtn.classList.add('disabled');
  SELECTED_PAGE === 3 ? $rightBtn.classList.add('disabled') : $rightBtn.classList.remove('disabled');
}

function newsDataPaser(datas) {
  return datas.map((data) => [data.name, data.src]);
}
export { initNewsStandGrid, toggleGridEventListner };
