import { fetchPressInfo } from '../api.js';
import { shuffle } from '../utils.js';
import { store, actionCreator } from '../../store/store.js';
import { NEWS_PRESS_NUMBERS_PER_PAGE, PAGE_MIN_NUMBER, PAGE_MAX_NUMBER } from '../constants.js';

import SubscribeButton from './common/SubscribeButton.js';

export default function PressGridView({ $target, initialState }) {
  const $section = document.createElement('section');
  $section.classList.add('news-press-display');

  $target.appendChild($section);

  this.state = initialState;

  this.setState = nextState => {
    this.state = nextState;
    this.render();
  };

  const initPressInfo = async () => {
    const json = await fetchPressInfo();
    const data = shuffle(json);
    this.setState({
      ...this.state,
      data,
    });
  };

  function handleClickCell({ target }, subscribeButton) {
    let id = target.dataset.id;

    // li가 아닌 button을 클릭했을 경우
    if (!id) {
      id = target.closest('li').dataset.id;
    }

    handleSubscribe(id, subscribeButton);
  }

  function getSubscribed(id, myPress) {
    return myPress.indexOf(id) !== -1;
  }

  // TODO: 옵저버 패턴 적용 필요
  function handleSubscribe(id, subscribeButton) {
    const { isSubscribed } = subscribeButton.state;

    // Optimistic UI 적용
    if (isSubscribed) {
      subscribeButton.setState({ ...subscribeButton.state, isSubscribed: false });
      store.dispatch(actionCreator('unsubscribe', { pid: id }));
    } else {
      subscribeButton.setState({ ...subscribeButton.state, isSubscribed: true });
      store.dispatch(actionCreator('subscribe', { pid: id }));
    }
  }

  const initPressItems = () => {
    const $ul = $section.querySelector('ul');
    $ul.innerHTML = '';

    const { page, data } = this.state;

    const startIndex = NEWS_PRESS_NUMBERS_PER_PAGE * (page - 1);
    const endIndex = startIndex + 23;
    const currentData = data.slice(startIndex, endIndex + 1);

    currentData.forEach(({ id, logo }) => {
      const $li = document.createElement('li');
      const $img = document.createElement('img');

      $img.src = logo;
      $img.classList.add('press-logo');

      $li.appendChild($img);
      $li.classList.add('news-press-item');
      $li.classList.add('data-id');
      $li.dataset.id = id;

      const { myPress } = store.getState();

      const subscribeButton = new SubscribeButton({
        $target: $li,
        initialState: {
          type: 'grid',
          isSubscribed: getSubscribed(id, myPress),
        },
      });

      $li.addEventListener('click', (event, params) => handleClickCell(event, subscribeButton, params));

      $ul.appendChild($li);
    });
  };

  const validatePage = page => page >= PAGE_MIN_NUMBER && page <= PAGE_MAX_NUMBER;

  const handleMovePage = newPage => {
    if (!validatePage(newPage)) {
      return;
    }
    this.setState({ ...this.state, page: newPage });
  };

  const checkShowPageButton = ($prevPageButton, $nextPageButton) => {
    $prevPageButton.classList.remove('disabled');
    $nextPageButton.classList.remove('disabled');

    if (this.state.page === PAGE_MIN_NUMBER) {
      $prevPageButton.classList.add('disabled');
    } else if (this.state.page === PAGE_MAX_NUMBER) {
      $nextPageButton.classList.add('disabled');
    }
  };

  let isInit = false;

  this.render = () => {
    if (!isInit) {
      initPressInfo();
      isInit = true;
    }

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
  };

  this.render();
}
