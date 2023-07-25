import { fetchPressInfo, fetchListView } from '../api.js';
import { store } from '../../core/store.js';
import { convertRegDate, getSubscribed } from '../utils.js';
import { ANIMATION_UPDATE_DELAY, CATEGORY_NUMBERS, PROGRESSBAR_UPDATE_DELTA } from '../constants.js';

import SubscribeButton from './common/SubscribeButton.js';

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

  $div.append($leftButton, $article, $rightButton);

  $target.appendChild($section);
  $target.appendChild($div);

  this.state = initialState;

  this.setState = (nextState, isRender = true) => {
    this.state = nextState;
    if (isRender) {
      this.render();
    }
  };

  const initListView = async () => {
    const { index, press, listViewData } = this.state;

    const entire = press === 'all' ? listViewData[index].length : 1;
    const present = this.state.present === 0 ? entire : this.state.present;

    const newsData = listViewData[index % CATEGORY_NUMBERS][present - 1];
    const { materials, pid, regDate } = newsData;
    const mainNews = materials[0];

    const pressInfoData = await fetchPressInfo();
    const { logo, name } = pressInfoData.find(press => press.id === parseInt(pid, 10));

    this.setState(
      {
        ...this.state,
        present,
        entire,
        pid,
        pressLogo: logo,
        pressName: name,
        regDate,
        thumbnail: mainNews.image.url,
        mainNews: mainNews.title,
        subNews: materials.slice(1).map(news => news.title),
      },
      false
    );
  };

  const initFieldTab = () => {
    if (this.state.press === 'my') {
      const myCategories = store.getMyPress().map(({ pressName }) => pressName);
      this.setState({ ...this.state, categories: myCategories }, false);
    }

    const { categories } = this.state;

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

  const initProgressBar = $selectedButton => {
    if (this.timer !== undefined) {
      this.$currentButton.style.background = '';
      clearInterval(this.timer);
    }

    $selectedButton.style.background = '#7890e7';
    this.percentage = 0;
    this.timer = setInterval(() => setProgressBar($selectedButton), ANIMATION_UPDATE_DELAY);

    this.$currentButton = $selectedButton;
  };

  const setProgressBar = $selectedButton => {
    this.percentage += PROGRESSBAR_UPDATE_DELTA;

    // percentage가 정확히 100이 안될 수가 있으므로 등호가 아닌 부등호를 써야 함
    if (this.percentage >= 100) {
      const { present, entire, length } = this.state;

      if (present === entire) {
        this.setState({
          ...this.state,
          index: (this.state.index + 1) % length,
          present: 1,
        });
      } else {
        this.setState({ ...this.state, present: this.state.present + 1 });
      }
    }

    $selectedButton.style.background = `linear-gradient(to right, #4362d0 ${this.percentage}%, #7890e7 ${this.percentage}%)`;
  };

  const handleClickTextButton = newIndex => {
    if (this.state.index === newIndex) {
      return;
    }
    this.setState({ ...this.state, index: newIndex, present: 1 });
  };

  const handleClickLeftButton = () => {
    const { index, present, length } = this.state;
    const prevIndex = (index - 1 + length) % length;

    if (present === 1) {
      this.setState({
        ...this.state,
        index: prevIndex,
        present: 0,
      });
    } else {
      this.setState({
        ...this.state,
        present: this.state.present - 1,
      });
    }
  };

  const handleClickRightButton = () => {
    const { index, present, entire, length } = this.state;
    const nextIndex = (index + 1) % length;

    if (present === entire) {
      this.setState({
        ...this.state,
        index: nextIndex,
        present: 1,
      });
    } else {
      this.setState({
        ...this.state,
        present: this.state.present + 1,
      });
    }
  };

  let isInit = false;

  this.render = async () => {
    if (!isInit) {
      initFieldTab();
      const listViewData = await fetchListView();
      this.setState({ ...this.state, listViewData }, false);

      $leftButton.addEventListener('click', handleClickLeftButton);
      $rightButton.addEventListener('click', handleClickRightButton);

      isInit = true;
    }

    await initListView();

    const { press, index, present, entire, categories, pressLogo, pressName, regDate, thumbnail, mainNews, subNews } =
      this.state;

    $article.innerHTML = `
      <div class="press-info">
        <div class="press-name">
          <img class="press-image" src="${pressLogo}"/>
        </div>
        <div class="edit-date">${convertRegDate(regDate)} 편집</div>
      </div>
      <div class="news">
        <div class="news-main">
          <div class="thumbnail-box">
            <img class="thumbnail" src="${thumbnail}"/>
          </div>
          <p class="news-main-title">${mainNews}</p>
        </div>
        <div class="news-sub">
          ${subNews.map(title => `<a class="news-sub-title">${title}</a>`).join('')}
          <p class="news-sub-caption">${pressName} 언론사에서 직접 편집한 뉴스입니다.</p>
        </div>
      </div>
    `;

    const $pressInfo = $article.querySelector('.press-info');
    new SubscribeButton({
      $target: $pressInfo,
      initialState: {
        type: 'list',
        isSubscribed: press === 'my' ? true : getSubscribed(parseInt(this.state.pid, 10)),
      },
    });

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
    `;

    $selectedButton.innerHTML +=
      press === 'all'
        ? `<div class="text-button-count">
            <p class="text-button-present">${present}</p>
            <img src="../asset/icons/division.svg" />
            <p class="text-button-entire">${entire}</p>
          </div>`
        : `<img src="../asset/icons/chevron-right.svg" />`;

    initProgressBar($selectedButton);
  };

  this.render();
}
