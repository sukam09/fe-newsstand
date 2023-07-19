import { shuffle } from '../utils/utils.js';
import { getNewsData } from '../core/apis.js';
import { paintNewsstand } from '../components/newStandGrid.js';
// import { attachEventListener, detachEventListener } from '../core/eventListener.js';
// import { subScribeStore } from '../subScribeStore.js';
import { globalStore } from '../store/globalVarStore.js';
// let SELECTED_PAGE = 0;
const $rightBtn = document.querySelector('.newsstand--right-btn');
const $leftBtn = document.querySelector('.newsstand--left-btn');
let datas = [];

async function initNewsStandGrid() {
  const newsData = await getNewsData();
  datas = newsDataPaser(shuffle(newsData));
  paintNewsstand(datas, globalStore.state.전체언론_그리드_인덱스);

  // isSubscribe();
  // SubScribeNews();
}

// function SubScribeNews() {
//   const back = document.querySelectorAll('.back');
//   back.forEach((item) => item.addEventListener('click', (e) => isSubscribeIncludeHandler(e)));

//   const isSubscribeIncludeHandler = (e) => {
//     const tartgetParent = e.target.parentElement.parentElement;
//     const data = tartgetParent.querySelector('.front').getAttribute('alt');

//     if (!subScribeStore.getGetter('getsubscribeData').includes(data)) subScribeStore.commit('setState', data);
//     else {
//       subScribeStore.commit('updateState', data);
//       tartgetParent.querySelector('.back').textContent = '+ 구독하기';
//     }
//   };
// }

// function isSubscribe() {
//   const subscrtionBox = document.querySelectorAll('.newsstand—subscrtion-box');

//   subscrtionBox.forEach((item) => {
//     const inner = item.querySelector('.inner');
//     item.addEventListener('mouseover', (e) => isIncludeSubScribeHandler(e));
//     inner.addEventListener('mouseover', (e) => e.stopPropagation());
//   });

//   const isIncludeSubScribeHandler = (e) => {
//     const currentTargetChildren = e.currentTarget.children[0];
//     const data = currentTargetChildren.querySelector('.front').getAttribute('alt');
//     if (subScribeStore.getGetter('getsubscribeData').includes(data))
//       currentTargetChildren.querySelector('.back').textContent = '해제하기';
//   };
// }

// function toggleGridEventListner(type) {
//   if (type === 'attach') attachGridEvent();
//   else if (type === 'detach') detachGridEvent();
// }

// function handleRightBtn() {
//   ++SELECTED_PAGE;
//   rePaintNewsStand();
// }

// function handleLeftBtn() {
//   --SELECTED_PAGE;
//   rePaintNewsStand();
// }

// function attachGridEvent() {
//   attachEventListener('click', $rightBtn, handleRightBtn);
//   attachEventListener('click', $leftBtn, handleLeftBtn);
// }

// function detachGridEvent() {
//   detachEventListener('click', $rightBtn, handleRightBtn);
//   detachEventListener('click', $leftBtn, handleLeftBtn);
// }

function newsDataPaser(datas) {
  return datas.map((data) => [data.name, data.src]);
}
export { initNewsStandGrid };
