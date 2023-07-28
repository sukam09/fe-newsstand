import { store } from '../../core/store.js';
import { shuffle, getSubscribed, handleSubscribe } from '../utils.js';
import { NEWS_PRESS_NUMBERS_PER_PAGE, SUBSCRIBE_MESSAGE } from '../constants.js';

import SubscribeButton from './common/SubscribeButton.js';
import SnackBar from './common/SnackBar.js';
import Alert from './common/Alert.js';

export default function PressGridView({ $target, initialState, onChangeTab, clearTimer }) {
  const $section = document.createElement('section');
  $section.classList.add('news-press-display');

  $target.appendChild($section);

  this.state = initialState;

  this.setState = (nextState, isRender = true) => {
    this.state = nextState;
    if (isRender) {
      this.render();
    }
  };

  function calculateMaxPage(data) {
    return Math.ceil(data.length / NEWS_PRESS_NUMBERS_PER_PAGE);
  }

  const initPressItems = () => {
    const myPress = store.getMyPress().map(({ pid }) => pid);
    const data = this.state.press === 'all' ? shuffle(this.state.pressInfoData) : myPress;
    if (this.state.press === 'my') {
      this.setState({ ...this.state, maxPage: calculateMaxPage(myPress) }, false);
    }

    const $ul = $section.querySelector('ul');
    $ul.innerHTML = '';

    const { page, pidMap } = this.state;

    const startIndex = NEWS_PRESS_NUMBERS_PER_PAGE * (page - 1);
    const endIndex = startIndex + NEWS_PRESS_NUMBERS_PER_PAGE - 1;
    const currentData = data.slice(startIndex, endIndex + 1);

    currentData.forEach(item => {
      const id = this.state.press === 'all' ? item.id : item;
      let name, logo;

      if (this.state.press === 'all') {
        name = item.name;
        logo = item.logo;
      } else {
        ({ name, logo } = pidMap.get(parseInt(id, 10)));
      }

      const $li = document.createElement('li');
      const $img = document.createElement('img');

      $img.src = logo;
      $img.classList.add('press-logo');

      $li.appendChild($img);

      $li.classList.add('news-press-item');
      $li.classList.add('data-id');
      $li.classList.add('data-name');

      $li.dataset.id = id;
      $li.dataset.name = name;

      const subscribeButton = new SubscribeButton({
        $target: $li,
        initialState: {
          type: 'grid',
          isSubscribed: this.state.press === 'my' ? true : getSubscribed(parseInt(id, 10)),
        },
      });

      $li.addEventListener('click', event => handleClickCell(event, subscribeButton));

      $ul.appendChild($li);
    });
  };

  const handleClickCell = ({ target }, subscribeButton) => {
    // dataset에서 꺼낸 id는 string임에 주의
    let id = target.dataset.id;
    let name = target.dataset.name;

    // li가 아닌 element를 클릭했을 경우
    if (id === undefined) {
      const dataset = target.closest('li').dataset;
      id = dataset.id;
      name = dataset.name;
    }

    handleSubscribe(parseInt(id, 10), name, this, subscribeButton);
  };

  const validatePage = page => {
    const { minPage, maxPage } = this.state;
    return page >= minPage && page <= maxPage;
  };

  const handleMovePage = page => {
    if (!validatePage(page)) {
      return;
    }
    this.setState({ ...this.state, page });
  };

  const checkShowPageButton = ($prevPageButton, $nextPageButton) => {
    $prevPageButton.classList.remove('disabled');
    $nextPageButton.classList.remove('disabled');

    const { minPage, maxPage } = this.state;

    if (this.state.page === minPage) {
      $prevPageButton.classList.add('disabled');
    }
    if (this.state.page === maxPage) {
      $nextPageButton.classList.add('disabled');
    }
  };

  const updateGridView = () => {
    const { press, view, page } = this.state;

    if (view !== 'grid' || press === 'all') {
      return;
    }

    const myPress = store.getMyPress().map(({ pid }) => pid);
    if (myPress.length === 0) {
      onChangeTab('all', 'grid');
      return;
    }

    const maxPage = calculateMaxPage(myPress);

    if (page > maxPage) {
      this.setState({ ...this.state, page: page - 1 }, false);
    }

    this.setState({ ...this.state, data: myPress });
  };

  this.render = () => {
    clearTimer();

    $section.innerHTML = `
      <div class="news-press-container">
        <ul class="news-press-grid-container">
        </ul>
        <button class="left-arrow-button">
          <img src="./asset/icons/left-button.svg" alt="왼쪽 화살표" />
        </button>
        <button class="right-arrow-button">
          <img src="./asset/icons/right-button.svg" alt="오른쪽 화살표" />
        </button>
      </div>
    `;

    const $prevPageButton = $section.querySelector('.left-arrow-button');
    const $nextPageButton = $section.querySelector('.right-arrow-button');

    initPressItems();
    checkShowPageButton($prevPageButton, $nextPageButton);

    $prevPageButton.addEventListener('click', () => handleMovePage(this.state.page - 1));
    $nextPageButton.addEventListener('click', () => handleMovePage(this.state.page + 1));

    this.snackBar = new SnackBar({
      $target: $section,
      initialState: {
        isShow: false,
        text: SUBSCRIBE_MESSAGE,
      },
    });

    this.alert = new Alert({
      $target: $section,
      initialState: {
        isShow: false,
        pressName: '',
      },
    });
  };

  this.render();

  store.subscribe(updateGridView);
}
