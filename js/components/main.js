import { html } from "../createElement.js";

const main = html`<main id="main" role="contents">
  <section class="main__subview">
    <div class="main__content">
      <div class="main-—corp-name">연합뉴스</div>
      <div class="main—-news-box">
        삼성전자 2분기 영업익 6천억…사실상 '바닥' 확인 평가
      </div>
    </div>
    <div class="main__content">
      <div class="main-—corp-name">해럴드경제</div>
      <div class="main—-news-box">
        지난달 '천둥·번개친 날' 역대 1위…기온은 역대 4위
      </div>
    </div>
  </section>
  <section id="newsstand">
    <div class="newsstand__media-nav">
      <div class="newsstand__tab">
        <div class="newsstand—text-clicked">전체 언론사</div>
        <div class="newsstand—text-unclicked">내가 구독한 언론사</div>
      </div>
      <div class="newsstand__tab">
        <button>
          <img class="newsstand—btn-list" src="./assets/list-view.svg" alt="" />
        </button>
        <button>
          <img
            class="newsstand-btn-thumb"
            src="./assets/grid-view.svg"
            alt=""
          />
        </button>
      </div>
    </div>
    <button class="newsstand--left-btn btn-disabled">
      <img src="./assets/LeftButton.png" alt="" />
    </button>
    <div class="newsstand__media-area">
      <ul class="newsstand-area—six-col-list"></ul>
    </div>
    <button class="newsstand--right-btn">
      <img src="./assets/RightButton.svg" alt="" />
    </button>
  </section>
</main>`;

export { main };
