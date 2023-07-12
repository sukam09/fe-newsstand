export function PressTab({ $target }) {
  const $section = document.createElement('section');
  $section.classList.add('news-press-display');

  $target.appendChild($section);

  this.render = () => {
    $section.innerHTML = `
      <div class="news-press-tab-container">
        <div class="news-press-type-menu">
          <div class="news-press-tab-menu-activated">전체 언론사</div>
          <div class="news-press-tab-menu">내가 구독한 언론사</div>
        </div>
        <div class="news-press-align-menu">
          <img src="./asset/icons/list-view.svg" alt="리스트 뷰" />
          <img src="./asset/icons/grid-view.svg" alt="그리드 뷰" />
        </div>
      </div>`;
  };

  this.render();
}
