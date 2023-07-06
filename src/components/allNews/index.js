import AllNewsList from './AllnewsList.js';

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
    $titleNavigation.className = 'view-type-wrapper';
    const $iconNavigation = document.createElement('div');
    $iconNavigation.className = 'view-type-icon';

    const $allNews = document.createElement('h3');
    const $myNews = document.createElement('h3');

    $allNews.innerText = '전체 언론사';
    $myNews.innerText = '내가 구독한 언론사';

    $titleNavigation.appendChild($allNews);
    $titleNavigation.appendChild($myNews);

    const $listIcon = document.createElement('span');
    $listIcon.innerText = 'icon';

    $iconNavigation.appendChild($listIcon);

    $header.appendChild($titleNavigation);
    $header.appendChild($iconNavigation);

    return $header;
  }

  createAllNewsLists() {
    const $newLists = document.createElement('ul');
    $newLists.className = 'news-list';

    for (let i = 0; i < 24; i++) {
      $newLists.appendChild(new AllNewsList('데일리안'));
    }

    return $newLists;
  }
}
