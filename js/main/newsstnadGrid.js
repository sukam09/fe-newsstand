import { shuffle } from '../utils/utils.js';
import { getNewsData } from '../core/apis.js';
import { paintNewsstand } from '../components/newStandGrid.js';
import { attachEventListener, detachEventListener } from '../core/eventListener.js';

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
  $ul.innerHTML = '';
  ++SELECTED_PAGE;
  console.log(SELECTED_PAGE);
  paintNewsstand(datas, SELECTED_PAGE);
  isBtnDisabled();
}

function handleLeftBtn() {
  $ul.innerHTML = '';
  --SELECTED_PAGE;
  paintNewsstand(datas, SELECTED_PAGE);
  isBtnDisabled();
}

function isBtnDisabled() {
  SELECTED_PAGE ? $leftBtn.classList.remove('disabled') : $leftBtn.classList.add('disabled');
  SELECTED_PAGE === 3 ? $rightBtn.classList.add('disabled') : $rightBtn.classList.remove('disabled');
}

function newsDataPaser(datas) {
  return datas.map((data) => [data.name, data.src]);
}
export { initNewsStandGrid, toggleGridEventListner };
