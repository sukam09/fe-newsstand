import { pageStore, pressStore, viewStore } from '../../../store/index.js';
import { LIST_KEYS_TEMPLATE, TEXT } from '../../constants/index.js';
import { customQuerySelector } from '../../utils/index.js';
import Component from '../core/Component.js';
import ArrowButton from './ArrowButton.js';
import SubscribeButton from './SubscribeButton.js';

export default class AllNewsListView extends Component {
  setup() {
    this.pressOrder = this.getListPress();
    this.headerList = this.getHeaderList();

    this.state = {
      currentPage: pageStore.allTypeListPage,
      currentPress: this.getCurrentPress(pageStore.allTypeListPageIndex, pageStore.allTypeListPage),
      currentPressIndex: pageStore.allTypeListPageIndex,
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
                src="src/assets/${logoMode}/${this.state.currentPress?.number ?? 0}.png"
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
    this.savePage({ page: this.state.currentPage, index: this.state.currentPressIndex });

    customQuerySelector('.press-header-focus', this.$target).addEventListener(
      'animationiteration',
      this.goNextPage.bind(this),
    );

    new SubscribeButton(customQuerySelector('.subscribe-button-wrapper', this.$target), {
      color: 'gray',
      text: pressStore.subscribedList.includes(this.state.currentPress.number)
        ? ''
        : TEXT.SUBSCRIBE_KO,
      name: this.state.currentPress.name,
      number: this.state.currentPress.number,
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
    const currentCategory = this.headerList[this.state.currentPressIndex];

    const totalPage = this.pressOrder[currentCategory]?.length;

    customQuerySelector('nav', this.$target).innerHTML = this.headerList.reduce(
      (innerHTML, press) => {
        if (press === currentCategory) {
          return (
            innerHTML +
            `<li class="press-header-focus surface-brand-alt ">
              <span class="selected-bold14 text-white-default">${press}</span>
              <div>
                <span class="display-bold12 text-white-default">${this.state.currentPage}</span>
                <span class="display-bold12 text-white-weak"> / ${totalPage}</span>
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
      this.state.currentPress?.sub_news.reduce(
        (innerHTML, content) =>
          innerHTML +
          `<span class='available-medium16 text-bold news-list-hover'>${content}</span>`,
        '',
      ) +
      `<span class='display-medium14 text-weak'>${this.state.currentPress?.name} 언론사에서 직접 편집한 뉴스입니다.</span>`;
  }

  setEvent() {
    this.$target.addEventListener('click', e => {
      if (e.target.classList.contains('press-type-name')) {
        const targetPress = e.target.innerHTML;
        const currentPressIndex = this.headerList.indexOf(targetPress);

        this.setState({
          currentPressIndex,
          currentPage: 1,
          currentPress: this.getCurrentPress(currentPressIndex),
        });
      }
    });
  }

  goPrevPage() {
    if (this.state.currentPage === 1) {
      const currentPressIndex =
        (this.state.currentPressIndex + this.headerList.length - 1) % this.headerList.length;
      this.setState({
        currentPressIndex,
        currentPage: 1,
        currentPress: this.getCurrentPress(currentPressIndex, 1),
      });
    } else {
      this.setState({
        currentPage: this.state.currentPage - 1,
        currentPress: this.getCurrentPress(
          this.state.currentPressIndex,
          this.state.currentPage - 1,
        ),
      });
    }
  }

  goNextPage() {
    const currentCategory = this.headerList[this.state.currentPressIndex];
    const totalPage = this.pressOrder[currentCategory].length;

    if (this.state.currentPage === totalPage) {
      const currentPressIndex = (this.state.currentPressIndex + 1) % this.headerList.length;

      this.setState({
        currentPressIndex,
        currentPage: 1,
        currentPress: this.getCurrentPress(currentPressIndex, 1),
      });
    } else {
      this.setState({
        currentPage: this.state.currentPage + 1,
        currentPress: this.getCurrentPress(
          this.state.currentPressIndex,
          this.state.currentPage + 1,
        ),
      });
    }
  }

  getCurrentPress(pressIndex = 0, currentPage = 1) {
    const currentPressName = this.headerList[pressIndex];
    return this.pressOrder[currentPressName][currentPage - 1];
  }

  getHeaderList() {
    return Object.keys(this.pressOrder);
  }

  getListPress() {
    const listPress = {};
    LIST_KEYS_TEMPLATE.forEach(category => (listPress[category] = []));
    pressStore.getAllPress().forEach(press => listPress[press.category].push(press));
    return listPress;
  }

  savePage({ page, index }) {
    pageStore.setPage({
      page,
      index,
      type: TEXT.LIST,
      option: TEXT.ALL,
    });
  }
}
