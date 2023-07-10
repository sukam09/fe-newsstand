export default function RecentNewsRollingViewView({ $target }) {
  const $section = document.createElement('section');
  $section.classList.add('recent-news-container');

  this.render = () => {
    $section.innerHTML = `
      <div class="recent-news-item">
      <span class="recent-news-press">연합뉴스</span>
      <span class="recent-news-headline"
        >[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출</span
      >
      </div>
      <div class="recent-news-item">
        <span class="recent-news-press">연합뉴스</span>
        <span class="recent-news-headline"
          >[속보] 與최고위원 본경선, 김병민·김용태·김재원·민영삼</span
        >
      </div>
    `;

    $target.appendChild($section);
  };

  this.render();
}
