import Icon from '../common/Icon.js';

export default class AllNewHeader {
  constructor() {
    this.$header = document.createElement('div');
    this.$header.className = 'all-news-header';

    this.render();

    return this.$header;
  }

  render() {
    this.addTitleNavigator();
    this.addIconNavigator();
  }

  addTitleNavigator() {
    const $titleNavigation = document.createElement('nav');
    $titleNavigation.className = 'view-type-wrapper';

    const $allPress = document.createElement('span');
    const $subscibedPress = document.createElement('span');

    $allPress.innerText = '전체 언론사';
    $subscibedPress.innerText = '내가 구독한 언론사';

    $titleNavigation.appendChild($allPress);
    $titleNavigation.appendChild($subscibedPress);
    this.$header.appendChild($titleNavigation);
  }

  addIconNavigator() {
    const $iconNavigation = document.createElement('div');
    $iconNavigation.className = 'view-type-icon';

    const $listViewIcon = new Icon({ name: 'list-view' });
    const $gridViewIcon = new Icon({ name: 'grid-view' });

    $iconNavigation.appendChild($listViewIcon);
    $iconNavigation.appendChild($gridViewIcon);

    this.$header.appendChild($iconNavigation);
  }
}
