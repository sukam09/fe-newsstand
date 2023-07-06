import AllNewsHeader from './AllNewsHeader.js';

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

    const $newsList = document.createElement('li');
    const $newsList2 = document.createElement('li');
    const $newsList3 = document.createElement('li');
    const $newsList4 = document.createElement('li');
    const $newsList5 = document.createElement('li');
    const $newsList6 = document.createElement('li');
    $newsList.innerText = '데일리안';
    $newsList2.innerText = '데일리안';
    $newsList3.innerText = '데일리안';
    $newsList4.innerText = '데일리안';
    $newsList5.innerText = '데일리안';
    $newsList6.innerText = '데일리안';

    $newLists.appendChild($newsList);
    $newLists.appendChild($newsList2);
    $newLists.appendChild($newsList3);
    $newLists.appendChild($newsList4);
    $newLists.appendChild($newsList5);
    $newLists.appendChild($newsList6);

    return $newLists;
  }
}
