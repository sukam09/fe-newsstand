export default class LatestNews {
  constructor() {
    this.$wrapper = document.createElement('div');
    this.$wrapper.className = 'main-news';

    this.init();
    return this.$wrapper;
  }

  init() {
    this.$wrapper.appendChild(this.createLatestNewsComponent('연합뉴스', '[1보] !'));
    this.$wrapper.appendChild(this.createLatestNewsComponent('연합뉴스', '[1보] !'));
  }

  createLatestNewsComponent(name, content) {
    const $component = document.createElement('div');
    $component.className = 'news-wrapper';

    const $newsName = document.createElement('span');
    const $newsContent = document.createElement('p');

    $newsName.innerText = name;
    $newsContent.innerText = content;

    $component.appendChild($newsName);
    $component.appendChild($newsContent);

    return $component;
  }
}
