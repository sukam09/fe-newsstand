import { html } from '../core/createElement.js';
function createSubView(datas) {
  let htmls = '';
  datas.map((data) => {
    const [name] = data;
    htmls += html`
      <div class="main__content">
        <div class="main-—corp-name">${name}</div>
        <div class="main—-news-area">
          <div class="main—-news-box animate-subview-auto-rolling">
            <div class="main—-news-subview"></div>
            <div class="main—-news-subview"></div>
          </div>
        </div>
      </div>
    `;
  });

  document.querySelector('.main__subview').insertAdjacentHTML('beforeend', htmls);
}

export { createSubView };
