export default function PressListView({ $target, initialState }) {
  const $section = document.createElement('section');

  $target.appendChild($section);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const fetchPressImage = () => {
    fetch('../data/press-info.json')
      .then(response => response.json())
      .then(json => this.setState({ ...this.state, pressImage: json[0].logo }));
  };

  let isInit = false;

  this.render = () => {
    if (!isInit) {
      fetchPressImage();
    }

    $section.innerHTML = `
      <nav class="field-tab">
        <a class="text-button">종합/경제</a>
        <a class="text-button">방송/통신</a>
        <a class="text-button">IT</a>
        <a class="text-button">영자지</a>
        <a class="text-button">매거진/전문지</a>
        <a class="text-button">지역</a>
      </nav>
      <article class="press-news">
        <div class="press-info">
          <div class="press-name">
            <img class="press-image"/>
          </div>
          <div class="edit-date">2023.02.10. 18:27 편집</div>
          <button class="subscribe-button">구독하기</button>
        </div>
        <div class="news">
          <div class="news-main">
            <img class="thumbnail" />
            <p class="news-main-title">
              또 국민연금의 몽니…현대百 지주사 불발
            </p>
          </div>
          <div class="news-sub">
            <a class="news-sub-title">"위스키 사려고 이틀 전부터 줄 섰어요"</a>
            <a class="news-sub-title">"'방시혁 제국'이냐 '카카오 왕국'이냐…K엔터 누가 거머쥘까"</a>
            <a class="news-sub-title">사용후핵연료 저장시설 포화…이대론 7년 뒤 원전 멈춘다</a>
            <a class="news-sub-title">[단독] 원희룡 "해외건설 근로자 소득공제 월 500만원으로 상향할 것"</a>
            <a class="news-sub-title">태평양에는 우영우의 고래만 있는게 아니었다 [로비의 그림]</a>
            <a class="news-sub-title">LG엔솔, 폴란드 자동차산업협회 가입…“유럽서 목소리 키운다”</a>
            <p class="news-sub-caption">서울경제 언론사에서 직접 편집한 뉴스입니다.</p>
          </div>
        </div>
        <button class="list-right-button">
          <img width="24px" height="40px" src="../asset/icons/right-button.png"/>
        </button>
      </article>
    `;

    if (isInit) {
      const $pressImage = $section.querySelector('.press-image');
      const $thumbnail = $section.querySelector('.thumbnail');

      $pressImage.src = this.state.pressImage;
      $thumbnail.src = '../asset/icons/thumbnail.png';
    }

    isInit = true;
  };

  this.render();
}
