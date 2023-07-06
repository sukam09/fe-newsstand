import Icon from '../common/Icon.js';
import AllNewsList from './AllnewsList.js';
import ArrowButton from './ArrowButton.js';

export default class AllNews {
  constructor() {
    this.$wrapper = document.createElement('section');

    this.init();
    return this.$wrapper;
  }

  init() {
    this.$wrapper.appendChild(this.createAllNewHeader());
    this.$wrapper.appendChild(this.createAllNewsLists());
  }

  createAllNewHeader() {
    const $header = document.createElement('div');
    const $titleNavigation = document.createElement('nav');
    const $iconNavigation = document.createElement('div');
    $header.className = 'all-news-header';
    $titleNavigation.className = 'view-type-wrapper';
    $iconNavigation.className = 'view-type-icon';

    const $allPress = document.createElement('span');
    const $subscibedPress = document.createElement('span');

    $allPress.innerText = '전체 언론사';
    $subscibedPress.innerText = '내가 구독한 언론사';

    $titleNavigation.appendChild($allPress);
    $titleNavigation.appendChild($subscibedPress);

    const $listViewIcon = new Icon({ name: 'list-view' });
    const $gridViewIcon = new Icon({ name: 'grid-view' });

    $iconNavigation.appendChild($listViewIcon);
    $iconNavigation.appendChild($gridViewIcon);

    $header.appendChild($titleNavigation);
    $header.appendChild($iconNavigation);

    return $header;
  }

  createAllNewsLists() {
    const $newsListWrapper = document.createElement('div');
    const $newsLists = document.createElement('ul');
    const $leftButton = new ArrowButton({ name: 'LeftButton' });
    const $rightButton = new ArrowButton({ name: 'RightButton' });
    $newsLists.className = 'news-list';

    console.log($leftButton);
    $newsListWrapper.appendChild($leftButton);

    for (let i = 0; i < 24; i++) {
      $newsLists.appendChild(new AllNewsList('데일리안'));
    }
    $newsListWrapper.appendChild($newsLists);
    $newsListWrapper.appendChild($rightButton);

    return $newsListWrapper;
  }
}
