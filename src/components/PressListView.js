export default function PressListView({ $target, initialState }) {
  const $section = document.createElement('section');
  const $article = document.createElement('article');
  $article.classList.add('press-news');

  $target.appendChild($section);
  $target.appendChild($article);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const { categories } = this.state;

  const handleClickTextButton = newIndex => {
    if (this.state.index === newIndex) {
      return;
    }
    this.setState({ ...this.state, index: newIndex });
  };

  const initFieldTab = () => {
    $section.innerHTML = `
      <nav class="field-tab">
        ${categories.map(category => `<a class="text-button">${category}</a>`).join('')}
      </nav>
    `;

    const $textButtons = document.querySelectorAll('.text-button');
    Array.from($textButtons).forEach(($textButton, index) => {
      $textButton.addEventListener('click', () => handleClickTextButton(index));
    });
  };

  let isInit = false;

  this.render = () => {
    if (!isInit) {
      initFieldTab();
      isInit = true;
    }

    $article.innerHTML = `
      <div class="press-info">
        <div class="press-name">
          <img class="press-image" />
        </div>
        <div class="edit-date">2023.02.10. 18:27 편집</div>
        <button class="subscribe-button">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Symbol">
              <path
                id="Vector"
                d="M19 12.998H13V18.998H11V12.998H5V10.998H11V4.99799H13V10.998H19V12.998Z"
                fill="#879298"
              />
            </g>
          </svg>
          <p>구독하기</p>
        </button>
      </div>
      <div class="news">
        <div class="news-main">
          <img class="thumbnail" />
          <p class="news-main-title">또 국민연금의 몽니…현대百 지주사 불발</p>
        </div>
        <div class="news-sub">
          <a class="news-sub-title">"위스키 사려고 이틀 전부터 줄 섰어요"</a>
          <a class="news-sub-title">"'방시혁 제국'이냐 '카카오 왕국'이냐…K엔터 누가 거머쥘까"</a>
          <a class="news-sub-title">사용후핵연료 저장시설 포화…이대론 7년 뒤 원전 멈춘다</a>
          <a class="news-sub-title"
            >[단독] 원희룡 "해외건설 근로자 소득공제 월 500만원으로 상향할 것"</a
          >
          <a class="news-sub-title">태평양에는 우영우의 고래만 있는게 아니었다 [로비의 그림]</a>
          <a class="news-sub-title">LG엔솔, 폴란드 자동차산업협회 가입…“유럽서 목소리 키운다”</a>
          <p class="news-sub-caption">서울경제 언론사에서 직접 편집한 뉴스입니다.</p>
        </div>
      </div>
      <button class="list-right-button">
        <img width="24px" height="40px" src="../asset/icons/right-button.png" />
      </button>
    `;

    const $pressImage = $article.querySelector('.press-image');
    const $thumbnail = $article.querySelector('.thumbnail');

    $pressImage.src = '../asset/logos/press1.png';
    $thumbnail.src = '../asset/icons/thumbnail.png';

    const { index, present, entire, categories } = this.state;

    const $textButtons = $section.querySelectorAll('.text-button');
    Array.from($textButtons).forEach(($textButton, index) => {
      const category = categories[index];
      $textButton.textContent = category;
      $textButton.classList.remove('text-button-selected');
    });

    const $selectedButton = $textButtons[index];
    const selectedCategory = $selectedButton.textContent;

    $selectedButton.classList.add('text-button-selected');
    $selectedButton.innerHTML = `
      <div>${selectedCategory}</div>
      <div class="text-button-count">
        <p class="text-button-present">${present}</p>
        <img src="../asset/icons/division.svg"/>
        <p class="text-button-entire">${entire}</p>
      </div>
    `;
  };

  this.render();
}
