export default class LatestNews {
  constructor() {
    this.$wrapper = document.createElement('div');
    this.$wrapper.className = 'latest-main-news';

    this.render();
    return this.$wrapper;
  }

  render() {
    this.$wrapper.appendChild(this.createLatestNewsComponent('연합뉴스', '[1보] !'));
    this.$wrapper.appendChild(this.createLatestNewsComponent('연합뉴스', '[1보] !'));
  }

  createLatestNewsComponent(name, content) {
    const $component = document.createElement('div');
    $component.className = 'auto-rolling-news';

    const $newsName = document.createElement('span');
    const $newsContent = document.createElement('p');

    $newsName.innerText = name;
    $newsContent.innerText = '[1보] 김기현·안철수·천하람·황교안, 與전대 본경선 진출';

    $component.appendChild($newsName);
    $component.appendChild($newsContent);

    return $component;
  }
}
