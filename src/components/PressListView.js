import {
  ANIMATION_UPDATE_DELAY,
  CATEGORY_NUMBERS,
  PROGRESSBAR_UPDATE_DELTA,
} from '../constants.js';

export default function PressListView({ $target, initialState }) {
  const $section = document.createElement('section');

  const $div = document.createElement('div');
  $div.classList.add('press-list-view');

  const $article = document.createElement('article');
  $article.classList.add('press-news');

  const $leftButton = document.createElement('img');
  const $rightButton = document.createElement('img');

  $leftButton.src = '../asset/icons/left-button.svg';
  $leftButton.classList.add('list-left-button');

  $rightButton.src = '../asset/icons/right-button.svg';
  $rightButton.classList.add('list-right-button');

  $div.appendChild($leftButton);
  $div.appendChild($article);
  $div.appendChild($rightButton);

  $target.appendChild($section);
  $target.appendChild($div);

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
    this.setState({ ...this.state, index: newIndex, present: 1 });
  };

  const initFieldTab = () => {
    $section.innerHTML = `
      <nav class="field-tab">
        ${categories.map(category => `<button class="text-button">${category}</button>`).join('')}
      </nav>
    `;

    const $textButtons = document.querySelectorAll('.text-button');
    Array.from($textButtons).forEach(($textButton, index) => {
      $textButton.addEventListener('click', () => handleClickTextButton(index));
    });
  };

  const setProgressBar = $selectedButton => {
    this.state.percentage += PROGRESSBAR_UPDATE_DELTA;

    // percentage가 정확히 100이 안될 수가 있으므로 등호가 아닌 부등호를 써야 함
    if (this.state.percentage >= 100) {
      const { present, entire } = this.state;

      if (present === entire) {
        this.setState({
          ...this.state,
          index: (this.state.index + 1) % CATEGORY_NUMBERS,
          present: 1,
        });
        return;
      }
      this.setState({ ...this.state, present: this.state.present + 1 });
    }

    $selectedButton.style.background = `linear-gradient(to right, #4362d0 ${this.state.percentage}%, #7890e7 ${this.state.percentage}%)`;
  };

  const initProgressBar = $selectedButton => {
    const { timer, $currentButton } = this.state;

    if (timer !== undefined) {
      $currentButton.style.background = '';
      clearInterval(timer);
    }

    $selectedButton.style.background = '#7890e7';
    this.state.percentage = 0;

    this.state.timer = setInterval(() => setProgressBar($selectedButton), ANIMATION_UPDATE_DELAY);

    this.state.$currentButton = $selectedButton;
  };

  // const handleClickLeftButton = () => {
  //   if () {

  //   }
  //   this.setState({...this.state, })
  // };

  // const handleClickRightButton = () => {

  // };

  let isInit = false;

  this.render = () => {
    if (!isInit) {
      initFieldTab();

      // $leftButton.addEventListener('click', handleClickLeftButton);
      // $rightButton.addEventListener('click', handleClickRightButton);

      isInit = true;
    }

    $article.innerHTML = `
      <div class="press-info">
        <div class="press-name">
          <img class="press-image" />
        </div>
        <div class="edit-date">2023.02.10. 18:27 편집</div>
        <button class="subscribe-button">
          <img src="../asset/icons/plus.svg" />
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
      <!-- <button class="list-right-button">
        <img width="24px" height="40px" src="../asset/icons/right-button.png" />
      </button> -->
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
      <div class="text-button-name">${selectedCategory}</div>
      <div class="text-button-count">
        <p class="text-button-present">${present}</p>
          <img src="../asset/icons/division.svg"/>
        <p class="text-button-entire">${entire}</p>
      </div>
    `;

    initProgressBar($selectedButton);
  };

  this.render();
}
