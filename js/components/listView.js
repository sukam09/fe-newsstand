import { html } from '../core/createElement.js';
import { subScribeStore } from '../store/subScribeStore.js';

function listView(d) {
  let template = '';
  if (!d) {
    template = html` <div></div> `;
  } else {
    template = html`
    <div class="list-header">
      <div class="list-header-title">${d.name}</div>
      <div class="list-header-sub">
        <span class="header-sub">${d.edit_date} 편집</span>
      </div>
      <button class="header-btn-subscribe">
      ${subScribeStore.getGetter('getsubscribeData').includes(d.name) ? 'X' : '+ 구독하기'}
      </button>
    </div>
    <div class="list__main">
      <div class="list__main-left">
        <img class="list__newsimg" src=${d.main_news.thumbnail}></img>
        <div class="list__newstitle">${d.main_news.title}</div>
      </div>
      <div class="list__main-right">
        <ul class="list__news-list">
        ${d.sub_news.map((news) => `<li>${news}</li>`).join('\n')}
        </ul>
      </div>
    </div>
  `;
  }

  document.querySelector('.newsstand__list-box').innerHTML = '';
  document.querySelector('.newsstand__list-box').insertAdjacentHTML('beforeend', template);
}

export { listView };
