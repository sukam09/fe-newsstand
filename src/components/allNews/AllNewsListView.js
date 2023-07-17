import { customQuerySelector } from '../../utils/index.js';
import Button from '../common/Button.js';
import Component from '../core/Component.js';
import ArrowButton from './ArrowButton.js';

export default class AllNewsListView extends Component {
  setup() {
    this.state = {
      pressOrder: [
        '종합/경제',
        '방송/통신',
        'IT',
        '영자지',
        '스포츠/연애',
        '매거진/전문지',
        '지역',
      ],
      currentPressIndex: 0,
      currentPage: 1,
      totalPage: 2,
    };
    this.newList = [
      '[與 당권경쟁] 김기현·안철수·천하람·황교안, 본경선 진출',
      '[與 당권경쟁] 김기현·안철수·천하람·황교안, 본경선 진출',
      '[與 당권경쟁] 김기현·안철수·천하람·황교안, 본경선 진출',
      '[與 당권경쟁] 김기현·안철수·천하람·황교안, 본경선 진출',
      '[與 당권경쟁] 김기현·안철수·천하람·황교안, 본경선 진출',
      '[與 당권경쟁] 김기현·안철수·천하람·황교안, 본경선 진출',
    ];
  }

  template() {
    return `
      <div class="news-list-wrapper">
        <button class="left-button"></button>

        <div class="newslist-list-view border-default">
          <nav class="border-default surface-alt"></nav>

          <section class="press-news-section">
            <div class="press-news-info">
              <img class="press-logo" src="src/assets/logo/${0}.png" />
              <span class="display-medium12 text-default">2023.02.10. 19:38 편집</span>
              <div class="subscribe-button-wrapper"></div>
            </div>

            <div class="press-news-content">
              <div class="press-news-img">
                <div>
                  <img
                    class="border-default available-medium16 text-strong"
                    src="https://picsum.photos/200/300"
                  />
                </div>

                <label class="available-medium16  text-strong"
                  >이재명 '억울하고 괴로워도 의연하게 맞설 것'
                </label>
              </div>

              <div class="press-news-detail-list"></div>
            </div>
          </section>
        </div>

        <button class="right-button"></button>
      </div>
    `;
  }

  mounted() {
    this.navigationMount();
    this.detailListMount();

    customQuerySelector('.press-header-focus', this.$target).addEventListener(
      'animationiteration',
      this.goNextPage.bind(this),
    );

    new Button(customQuerySelector('.subscribe-button-wrapper', this.$target), {
      color: 'gray',
      text: '구독하기',
      icon: document.body.className === 'dark' ? 'plus-dark' : 'plus',
      states: 'default',
    });

    new ArrowButton(customQuerySelector('.left-button', this.$target), {
      name: 'left-button',
      isVisible: true,
      action: this.goPrevPage.bind(this),
    });

    new ArrowButton(customQuerySelector('.right-button', this.$target), {
      name: 'right-button',
      isVisible: true,
      action: this.goNextPage.bind(this),
    });
  }

  navigationMount() {
    customQuerySelector('nav', this.$target).innerHTML = this.state.pressOrder.reduce(
      (innerHTML, press, index) => {
        if (index === this.state.currentPressIndex) {
          return (
            innerHTML +
            `<li class="press-header-focus surface-brand-alt ">
              <span class="selected-bold14 text-white-default">${press}</span>
              <div>
                <span class="display-bold12 text-white-default">${this.state.currentPage}</span>
                <span class="display-bold12 text-white-weak"> / ${this.state.totalPage}</span>
              </div>
            </li>`
          );
        }
        return innerHTML + `<li class="text-weak available-medium14 press-type-name">${press}</li>`;
      },
      '',
    );
  }

  detailListMount() {
    customQuerySelector('.press-news-detail-list', this.$target).innerHTML =
      this.newList.reduce(
        (innerHTML, content) =>
          innerHTML +
          `<span class='available-medium16 text-bold news-list-hover'>${content}</span>`,
        '',
      ) +
      `<span class='display-medium14 text-weak'>아주경제 언론사에서 직접 편집한 뉴스입니다.</span>`;
  }

  setEvent() {
    this.$target.addEventListener('click', e => {
      if (e.target.classList.contains('press-type-name')) {
        const targetPress = e.target.innerHTML;
        const currentPressIndex = this.state.pressOrder.indexOf(targetPress);

        this.setState({ currentPressIndex, currentPage: 1 });
      }
    });
  }

  goPrevPage() {
    if (this.state.currentPage === 1) {
      const currentPressIndex =
        (this.state.currentPressIndex + this.state.pressOrder.length - 1) %
        this.state.pressOrder.length;
      this.setState({ currentPressIndex, currentPage: 1 });
    } else {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  }

  goNextPage() {
    if (this.state.currentPage === this.state.totalPage) {
      const currentPressIndex = (this.state.currentPressIndex + 1) % this.state.pressOrder.length;

      this.setState({ currentPressIndex, currentPage: 1 });
    } else {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  }
}
