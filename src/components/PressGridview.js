import { fetchPressInfo } from '../api.js';
import { shuffle } from '../utils.js';
import { store, actionCreator } from '../../core/store.js';
import {
  NEWS_PRESS_NUMBERS_PER_PAGE,
  PAGE_MIN_NUMBER,
  PAGE_MAX_NUMBER,
  SNACKBAR_DURATION,
  SUBSCRIBE_MESSAGE,
} from '../constants.js';

import SubscribeButton from './common/SubscribeButton.js';
import SnackBar from './common/SnackBar.js';
import Alert from './common/Alert.js';

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
    let name = target.dataset.name;

    // li가 아닌 element를 클릭했을 경우
    if (!id) {
      const dataset = target.closest('li').dataset;
      id = dataset.id;
      name = dataset.name;
    }

    handleSubscribe(id, name, subscribeButton);
  }

  const handleSubscribe = (id, name, subscribeButton) => {
    const { isSubscribed } = subscribeButton.state;

    if (isSubscribed) {
      this.alert.setState({ ...this.alert.state, isShow: true, pid: id, pressName: name, subscribeButton });
    } else {
      subscribeButton.setState({ ...subscribeButton.state, isSubscribed: true });

      // 만약 스낵바 타이머가 걸려 있으면 초기화하고 다시 5초 카운트
      if (this.timer) {
        clearTimeout(this.timer);
      }

      this.snackBar.setState({ ...this.snackBar.state, isShow: true });
      this.timer = setTimeout(() => {
        this.snackBar.setState({ ...this.snackBar.state, isShow: false });
        // TODO: 내가 구독한 리스트로 이동
      }, SNACKBAR_DURATION);

      store.dispatch(actionCreator('subscribe', { pid: id, pressName: name }));
    }
  };

  function getSubscribed(id) {
    return store.getMyPress().find(({ pid }) => parseInt(pid, 10) === id);
  }

  const initPressItems = () => {
    const $ul = $section.querySelector('ul');
    $ul.innerHTML = '';

    const { page, data } = this.state;

    const startIndex = NEWS_PRESS_NUMBERS_PER_PAGE * (page - 1);
    const endIndex = startIndex + 23;
    const currentData = data.slice(startIndex, endIndex + 1);

    currentData.forEach(({ id, name, logo }) => {
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
          isSubscribed: getSubscribed(id),
        },
      });

      $li.addEventListener('click', event => handleClickCell(event, subscribeButton));

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
}
