//components
import Component from '../core/Component.js';
import ArrowButton from './ArrowButton.js';
import SubscribeButton from './SubscribeButton.js';
import Icon from '../common/Icon.js';

//constants
import { TEXT } from '../../constants/index.js';

//utils
import { customQuerySelector } from '../../utils/index.js';

//store
import { pageStore, pressStore, viewStore } from '../../../store/index.js';

export default class AllNewsMyListView extends Component {
  setup() {
    this.pressOrder = pressStore.getFilteredPress();
    this.headerList = this.pressOrder.map(({ name }) => name);
    const currentPressIndex =
      pageStore.getPage({ type: TEXT.LIST, option: TEXT.SUBSCRIBE_EN }) % this.headerList.length;

    this.state = {
      currentPressIndex,
      currentPress: this.pressOrder[currentPressIndex],
    };
  }

  template() {
    const logoMode = viewStore.isDarkMode() ? 'logodark' : 'logo';

    return `
      <div class="news-list-wrapper">
        <button class="left-button"></button>

        <div class="newslist-list-view border-default">
          <nav class="border-default surface-alt"></nav>

          <section class="press-news-section">
            <div class="press-news-info">
              <img
                class="press-logo"
                src="src/assets/${logoMode}/${this.state.currentPress?.number}.png"
              />
              <span class="display-medium12 text-default">2023.02.10. 19:38 편집</span>
              <div class="subscribe-button-wrapper"></div>
            </div>

            <div class="press-news-content">
              <div class="press-news-img">
                <div>
                  <img
                    class="border-default available-medium16 text-strong"
                    src=${this.state.currentPress?.main_news.thumbnail + `?${Math.random()}` ?? ''}
                  />
                </div>

                <label class="available-medium16  text-strong"
                  >${this.state.currentPress?.main_news.title}
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

    pageStore.setPage({
      type: TEXT.LIST,
      option: TEXT.SUBSCRIBE_EN,
      page: this.state.currentPressIndex,
    });

    customQuerySelector('.press-header-focus', this.$target).addEventListener(
      'animationiteration',
      this.goNextPage.bind(this),
    );

    new SubscribeButton(customQuerySelector('.subscribe-button-wrapper', this.$target), {
      color: 'gray',
      text: pressStore.isSubscribed(this.state.currentPress.number) ? '' : TEXT.SUBSCRIBE_KO,
      name: this.state.currentPress.name,
      number: this.state.currentPress.number,
    });

    new Icon(customQuerySelector('.chevron-icon', this.$target), { name: 'chevron-right' });

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

    customQuerySelector('.press-header-focus', this.$target).scrollIntoView(false);
  }

  navigationMount() {
    const currentCategory = this.headerList[this.state.currentPressIndex];
    customQuerySelector('nav', this.$target).innerHTML = this.headerList.reduce(
      (innerHTML, press) => {
        if (press === currentCategory) {
          return (
            innerHTML +
            `<li class="press-header-focus surface-brand-alt ">
              <span class="selected-bold14 text-white-default">${press}</span>
              <img class='chevron-icon'/>
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
      this.state.currentPress?.sub_news.reduce(
        (innerHTML, content) =>
          innerHTML +
          `<span class='available-medium16 text-bold news-list-hover'>${content}</span>`,
        '',
      ) +
      `<span class='display-medium14 text-weak'>${this.state.currentPress?.name} 언론사에서 직접 편집한 뉴스입니다.</span>`;
  }

  setEvent() {
    this.$target.addEventListener('click', ({ target }) => {
      if (target.classList.contains('press-type-name')) {
        const targetPress = target.innerHTML;
        const nextIndex = this.headerList.indexOf(targetPress);

        this.setState({
          currentPressIndex: nextIndex,
          currentPress: this.pressOrder[nextIndex],
        });
      }
    });
  }

  goPrevPage() {
    const nextIndex =
      (this.state.currentPressIndex + this.headerList.length - 1) % this.headerList.length;

    this.setState({
      currentPressIndex: nextIndex,
      currentPress: this.pressOrder[nextIndex],
    });
  }

  goNextPage() {
    const nextIndex = (this.state.currentPressIndex + 1) % this.headerList.length;

    this.setState({
      currentPressIndex: nextIndex,
      currentPress: this.pressOrder[nextIndex],
    });
  }
}
