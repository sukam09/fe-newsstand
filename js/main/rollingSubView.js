import { getRollingData } from '../core/apis.js';
import { createSubView } from '../components/subView.js';
import { addEventListener } from '../core/eventListener.js';

let RollingData = [];
let Lidx = 1;
let Ridx = 1;

async function initSubView() {
  const rollingData = await getRollingData();
  let datas = rollingDataPaser(rollingData);
  createSubView(datas);
  RollingData = getSubViewData(datas);
  startAnimation();
}

function startAnimation() {
  let [leftData, rightData] = RollingData;
  const subviewElement = document.querySelectorAll('.main—-news-box');
  subviewElement.forEach((element, index) => {
    if (index === 0) {
      setLeftRolling(element, index, leftData);
    } else {
      setRightRolling(element, index, rightData);
    }
  });
}

function setLeftRolling(element, index, data) {
  let interval;
  element.firstElementChild.innerText = data[0];
  element.lastElementChild.innerText = data[1];

  const startInterval = () => {
    interval = setInterval(() => {
      let d = changeLeftNewsData(data);
      element.firstElementChild.innerText = d[0];
      element.lastElementChild.innerText = d[1];
    }, 5000);
  };

  startInterval();

  addEventListener('mouseenter', element, () => {
    clearInterval(interval);
  });

  addEventListener('mouseleave', element, () => {
    clearInterval(interval);
    startInterval();
  });
}

function setRightRolling(element, index, data) {
  let interval;
  element.classList.remove('animate-subview-auto-rolling');
  element.firstElementChild.innerText = data[0];
  element.lastElementChild.innerText = data[1];

  const startInterval = () => {
    interval = setInterval(() => {
      let d = changeRightNewsData(data);
      element.firstElementChild.innerText = d[0];
      element.lastElementChild.innerText = d[1];
    }, 5000);
  };

  setTimeout(() => {
    element.classList.add('animate-subview-auto-rolling');
    startInterval();
  }, 2000);

  addEventListener('mouseenter', element, () => {
    clearInterval(interval);
  });

  addEventListener('mouseleave', element, () => {
    clearInterval(interval);
    startInterval();
  });
}

function changeLeftNewsData(leftSubViewData) {
  let data = leftSubViewData.slice(Lidx, Lidx + 2);
  if (Lidx === 4) {
    data = [leftSubViewData[4], leftSubViewData[0]];
    Lidx = 0;
  } else {
    Lidx++;
  }
  return data;
}
function changeRightNewsData(rightData) {
  let data = rightData.slice(Ridx, Ridx + 2);
  if (Ridx === 4) {
    data = [rightData[4], rightData[0]];
    Ridx = 0;
  } else {
    Ridx++;
  }
  return data;
}

// 데이터 계산
function getSubViewData(datas) {
  datas = datas
    .map((d) => [...d[1]])
    .flat()
    .map((d) => d.article);

  return [datas.slice(0, 5), datas.slice(5)];
}

function rollingDataPaser(datas) {
  return datas.map((data) => [data.name, data.articles]);
}

export { initSubView };
