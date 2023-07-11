import { getRollingData } from '../core/apis.js';
import { html } from '../core/createElement.js';

const $main_subview = document.querySelector('.main__subview');

async function initRollingNews() {
  const rollingData = await getRollingData();
  let datas = rollingDataPaser(rollingData);
  createSubView(datas);
  datas = getSubViewData(datas);
  animateSubView(datas);
}

function createSubView(datas) {
  let htmls = '';
  datas.map((data) => {
    const [name, articles] = data;
    htmls += html`
      <div class="main__content">
        <div class="main-—corp-name">${name}</div>
        <div class="main—-news-box">
          <div class="main—-news-subview">${articles[0].article}</div>
          <div class="main—-news-subview">${articles[1].article}</div>
        </div>
      </div>
    `;
  });

  $main_subview.insertAdjacentHTML('beforeend', htmls);
}

function getSubViewData(datas) {
  datas = datas
    .map((d) => [...d[1]])
    .flat()
    .map((d) => d.article);

  return [datas.slice(0, 5), datas.slice(5)];
}

function animateSubView(datas) {
  let [leftSubViewData, rightSubViewData] = datas;
  const $subview = document.querySelectorAll('.main—-news-subview');

  let Lidx = 0;
  let Ridx = 0;

  const autoLeftViewData = () => {
    let data = leftSubViewData.slice(Lidx, Lidx + 2);

    if (Lidx === 4) {
      data = [leftSubViewData[4], leftSubViewData[0]];
      Lidx = 0;
    } else {
      Lidx++;
    }

    for (let i = 0; i < 2; i++) {
      $subview[i].classList.add('animate-subview-auto-rolling');
      $subview[i].innerHTML = data[i];
    }
  };

  const autoRightViewData = () => {
    let data = rightSubViewData.slice(Ridx, Ridx + 2);

    if (Ridx === 4) {
      data = [rightSubViewData[4], rightSubViewData[0]];
      Ridx = 0;
    } else {
      Ridx++;
    }

    for (let i = 2; i < 4; i++) {
      $subview[i].classList.add('animate-subview-auto-rolling');
      $subview[i].innerHTML = data[i - 2];
    }
  };

  setInterval(autoLeftViewData, 5000);
  setTimeout(() => {
    setInterval(autoRightViewData, 5000);
  }, 1000);
}

function rollingDataPaser(datas) {
  return datas.map((data) => [data.name, data.articles]);
}

export { initRollingNews };
